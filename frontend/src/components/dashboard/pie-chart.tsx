import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "Males", value: 600 },
  { name: "Females", value: 600 },
];

const COLORS = ["#D9D9D9", "#132034"];

const TwoSegmentedPieChart: React.FC = () => {
  return (
    <div className="bg-white lg:w-[32%] w-full rounded-[5px] pt-[26px] md:h-[377px] md:pb-0 pb-[15px]">
      <h5 className="text-[#828282] font-semibold text-sm mb-4 pl-6">
        Males vs Females
      </h5>
      <ResponsiveContainer width="100%" height={195}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="lg:w-[70%] w-4/5 mx-auto border-b sm:mt-11 mt-6 border-[#828282] mb-[17px]" />
      <div className="flex items-center justify-between mx-9">
        <div className="flex items-center">
          <p className="bg-[#132034] w-[14px] rounded-[5px] h-[5px] mr-[10px]" />
          <p className="text-xs font-semibold text-[#828282]">Males</p>
        </div>
        <div className="flex items-center">
          <p className="bg-[#D9D9D9] w-[14px] rounded-[5px] h-[5px] mr-[10px]" />
          <p className="text-xs font-semibold text-[#828282]">Females</p>
        </div>
      </div>
    </div>
  );
};

export default TwoSegmentedPieChart;
