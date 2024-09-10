import { shortHexToFullHex } from "./shortHexToFullHex";

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    shortHexToFullHex(hex)
  );
  if (!result) return null;
  const r = result && parseInt(result[1], 16);
  const g = result && parseInt(result[2], 16);
  const b = result && parseInt(result[3], 16);
  return { r, g, b };
}
