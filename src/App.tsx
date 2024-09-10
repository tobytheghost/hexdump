import "./App.css";
import { WrapContent } from "./components/WrapContent";
import { OutputContent } from "./components/OutputContent";
import { ToastContainer } from "react-toastify";
import useUrlState from "@ahooksjs/use-url-state";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [state, setState] = useUrlState({ c: "" });
  const textContent = decodeURIComponent(atob(state.c));

  return (
    <>
      <div className="flex-grow flex flex-col py-2">
        <section className="px-2 flex">
          <h1 className="text-lg mb-2">HexDump</h1>
        </section>
        <section className="grid grid-cols-2 flex-grow">
          <div className="w-full px-2 relative">
            <div className="overflow-auto bg-slate-50 h-full w-full p-2">
              <div className="whitespace-pre-wrap break-words text-transparent">
                <WrapContent>{textContent}</WrapContent>
              </div>
            </div>
            <textarea
              value={textContent}
              onChange={(e) =>
                setState({ c: btoa(encodeURIComponent(e.target.value)) })
              }
              className="border border-slate-600 h-full resize-none p-2 rounded-md bg-transparent absolute top-0 left-2 bottom-0 right-2 overflow-hidden"
              draggable={false}
            />
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
