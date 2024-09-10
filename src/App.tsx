import "./App.css";
import { WrapContent } from "./components/WrapContent";
import { OutputContent } from "./components/OutputContent";
import { ToastContainer } from "react-toastify";
import useUrlState from "@ahooksjs/use-url-state";
import { useRef, useState } from "react";
import { placeholderText } from "./utils/placeholderText";
import "react-toastify/dist/ReactToastify.css";

const encode = (text: string) => btoa(encodeURIComponent(text));
const decode = (text: string) => decodeURIComponent(atob(text));

function App() {
  const [state, setState] = useUrlState({ c: encode(placeholderText) });
  const [highlight, setHighlight] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textContent = decode(state.c);

  return (
    <>
      <div className="flex-grow flex flex-col py-2">
        <section className="px-2 flex">
          <h1 className="text-lg mb-2">
            <a href="/" className="cursor-pointer">
              HexDump
            </a>
          </h1>
        </section>
        <section className="grid grid-cols-2 flex-grow">
          <div className="w-full px-2 relative text-sm">
            <div className="overflow-auto bg-slate-50 h-full w-full p-2">
              <div className="whitespace-pre-wrap break-words text-transparent">
                {highlight ? <WrapContent>{textContent}</WrapContent> : null}
              </div>
            </div>
            <textarea
              ref={textAreaRef}
              value={textContent}
              onChange={(e) => setState({ c: encode(e.target.value) })}
              className="border border-slate-600 h-full resize-none p-2 rounded-md bg-transparent absolute top-0 left-2 bottom-0 right-2 overflow-hidden"
              draggable={false}
            />
            <div className="absolute top-1 right-3 flex gap-2">
              <button
                className="px-2 border border-black rounded-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                onClick={() => setHighlight((prev) => !prev)}
              >
                Toggle Highlight
              </button>
              <button
                className="px-2 border border-black rounded-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                onClick={() => {
                  setState({ c: encode("") });
                  textAreaRef.current?.focus();
                }}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="w-full px-2">
            <div className="border border-slate-600 h-full w-full resize-none p-2 rounded-md">
              <OutputContent>{textContent}</OutputContent>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer
        autoClose={1000}
        position="bottom-right"
        hideProgressBar
      />
    </>
  );
}

export default App;
