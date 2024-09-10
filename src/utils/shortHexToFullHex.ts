export const shortHexToFullHex = (hex: string) => {
  const result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
  if (!result) return hex;
  const rRaw = result?.[1];
  const gRaw = result?.[2];
  const bRaw = result?.[3];
  const r = rRaw && `${rRaw}${rRaw}`;
  const g = gRaw && `${gRaw}${gRaw}`;
  const b = bRaw && `${bRaw}${bRaw}`;
  return `#${r}${g}${b}`;
};
