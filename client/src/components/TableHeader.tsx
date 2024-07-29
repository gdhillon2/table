import React from "react";

const TableHeader: React.FC = () => {
  return (
    <div className="text-md text-slate-100 bg-slate-700 rounded-tr-lg rounded-tl-lg">
      <div className="flex justify-between items-center rounded-lg py-2 px-3">
        <span className="w-1/3 font-semibold">name</span>
        <span className="w-1/3 font-semibold">amount</span>
        <span className="w-1/3 font-semibold">date</span>
        <span className="w-1/6 font-semibold">actions</span>
      </div>
    </div>
  );
};

export default TableHeader;
