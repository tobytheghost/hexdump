import { parseTextContent, REGEX } from "../parseTextContent";

export const WrapContent = ({ children }: { children: React.ReactNode }) => {
  if (typeof children !== "string") {
    return children;
  }
  const splitString = children.split(REGEX.HEX);
  const matches = parseTextContent(children);
  if (splitString.length < 1) {
    return children;
  }
  return splitString.map((str, index) => {
    const match = matches[index]?.[0];
    if (match) {
      return (
        <span key={`${str}${match}${index}`}>
          {str}
          <span className="bg-lime-300 inline-block">{match}</span>
        </span>
      );
    }
    if (index === splitString.length - 1) {
      // Prevents the last space from being trimmed and causing the boxes to be misaligned
      return <>{str}&nbsp;</>;
    }
    return str;
  });
};
