import React from "react";
import BarChart from "../components/BarChart";
import CircleChart from "../components/CircleChart";
import { MdOutlineAddCircle } from "react-icons/md";
import Task from "../components/Task";

const Dashboard = () => {
  return (
    <>
      <div className="w-full px-4 pt-4 pb-16 h-auto">
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-(--primary) p-4">Dashboard</h2>
        </div>

        <div className="grid grid-cols-2 grid-rows-auto gap-4">
          <div className="border-2 col-span-2 border-[#3a5a40] rounded-2xl">
            <BarChart />
          </div>
          <div className="w-full h-auto row-span-2 row-start-2 relative">
            <CircleChart />
            <p className="text-3xl text-(--primary) absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              65%
            </p>
          </div>
          <div className="w-full h-auto rounded-2xl row-start-2 flex justify-center px-4 items-center bg-(--primary)">
            <div className="w-full h-[60px]">
              <CircleChart />
            </div>
            <p className="w-full h-auto text-md font-bold text-(--bg) leading-4">
              Total Focus Time
            </p>
          </div>
          <div className="w-full h-auto flex justify-center items-center gap-1 text-md col-start-2 row-start-3 bg-(--bg-lite) text-(--primary) rounded-2xl hover:bg-(--primary) hover:text-(--bg-lite) cursor-pointer font-bold">
            Add Task <MdOutlineAddCircle />
          </div>
        </div>
        <div className="w-full h-auto py-8">
          <h2 className="text-2xl font-bold text-(--primary) border-b-2 border-(--primary)">
            Tasks
          </h2>
          <div className="w-full mt-4 flex justify-start items-center"><h2 className="px-2 py-1 rounded-lg text-(--bg) text-sm bg-(--secondary)">21 Jan 2025</h2></div>
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
