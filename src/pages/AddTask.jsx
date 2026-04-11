import React, { useRef, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Temporal } from "temporal-polyfill";

const AddTask = () => {
  const taskData = JSON.parse(localStorage.getItem("tasklist")) || [];
  const [inputTask, setInputTask] = useState("");
  const thisDay = Temporal.Now.plainDateISO().toString();
  const dateInputRef = useRef();
  const priorityInputRef = useRef();

  const handleInputTask = (e) => {
    setInputTask(e.target.value);
  };

  const handleDateRef = () => {
    dateInputRef.current.value;
  };

  const handlePriorityRef = () => {
    priorityInputRef.current.value
  }

  const taskLength = taskData.flatMap((i) => i.entries).length;
  const taskUniId = taskData.flatMap((i) => i.entries).map((i) => i.id)

  const handleAddTaskData = () => {
    const taskList = {
      date: dateInputRef.current.value,
      entries: [{
        id: crypto.randomUUID(),
        task: inputTask,
        priority: priorityInputRef.current.value,
      }],
    };
    setInputTask("");
    const updatedTaskData = [...taskData, taskList];
    
    const merged = updatedTaskData.reduce((acc, item) => {
      const existing = acc.find((i) => i.date === item.date)
      if (existing) {
        existing.entries.push(...item.entries)
      } else {
        acc.push({...item})
      }
      return acc
    },[])
    localStorage.setItem("tasklist", JSON.stringify(merged));
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col bg-(--bg)">
        <h2 className="text-2xl text-(--primary) font-bold mb-2">Add Tasks</h2>
        <div className="w-[300px] flex justify-center items-center flex-col bg-(--primary) rounded-xl p-4">
          <div className="w-full flex flex-col justify-center items-start pb-3">
            <label htmlFor="text" className="text-lg font-semibold text-(--bg)">
              Assign
            </label>
            <input
              value={inputTask}
              onChange={handleInputTask}
              type="text"
              placeholder="Add your tasks..."
              className="w-full outline-none bg-(--bg) p-2 text-(--primary) rounded-lg"
              id="text"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start pb-3">
            <label htmlFor="date" className="text-lg font-semibold text-(--bg)">
              Date
            </label>
            <input
              ref={dateInputRef}
              value={thisDay}
              onChange={handleDateRef}
              type="date"
              id="date"
              className="w-full outline-none bg-(--bg) p-2 text-(--primary) rounded-lg"
            />
          </div>
          <div className="w-full flex justify-between items-center p-2 bg-(--bg) rounded-lg">
            <label
              htmlFor="priority"
              className="font-semibold text-(--primary)"
            >
              Priority
            </label>
            <select
            ref={priorityInputRef}
            onChange={handlePriorityRef}
              id="priority"
              className="px-2 mr-0.5 rounded bg-(--primary) text-(--bg) outline-none font-bold"
            >
              {Array.from({length: taskLength + 1}, (_, i) => (
                <option key={taskUniId} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>
        <Link to={"/dashboard"}>
          <button
            onClick={handleAddTaskData}
            className="w-[300px] flex justify-center items-center gap-2 p-4 mt-4 bg-(--bg-lite) rounded-xl text-(--primary) font-bold hover:bg-(--bg-dark) hover:text-(--bg) cursor-pointer"
          >
            Add Task <MdOutlineAddCircle />
          </button>
        </Link>
      </div>
    </>
  );
};

export default AddTask;
