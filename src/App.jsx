import { RotateCcw, Timer, CircleDot, CircleDashed, CircleX } from "lucide-react";
import "./App.css";
import AddBtn from "./components/AddBtn";
import CheckBtn from "./components/CheckBtn";
import PlayBtn from "./components/PlayBtn";
import StopBtn from "./components/StopBtn";
import AnalyticsBtn from "./components/AnalyticsBtn";
import { useState } from "react";

function App() {
  const [navToggle, setNavToggle] = useState(true);
  const [playNavigation, setPlayNavigation] = useState(true)
  const handleNavBtn = () => {
    setNavToggle((prev) => !prev);
  };
  const handlePlayNavig = () => {
    setPlayNavigation(prev => !prev)
  }
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="w-full h-auto bg-(--bg) p-2 flex flex-col justify-center items-center gap-10 max-w-[640px]">
          <div className="w-full h-auto text-center">
            <h2 className="text-3xl text-(--secondary) pt-5 font-bold">
              POMOTODO
            </h2>
          </div>

          <div className="py-2 px-4 bg-(--primary) flex justify-center items-center gap-4 max-w-[200px] text-(--bg) rounded-full my-4">
            <CheckBtn />
            <p className="leading-4">Complete the email scaleup</p>
          </div>

          <div className="w-full h-auto flex justify-center items-center my-6]">
            <div className="w-[250px] h-[250px] border-12 border-(--secondary) bg-transparent rounded-full flex justify-center items-center">
              <p className="text-4xl font-medium text-(--bg-dark)">25:00</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <AddBtn />
            <CircleDot color="#f4a261" />
            <CircleDashed color="#ae2012" />
            <CircleDashed color="#ae2012" />
          </div>
          <div onClick={handlePlayNavig} className="flex justify-center items-center gap-8">
            <CircleX size={"30px"} color="#344e41" />
            {playNavigation ? <PlayBtn /> : <StopBtn />}
            <RotateCcw size={"30px"} color="#344e41" />
          </div>
          <div className="h-[100px]"></div>
          <nav className="flex justify-center items-center gap-4 bg-(--primary) p-2 rounded-full fixed bottom-8">
            <button
              onClick={handleNavBtn}
              className={`p-2 rounded-full flex justify-center items-center gap-1 text-(--primary) ${navToggle ? "bg-(--bg-lite)" : "bg-(--bg)"}`}
            >
              <AnalyticsBtn />
              <p
                className={`text-xl font-medium ${navToggle ? `opacity-100 max-w-xs` : `opacity-0 max-w-0`}`}
              >
                Dashboard
              </p>
            </button>
            <button
              onClick={handleNavBtn}
              className={`p-2 rounded-full flex justify-center items-center gap-0 text-(--primary) ${navToggle ? "bg-(--bg)" : "bg-(--bg-lite)"}`}
            >
              <Timer className="mx-0.5" />
              <p
                className={`text-xl font-medium ${navToggle ? `opacity-0 max-w-0` : `opacity-100 max-w-xs`}`}
              >
                Timer
              </p>
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

export default App;
