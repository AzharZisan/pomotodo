import React from "react";
import { useState } from "react";
import AnalyticsBtn from "../components/AnalyticsBtn";
import { Timer } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [navToggle, setNavToggle] = useState(() => {
    const stored = localStorage.getItem('navToggle')
    return stored === 'true'
  })
  const handleNavBtn = () => {
    setNavToggle((prev) => {
      const nextState = !prev
      localStorage.setItem('navToggle', nextState)
      return nextState
    })
  }

  const navigate = useNavigate()
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="w-full h-auto bg-(--bg) py-2 flex flex-col justify-center items-center gap-10 ">
          <Outlet />

          <nav className="flex justify-center items-center gap-4 bg-(--primary) p-2 rounded-full fixed bottom-8">
            <button
              onClick={() => {
                (handleNavBtn(), navigate("/"));
              }}
              className={`p-2 rounded-full flex justify-center items-center gap-0 text-(--primary) ${navToggle ? "bg-(--bg)" : "bg-(--bg-lite)"}`}
            >
              <Timer className="mx-0.5 hover:scale-[1.1]" />
              <p
                className={`text-xl font-medium ${navToggle ? `opacity-0 max-w-0` : `opacity-100 max-w-xs`}`}
              >
                Timer
              </p>
            </button>
            <button
              onClick={() => {
                (handleNavBtn(), navigate("/dashboard"));
              }}
              className={`p-2 rounded-full flex justify-center items-center gap-1 text-(--primary) ${navToggle ? "bg-(--bg-lite)" : "bg-(--bg)"}`}
            >
              <AnalyticsBtn />
              <p
                className={`text-xl font-medium ${navToggle ? `opacity-100 max-w-xs` : `opacity-0 max-w-0`}`}
              >
                Dashboard
              </p>
            </button>
          </nav>
        </div>
      </section>
    </>
  );
};

export default MainLayout;
