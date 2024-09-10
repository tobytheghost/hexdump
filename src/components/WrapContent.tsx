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
        <>
          {str}
          <span key={match} className="bg-lime-300 inline-block">
            {match}
          </span>
        </>
      );
    }
    return str;
  });
};
