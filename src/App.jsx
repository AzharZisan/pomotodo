import { RotateCcw, CircleDot, CircleDashed, TimerReset } from "lucide-react";
import "./App.css";
import AddBtn from "./components/AddBtn";
import PlayBtn from "./components/PlayBtn";
import StopBtn from "./components/StopBtn";
import { useEffect, useState, useRef } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { Temporal } from "temporal-polyfill";

function App() {
  const phases = [
    {
      id: 0,
      label: "focus",
      duration: 25 * 60,
      type: "work",
      completed: false,
    },
    {
      id: 1,
      label: "break",
      duration: 5 * 60,
      type: "break",
      completed: false,
    },
    {
      id: 2,
      label: "focus",
      duration: 25 * 60,
      type: "work",
      completed: false,
    },
    {
      id: 3,
      label: "break",
      duration: 5 * 60,
      type: "break",
      completed: false,
    },
    {
      id: 4,
      label: "focus",
      duration: 25 * 60,
      type: "work",
      completed: false,
    },
    {
      id: 5,
      label: "break",
      duration: 5 * 60,
      type: "break",
      completed: false,
    },
    {
      id: 6,
      label: "focus",
      duration: 25 * 60,
      type: "work",
      completed: false,
    },
    {
      id: 7,
      label: "long-break",
      duration: 20 * 60,
      type: "long-break",
      completed: false,
    },
  ];
  const [phasesArr, setPhasesArr] = useState(() => {
    const saved = localStorage.getItem('phases')
    return saved ? JSON.parse(saved) : phases
  })

  const [phaseIndex, setPhaseIndex] = useState(() => {
    const saved = localStorage.getItem("arraysys");
    return saved ? JSON.parse(saved).phaseIndex : 0;
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("arraysys");
    return saved ? JSON.parse(saved).timeLeft : phases[0].duration;
  });

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const currentPhase = phases[phaseIndex] ?? phases[0];
  const next = (phaseIndex + 1) % phases.length;

  useEffect(() => {
    const arraySystem = {
      phaseIndex: phaseIndex,
      timeLeft: timeLeft,
      isRunning: isRunning,
    };

    localStorage.setItem("arraysys", JSON.stringify(arraySystem));
  }, [phaseIndex, timeLeft, isRunning]);

  const nextPhase = () => {
    setPhaseIndex(next);
    setTimeLeft(phases[next].duration);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      nextPhase();
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
      }, 2);
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

  const handleFullReset = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setTimeLeft(phases[0].duration);
  };

  useEffect(() => {
    const audio = new Audio("/audio/searchalet.mp3");
    audio.play();
  }, [phaseIndex]);

  const [fullResetAlert, setFullResetAlert] = useState(false);
  const [exisResetAlert, setExisResetAlert] = useState(false);

  const getStatus = (phases) => {
    if (phases < phaseIndex) return "done";
    if (phases === phaseIndex) return "active";
    return "pending";
  };

  const workPhases = phases
    .map((item, i) => ({
      ...item,
      originalIndex: i,
    }))
    .filter((i) => i.type === "work");

  const handlePausePlay = () => {
    setIsRunning((prev) => !prev);
  };

  const existingTaskList = JSON.parse(localStorage.getItem("tasklist")) || [];
  const filteredDone = existingTaskList
    .flatMap((i) => i.entries)
    .filter((i) => i.checked === true)
    .reduce((acc, item) => {
      return acc + 1 ?? 0;
    }, 0);

  const [complCycles, setComplCycles] = useState(() => {
    return Number(localStorage.getItem("completedCycles")) || 0;
  });
  const completedCycles = () => {
    setPhasesArr((prev) => {
      const updated = prev.map((i) =>
        i.id === phaseIndex ? { ...i, completed: true } : i,
      );
      localStorage.setItem("phases", JSON.stringify(updated));
      const allDone = updated.every((p) => p.completed);
      if (allDone) {
        setComplCycles((c) => c + 1);
        return updated.map((p) => ({ ...p, completed: false }));
      }
      return updated;
    });
  };
  useEffect(() => {
    completedCycles();
  }, [phaseIndex]);

  useEffect(() => {
    localStorage.setItem("completedCycles", complCycles);
  }, [complCycles]);

  return (
    <>
      <div className="w-full h-auto text-center border-b-2 border-(--primary)">
        <h2 className="text-3xl text-(--secondary) py-4 font-bold">POMOTODO</h2>
      </div>

      <div className="py-3 pl-4 pr-3 bg-(--primary) flex justify-center items-center gap-4 max-w-[200px] text-(--bg) rounded-full my-4">
        <p className="leading-4 flex justify-center items-center gap-3">
          {filteredDone} Task Completed{" "}
          <IoCheckmarkDoneCircleSharp className="text-xl" />
        </p>
      </div>

      <div className="w-full h-auto flex justify-center items-center my-6]">
        <div className="w-[250px] h-[250px] border-12 border-(--secondary) bg-transparent rounded-full flex justify-center items-center">
          <p className="text-5xl font-medium text-(--bg-dark) relative text-center">
            {minutes} : {seconds}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-1">
          {workPhases.map((phases) => {
            const status = getStatus(phases.originalIndex);
            return (
              <div key={phases.originalIndex}>
                {status === "done" ? (
                  <AddBtn />
                ) : status === "active" ? (
                  <CircleDot color="#f4a261" />
                ) : status === "pending" ? (
                  <CircleDashed color="#ae2012" />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        {currentPhase.type === "break" && (
          <p className="text-lg font-bold text-(--primary)">Short Break</p>
        )}
        {currentPhase.type === "long-break" && (
          <p className="text-lg font-bold text-(--primary)">Long Break</p>
        )}
      </div>
      <div className="flex justify-center items-center gap-8">
        <button
          onMouseEnter={() => setFullResetAlert(true)}
          onMouseLeave={() => setFullResetAlert(false)}
          onClick={handleFullReset}
          className="relative outline-none"
        >
          <TimerReset
            size={"30px"}
            color="#344e41"
            className="hover:scale-[1.2] transition-all duration-1000 ease-in-out "
          />
          <div
            className={`w-[100px] absolute bg-(--primary) rounded-lg py-1 text-(--bg) left-[50%] -bottom-16 -translate-[50%] ${fullResetAlert === false ? "invisible opacity-0" : "visible opacity-100"}`}
          >
            Full Reset
          </div>
          <div
            className={`absolute w-5 h-3 bg-(--primary) [clip-path:polygon(50%_0%,0%_100%,100%_100%)] left-[50%] -bottom-[23px] -translate-[50%] ${fullResetAlert === false ? "invisible opacity-0" : "visible opacity-100"}`}
          ></div>
        </button>
        <button
          onClick={() => {
            handlePausePlay();
            // completedCycles();
          }}
          className="hover:scale-[1.2]"
        >
          {isRunning ? <StopBtn /> : <PlayBtn />}
        </button>
        <button
          onMouseEnter={() => setExisResetAlert(true)}
          onMouseLeave={() => setExisResetAlert(false)}
          onClick={handleReset}
          className="relative"
        >
          <RotateCcw
            size={"30px"}
            color="#344e41"
            className="hover:scale-[1.2] transition-all duration-1000 ease-in-out"
          />
          <div
            className={`w-[130px] absolute bg-(--primary) rounded-lg text-(--bg) ${exisResetAlert === false ? "invisible opacity-0" : "visible opacity-100"} py-1 left-[50%] -translate-[50%] -bottom-16`}
          >
            Existing Reset
          </div>
          <div
            className={`absolute w-5 h-3 bg-(--primary) [clip-path:polygon(50%_0%,0%_100%,100%_100%)] ${exisResetAlert === false ? "invisible opacity-0" : "visible opacity-100"} left-[50%] -translate-[50%] -bottom-[23px]`}
          ></div>
        </button>
      </div>
      <div className="h-[100px]"></div>
    </>
  );
}

export default App;
