import React from "react";
import { REGEX } from "../parseTextContent";

export const WrapContent = ({ children }: { children: React.ReactNode }) => {
  if (typeof children !== "string") {
    return children;
  }
  const splitString = children.split(REGEX.WORD_CASES);
  if (splitString.length < 1) {
    return children;
  }
  return splitString.map((str, index) => {
    if (index === splitString.length - 1) {
      // Prevents the last space from being trimmed and causing the boxes to be misaligned
      return <>{str}&nbsp;</>;
    }
    return (
      <React.Fragment key={`${str}${index}`}>
        {REGEX.HEX.test(str) ? (
          <span className="inline-block">
            {str?.split(REGEX.HEX).map((subStr, index) => {
              console.log({ subStr });
              return (
                <React.Fragment key={`${str}${subStr}${index}`}>
                  {REGEX.HEX.test(subStr) ? (
                    <span className="bg-lime-300 inline-block">{subStr}</span>
                  ) : (
                    subStr
                  )}
                </React.Fragment>
              );
            })}
          </span>
        ) : (
          str
        )}
      </React.Fragment>
    );
  });
};
