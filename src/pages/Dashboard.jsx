import React from "react";
import BarChart from "../components/BarChart";
import CircleChart from "../components/CircleChart";

const Dashboard = () => {
  return (
    <>
      <div className="w-full p-4 min-h-screen">
        <div className="w-auto h-auto text-center">
          <h2 className="text-2xl font-bold text-(--primary) p-4">Dashboard</h2>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          <div className="border-2 col-span-2 border-[#3a5a40] rounded-2xl">
            <BarChart />
          </div>
          <div className="w-full h-auto border-2 row-span-2 row-start-2">
            <CircleChart />
            <p className="text-xl text-(--primary)">65%</p>
          </div>
          <div className="border-2 row-start-2">5</div>
          <div className="border-2 col-start-2 row-start-3">6</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
