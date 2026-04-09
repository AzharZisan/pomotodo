import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const AddTask = () => {
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
              id="priority"
              className="px-2 mr-0.5 rounded bg-(--primary) text-(--bg) outline-none font-bold"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <Link to={"/"}>
          <button className="w-[300px] flex justify-center items-center gap-2 p-4 mt-4 bg-(--bg-lite) rounded-xl text-(--primary) font-bold hover:bg-(--bg-dark) hover:text-(--bg) cursor-pointer">
            Add Task <MdOutlineAddCircle />
          </button>
        </Link>
      </div>
    </>
  );
};

export default AddTask;
