import React from "react";
import BarChart from "../components/BarChart";
import CircleChart from "../components/CircleChart";
import { MdOutlineAddCircle } from "react-icons/md";
import Task from "../components/Task";
import { Link } from "react-router-dom";
import { Temporal } from "temporal-polyfill";

const Dashboard = () => {
  const taskData = JSON.parse(localStorage.getItem("tasklist")) || [];
  let entries = taskData.flatMap((i) => i.entries);
  const taskdate = taskData.flatMap((i) => i.date.slice(6,7))
  const erx = taskdate[0]

  const day = Temporal.Now.plainDateISO().day;
  const monthCode = Temporal.Now.plainDateISO().month;
  const monthValue = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const month = monthValue[erx];
  const year = Temporal.Now.plainDateISO().year
  // console.log(day,month,year)

  return (
    <>
      <div className="w-full px-4 pt-4 pb-16 h-auto max-w-[440px]">
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
          <Link to={"/add-task"}>
            <button className="w-full h-full flex justify-center items-center gap-1 text-md col-start-2 row-start-3 bg-(--bg-lite) text-(--primary) rounded-2xl hover:bg-(--primary) hover:text-(--bg-lite) cursor-pointer font-bold">
              Add Task <MdOutlineAddCircle />
            </button>
          </Link>
        </div>
        <div className="w-full h-auto py-8">
          <div className="w-full h-auto border-(--primary) border-b-2 flex justify-between items-center pb-1">
            <h2 className="text-2xl font-bold text-(--primary)">
              Tasks
            </h2>
            <button className="py-1 px-2 rounded-xl text-(--primary) text-sm font-bold bg-(--bg-lite) hover:bg-(--bg-dark) hover:text-(--bg) cursor-pointer">Clear Task</button>
          </div>
          {taskData.map((i) => (
            <div key={i.taskListId}>
              <div className="w-full mt-4 flex justify-start items-center">
                <h2 className="px-2 py-1 rounded-lg text-(--bg) text-sm bg-(--secondary)">
                  {i.date}
                </h2>
              </div>
              {i.entries.map((item) => (
                <Task
                  key={item.id}
                  taskValue={item.task}
                  priorityValue={item.priority}
                  taskId={item.id}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
