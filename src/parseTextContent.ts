const hexPattern = "#(?:(?:[\\da-f]{3}){1,2}|(?:[\\da-f]{4}){1,2})";

export const REGEX = {
  HEX: new RegExp(`(${hexPattern})`, "gi"),
  WORD_CASES: new RegExp(`([\\S]+${hexPattern}[\\S]+)|(${hexPattern})`, "gi"),
};

export const parseTextContent = (text: string) => {
  return [...text.matchAll(REGEX.HEX)].map((match) => match[0]);
};
