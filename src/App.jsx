import { RotateCcw, CircleDot, CircleDashed, TimerReset } from "lucide-react";
import "./App.css";
import AddBtn from "./components/AddBtn";
import CheckBtn from "./components/CheckBtn";
import PlayBtn from "./components/PlayBtn";
import StopBtn from "./components/StopBtn";
import { useEffect, useState, useRef } from "react";

function App() {
  const phases = [
    { label: "focus", duration: 25 * 60, type: "work" },
    { label: "break", duration: 5 * 60, type: "break" },
    { label: "focus", duration: 25 * 60, type: "work" },
    { label: "break", duration: 5 * 60, type: "break" },
    { label: "focus", duration: 25 * 60, type: "work" },
    { label: "break", duration: 5 * 60, type: "break" },
    { label: "focus", duration: 25 * 60, type: "work" },
    { label: "long-break", duration: 20 * 60, type: "long-break" },
  ];
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const currentPhase = phases[phaseIndex];
  const next = (phaseIndex + 1) % phases.length;

  const nextPhase = () => {
    setPhaseIndex(next);
    setTimeLeft(phases[next].duration);
  };
  console.log(next)

  useEffect(() => {
    if (timeLeft === 0) {
      nextPhase()
      return;
    }
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(phases[phaseIndex].duration);
  };

  return (
    <>
      <div className="w-full h-auto text-center border-b-2 border-(--primary)">
        <h2 className="text-3xl text-(--secondary) py-4 font-bold">POMOTODO</h2>
      </div>

      <div className="py-2 px-4 bg-(--primary) flex justify-center items-center gap-4 max-w-[200px] text-(--bg) rounded-full my-4">
        <CheckBtn />
        <p className="leading-4">Complete the email scaleup</p>
      </div>

      <div className="w-full h-auto flex justify-center items-center my-6]">
        <div className="w-[250px] h-[250px] border-12 border-(--secondary) bg-transparent rounded-full flex justify-center items-center">
          <p className="text-5xl font-medium text-(--bg-dark) relative">
            {minutes} : {seconds}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-1">
          <AddBtn />
          <CircleDot color="#f4a261" />
          <CircleDashed color="#ae2012" />
          <CircleDashed color="#ae2012" />
        </div>
        {currentPhase.type === "break" && (
          <p className="text-lg font-bold text-(--primary)">Short Break</p>
        )}
        {currentPhase.type === "long-break" && (
          <p className="text-lg font-bold text-(--primary)">Long Break</p>
        )}
      </div>
      <div className="flex justify-center items-center gap-8">
        <button>
          <TimerReset size={"30px"} color="#344e41" />
        </button>
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="hover:scale-[1.2]"
        >
          {isRunning ? <StopBtn /> : <PlayBtn />}
        </button>
        <button>
          <RotateCcw
            size={"30px"}
            color="#344e41"
            onClick={handleReset}
            className="hover:scale-[1.2] hover:-rotate-360 transition-all duration-1000 ease-in-out"
          />
        </button>
      </div>
      <div className="h-[100px]"></div>
    </>
  );
}

export default App;
