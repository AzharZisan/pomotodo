import React, { useMemo, useRef } from "react";
import CircleChart from "../components/CircleChart";
import { MdOutlineAddCircle } from "react-icons/md";
import Task from "../components/Task";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "../components/LineChart";
import { Temporal } from "temporal-polyfill";

const Dashboard = () => {
  //tasklist parsing
  const [taskData, setTaskData] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("tasklist"));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });

  //checked toogle btn
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

  //task delete func
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

  //task reset / localstorage remove
  const handleClearData = () => {
    localStorage.removeItem("tasklist");
    localStorage.removeItem("arraysys");
    localStorage.removeItem("navToggle");
    setTaskData([]);
  };

  //circle chart search audio
  const handleSearchAlert = () => {
    const alert = new Audio("/audio/notification.mp3");
    alert.play();
  };

  //date ranges
  const thisDay = Temporal.Now.plainDateISO().toString();

  const getWeekRange = (date = Temporal.Now.plainDateISO()) => {
    const startOfWeek = date.subtract({ days: date.dayOfWeek - 1 });
    const endOfWeek = date.add({ days: 7 - date.dayOfWeek });
    return { startOfWeek, endOfWeek };
  };
  const LSFocusTime = JSON.parse(localStorage.getItem("focusTime")) ?? [];
  const { startOfWeek, endOfWeek } = getWeekRange();
  const weekFilter = LSFocusTime.filter((item) => {
    if (!item.date) return;
    const itemDate = Temporal.PlainDate.from(item.date);
    return (
      Temporal.PlainDate.compare(itemDate, startOfWeek) >= 0 &&
      Temporal.PlainDate.compare(itemDate, endOfWeek) <= 0
    );
  });
  const weekFilterData = useMemo(() => {
    const weekMap = {};
    for (let i = 0; i < 7; i++) {
      const days = startOfWeek.add({ days: i }).toString();
      weekMap[days] = 0;
    }

    LSFocusTime.forEach((item) => {
      if (weekMap[item.date] !== undefined) {
        weekMap[item.date] = item.focus;
      }
    });

    return weekMap;
  }, []);

  const thisMonth = Temporal.Now.plainDateISO().month;
  const thisYear = Temporal.Now.plainDateISO().year;
  const monthFilter = LSFocusTime.filter((item) => {
    if (!item.date) return false;
    const itemDate = Temporal.PlainDate.from(item.date);
    return itemDate.month === thisMonth && itemDate.year === thisYear;
  });
  const dayRangeInMonth = Temporal.Now.plainDateISO().daysInMonth;
  const startOfMonth = Temporal.PlainDate.from({
    year: thisYear,
    month: thisMonth,
    day: 1,
  });
  const monthFilterData = useMemo(() => {
    const monthMap = {};
    for (let i = 0; i < dayRangeInMonth; i++) {
      const days = startOfMonth.add({ days: i }).toString();
      monthMap[days] = 0;
    }

    LSFocusTime.forEach((item) => {
      if (monthMap[item.date] !== undefined) {
        monthMap[item.date] = item.focus;
      }
    });

    return monthMap;
  }, []);

  //btn indexes
  const dayValueIndex = {
    thisWeek: weekFilterData,
    thisMonth: monthFilterData,
  };

  //arraysys parse
  const arraysys = JSON.parse(localStorage.getItem("arraysys")) ?? {};
  //phases parse
  const getPhases = JSON.parse(localStorage.getItem("phases")) ?? [];

  //sum of duration of completed: true obj
  const existingTrueFocus = getPhases
    .filter((i) => i.completed === true)
    .reduce((acc, item) => {
      return acc + item.duration ?? 0;
    }, 0);

  //completed cycle parse
  const complecyc = localStorage.getItem("completedCycles");
  //subtotal seconds of done times in timer
  const finalResult = complecyc * 8100 + existingTrueFocus - arraysys.timeLeft;

  //states for date value and prop data for search of circle chart
  const [circleDate, setCircleDate] = useState(thisDay);
  const [circleChartData, setCircleChartData] = useState(null);

  //value of selected date
  const handleCircleDateRef = (e) => {
    setCircleDate(e.target.value);
  };

  //logic for new date and this day array adding and updating
  useEffect(() => {
    const LSFocusTime = JSON.parse(localStorage.getItem("focusTime")) ?? [];
    const todayExists = LSFocusTime.some((i) => i.date === thisDay);

    let updated;
    if (!todayExists) {
      updated = [...LSFocusTime, { date: thisDay, focus: finalResult }];
    } else {
      updated = LSFocusTime.map((i) =>
        i.date === thisDay ? { ...i, focus: finalResult } : i,
      );
    }
    localStorage.setItem("focusTime", JSON.stringify(updated));
  }, [finalResult]);

  //parsing focus time from focusTime array as per date
  const getFocusTime = useMemo(() => {
    const getfocus = JSON.parse(localStorage.getItem("focusTime")) || [];
    const target = getfocus.find((i) => i.date === circleDate);
    return getfocus ? target?.focus : 0;
  }, [circleDate]);

  //hr and min of parsed focus time
  const finalHr = Math.floor(getFocusTime / 3600);
  const finalMin = Math.floor((getFocusTime % 3600) / 60);

  //dataset and labels for circle chart as prop
  const handleSearchCirData = () => {
    setCircleChartData({
      values: [86400 - getFocusTime, getFocusTime],
      labels: [
        `Rest of the day ${23 - finalHr}h ${60 - finalMin}m`,
        `Your Focus ${finalHr}h ${finalMin}m`,
      ],
    });
  };

  //select value parse
  const [selectValue, setSelectValue] = useState("thisWeek");
  const handleSelectRef = (e) => {
    setSelectValue(e.target.value);
  };

  //labels and values for linechart
  const labels = Object.keys(dayValueIndex[selectValue]);
  const values = Object.values(dayValueIndex[selectValue]);

  return (
    <>
      <div className="w-full px-4 pt-4 pb-16 h-auto max-w-[440px]">
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-(--primary) p-4">Dashboard</h2>
        </div>

        <div className="">
          <div className="border-2 border-[#3a5a40] rounded-2xl px-2 pt-2 pb-3">
            <div className="w-full flex justify-start items-center pb-4">
              <select
                value={selectValue}
                onChange={handleSelectRef}
                className="bg-(--primary) text-(--bg) px-2 py-1 text-lg border-2 border-(--primary) rounded-lg outline-none"
              >
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
              </select>
            </div>
            <LineChart labels={labels} dataValues={values} />
          </div>
          <div className="w-full h-auto relative flex flex-col justify-center items-center gap-4 my-4">
            <div className="w-full flex justify-between items-center">
              <input
                value={circleDate}
                onChange={handleCircleDateRef}
                type="date"
                className="border-2 border-(--primary) px-2 py-1 bg-(--bg-lite) text-(--primary) rounded-lg"
              />
              <button
                onClick={() => {
                  (handleSearchAlert(), handleSearchCirData());
                }}
                className="bg-(--primary) px-2 py-1 border-2 border-(--primary) rounded-lg text-(--bg) hover:border-(--bg-dark) hover:bg-(--bg-dark) cursor-pointer"
              >
                Search
              </button>
            </div>
            <div className="relative">
              <CircleChart
                CirLabels={circleChartData?.labels ?? []}
                CirDataValues={circleChartData?.values ?? []}
              />
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
