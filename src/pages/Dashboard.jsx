import React from "react";
import CircleChart from "../components/CircleChart";
import { MdOutlineAddCircle } from "react-icons/md";
import Task from "../components/Task";
import { Link } from "react-router-dom";
import { useState } from "react";
import LineChart from "../components/LineChart";
import { Temporal } from "temporal-polyfill";

const Dashboard = () => {
  const [taskData, setTaskData] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("tasklist"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });

  const handleOnChecked = (id) => {
    setTaskData((prev) => {
      const updated = prev.map((e) => ({
        ...e,
        entries: e.entries.map((i) =>
          i.id === id ? { ...i, checked: !i.checked } : i,
        ),
      }));
      localStorage.setItem("tasklist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteTask = (id) => {
    const targetDel = taskData
      .map((group) => ({
        ...group,
        entries: group.entries.filter((item) => item.id !== id),
      }))
      .filter((i) => i.entries.length > 0);
    setTaskData(targetDel);
    localStorage.setItem("tasklist", JSON.stringify(targetDel));
  };

  const handleClearData = () => {
    localStorage.removeItem("tasklist");
    localStorage.removeItem("arraysys");
    localStorage.removeItem("navToggle");
    setTaskData([]);
  };

  const handleSearchAlert = () => {
    const alert = new Audio("/audio/notification.mp3");
    alert.play();
  };

  const thisDay = Temporal.Now.plainDateISO().toString();
  const getWeekRange = (date = Temporal.Now.plainDateISO()) => {
    const startOfWeek = date.subtract({ days: date.dayOfWeek - 1 });
    const endOfWeek = date.add({ days: 7 - date.dayOfWeek });
    return { startOfWeek, endOfWeek };
  };
  const thisMonth = Temporal.Now.plainDateISO().month
  const thisYear = Temporal.Now.plainDateISO().year
  const monthFilter = taskData.filter((item) => {
    if(!item.date) return false;
    const itemDate = Temporal.PlainDate.from(item.date);
    return itemDate.month === thisMonth && itemDate.year === thisYear
  });
  
  const labels = ['focus', 'focus']
  const dataValues = [20, 40]
  
  return (
    <>
      <div className="w-full px-4 pt-4 pb-16 h-auto max-w-[440px]">
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-(--primary) p-4">Dashboard</h2>
        </div>

        <div className="">
          <div className="border-2 border-[#3a5a40] rounded-2xl px-2 pt-2 pb-3">
            <div className="w-full flex justify-between items-center pb-4">
              <select className="bg-(--primary) text-(--bg) px-2 py-1 text-lg border-2 border-(--primary) rounded-lg outline-none">
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
              </select>
              <button
                onClick={handleSearchAlert}
                className="bg-(--primary) px-2 py-1 border-2 border-(--primary) rounded-lg text-(--bg) hover:border-(--bg-dark) hover:bg-(--bg-dark) cursor-pointer"
              >
                Search
              </button>
            </div>
            <LineChart dataValues={dataValues} labels={labels} />
          </div>
          <div className="w-full h-auto relative flex flex-col justify-center items-center gap-4 my-4">
            <div className="w-full flex justify-between items-center">
              <input
                type="date"
                className="border-2 border-(--primary) px-2 py-1 bg-(--bg-lite) text-(--primary) rounded-lg"
              />
              <button
                onClick={handleSearchAlert}
                className="bg-(--primary) px-2 py-1 border-2 border-(--primary) rounded-lg text-(--bg) hover:border-(--bg-dark) hover:bg-(--bg-dark) cursor-pointer"
              >
                Search
              </button>
            </div>
            <div className="relative">
              <CircleChart />
              <p className="text-xl font-bold leading-5 text-(--primary) text-center absolute top-1/2 left-1/2 -translate-1/2">
                Total Focus Time
              </p>
            </div>
            <p className="text-center pt-1 text-(--primary)">
              Based on 24h day time
            </p>
          </div>
          <Link to={"/add-task"}>
            <button className="w-full h-full flex justify-center items-center gap-1 py-2 text-md bg-(--bg-lite) text-(--primary) rounded-2xl hover:bg-(--primary) hover:text-(--bg-lite) cursor-pointer font-bold">
              Add Task <MdOutlineAddCircle />
            </button>
          </Link>
        </div>
        <div className="w-full h-auto py-8">
          <div className="w-full h-auto border-(--primary) border-b-2 flex justify-between items-center pb-1">
            <h2 className="text-2xl font-bold text-(--primary)">Tasks</h2>
            <button
              onClick={handleClearData}
              className="py-1 px-2 rounded-xl text-(--primary) text-sm font-bold bg-(--bg-lite) hover:bg-(--bg-dark) hover:text-(--bg) cursor-pointer"
            >
              Clear Data
            </button>
          </div>
          {taskData.map((i) => (
            <div key={i.taskListId}>
              <div className="w-full mt-4 flex justify-start items-center">
                <h2 className="px-2 py-1 rounded-lg text-(--bg) text-sm bg-(--secondary)">
                  {i.formatedDate}
                </h2>
              </div>
              {i.entries.map((item) => (
                <Task
                  key={item.id}
                  taskValue={item.task}
                  priorityValue={item.priority}
                  onDelete={() => handleDeleteTask(item.id)}
                  onChecked={item.checked}
                  handleOnChecked={() => handleOnChecked(item.id)}
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
