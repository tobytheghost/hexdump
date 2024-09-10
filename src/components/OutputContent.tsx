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

export const OutputContent = ({ children }: { children: React.ReactNode }) => {
  if (typeof children !== "string") return null;
  const matches = parseTextContent(children).map((value) =>
    value[0].toUpperCase()
  );
  const uniqueMatches = [...new Set(matches)];
  if (!uniqueMatches.length) return null;
  const createAddToClipboard = (value: string) => () => {
    navigator.clipboard.writeText(value);
    toast(
      <div className="flex gap-2 items-center">
        <div className="gap-2">
          <span>Copied </span>
          <span className="font-bold">
            <span
              className="w-4 inline-block text-transparent mr-1"
              style={{ background: value }}
            >
              []
            </span>
            {value}
          </span>
          <span> to clipboard</span>
        </div>
      </div>,
      {
        type: "success",
      }
    );
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8"></TableHead>
          <TableHead>Hexcode</TableHead>
          <TableHead>RGB</TableHead>
          <TableHead>Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uniqueMatches.map((value, index) => {
          const rgbString = `rgb(${hexToRgb(value)?.r}, ${
            hexToRgb(value)?.g
          }, ${hexToRgb(value)?.b})`;
          return (
            <TableRow key={value + index} className="w-full">
              <TableCell>
                <div className="w-4 h-4" style={{ background: value }}></div>
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={createAddToClipboard(value)}
                >
                  {value}
                </button>
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={createAddToClipboard(rgbString)}
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
