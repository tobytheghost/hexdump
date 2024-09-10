export const REGEX = {
  HEX: /#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})/gi,
};

export const parseTextContent = (text: string) => {
  return [...text.matchAll(REGEX.HEX)];
};
