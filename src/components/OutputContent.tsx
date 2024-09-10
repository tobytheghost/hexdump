import { hexToRgb } from "@/utils/hexToRgb";
import { parseTextContent } from "../parseTextContent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { shortHexToFullHex } from "@/utils/shortHexToFullHex";

const createAddToClipboard = (value: string) => () => {
  navigator.clipboard.writeText(value);
  toast(
    <div className="flex gap-2 items-center">
      <div className="gap-2">
        Copied <span className="font-bold">{value}</span> to clipboard!
      </div>
    </div>,
    {
      type: "success",
    }
  );
};

const createAddAllToClipboard =
  (uniqueMatches: string[], type: string) => () => {
    navigator.clipboard.writeText(uniqueMatches.join("\n"));
    toast(
      <div className="flex gap-2 items-center">
        <div className="gap-2">
          Copied <span className="font-bold">{type}</span> to clipboard!
        </div>
      </div>,
      {
        type: "success",
      }
    );
  };

export const OutputContent = ({ children }: { children: React.ReactNode }) => {
  if (typeof children !== "string") return null;
  const matches = parseTextContent(children).map((value) =>
    value[0].toUpperCase()
  );
  const uniqueMatches = [...new Set(matches)];
  if (!uniqueMatches.length) return null;
  const uniqueRgbMatches = [
    ...new Set(
      uniqueMatches
        .map((value) => {
          const rbg = hexToRgb(value);
          return rbg && `rgb(${rbg.r}, ${rbg.g}, ${rbg.b})`;
        })
        .filter(Boolean)
    ),
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8"></TableHead>
          <TableHead>
            <button
              onClick={createAddAllToClipboard(
                uniqueMatches.map(shortHexToFullHex),
                "all hexcodes"
              )}
            >
              Hexcode
            </button>
          </TableHead>
          <TableHead>
            <button
              onClick={createAddAllToClipboard(
                uniqueRgbMatches,
                "all rgb values"
              )}
            >
              RGB
            </button>
          </TableHead>
          <TableHead>Instances</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uniqueMatches.map((value, index) => {
          const rgb = hexToRgb(value);
          const rgbString = rgb && `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          return (
            <TableRow key={value + index} className="w-full">
              <TableCell>
                <div
                  className="w-4 h-4 border border-black"
                  style={{ background: value }}
                ></div>
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={createAddToClipboard(shortHexToFullHex(value))}
                >
                  {value !== shortHexToFullHex(value)
                    ? `${shortHexToFullHex(value)} (${value})`
                    : value}
                </button>
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => rgbString && createAddToClipboard(rgbString)()}
                >
                  {rgbString}
                </button>
              </TableCell>
              <TableCell>
                {matches.filter((match) => match === value).length}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
