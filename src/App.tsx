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
        <section className="px-2 flex">
          <div className="flex gap-2 mb-2">
            <button
              className="px-2 border border-black text-sm rounded-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => {
                setState({ c: encode("") });
                textAreaRef.current?.focus();
              }}
            >
              Clear Input
            </button>
            <button
              className="px-2 border border-black text-sm rounded-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => setHighlight((prev) => !prev)}
            >
              Highlight ({highlight ? "On" : "Off"})
            </button>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 flex-grow gap-2 px-2 font-mono">
          <div className="relative text-sm">
            <div className="overflow-auto bg-slate-50 h-full w-full p-2">
              <div className="whitespace-pre-wrap break-words text-transparent">
                {highlight ? <WrapContent>{textContent}</WrapContent> : null}
              </div>
            </div>
            <textarea
              ref={textAreaRef}
              value={textContent}
              onChange={(e) => setState({ c: encode(e.target.value) })}
              className="border border-slate-600 h-full resize-none p-2 rounded-md bg-transparent absolute top-0 left-0 bottom-0 right-0 overflow-hidden"
              draggable={false}
            />
          </div>
          <div>
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
