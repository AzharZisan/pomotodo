import React from "react";
import BarChart from "../components/BarChart";
import CircleChart from "../components/CircleChart";

const Dashboard = () => {
  return (
    <>
      <div className="w-full p-4 h-auto">
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-(--primary) p-4">Dashboard</h2>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          <div className="border-2 col-span-2 border-[#3a5a40] rounded-2xl">
            <BarChart />
          </div>
          <div className="w-full h-auto row-span-2 row-start-2 relative">
            <CircleChart />
            <p className="text-3xl text-(--primary) absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              65%
            </p>
          </div>
          <div className="w-full h-auto border-2 row-start-2">hello</div>
          <div className="border-2 col-start-2 row-start-3">6</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
