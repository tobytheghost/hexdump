export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);
  if (!result) return null;
  const rRaw = result?.[1];
  const gRaw = result?.[2];
  const bRaw = result?.[3];
  const r = rRaw && parseInt(rRaw.length > 1 ? rRaw : `${rRaw}${rRaw}`, 16);
  const g = gRaw && parseInt(gRaw.length > 1 ? gRaw : `${gRaw}${gRaw}`, 16);
  const b = bRaw && parseInt(bRaw.length > 1 ? bRaw : `${bRaw}${bRaw}`, 16);
  return { r, g, b };
}
