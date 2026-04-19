import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const Task = ({ taskValue, priorityValue, onDelete, onChecked, handleOnChecked }) => {

  return (
    <>
      <div className="w-full h-auto flex justify-between items-start py-2 px-3 my-3 bg-(--bg-lite) rounded-xl">
        <div className="flex justify-center items-start gap-2 max-w-[70%]">
          <input
            type="checkbox"
            name=""
            id=""
            checked={onChecked}
            onChange={handleOnChecked}
            className="translate-y-2"
          />
          <p
            className={`text-lg flex ${onChecked === true ? `line-through` : ``}`}
          >
            {taskValue}
          </p>
        </div>
        <div className="flex justify-center items-center gap-1 translate-y-1">
          <p className="text-sm text-(--primary) font-bold">Priority</p>
          <p className="px-1 text-sm bg-(--primary) text-(--bg) rounded-md">
            {priorityValue}
          </p>
          <MdDeleteOutline
            onClick={onDelete}
            className="text-xl ml-2 text-(--primary) hover:text-(--bg-dark) cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Task;
