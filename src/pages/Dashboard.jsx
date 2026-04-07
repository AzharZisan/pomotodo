import React from "react";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  return (
    <>
      <div className="w-full p-4">
        <div className="w-full h-auto text-center">
          <h2 className="text-2xl font-bold text-(--primary) p-4">Dashboard</h2>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          <div className="border-2 col-span-2"><BarChart /></div>
          <div className="border-2 row-span-2 row-start-2">4</div>
          <div className="border-2 row-start-2">5</div>
          <div className="border-2 col-start-2 row-start-3">6</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
