import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  // Legend,
} from "recharts";

interface DataItem {
  name: string;
  attendance: number;
}

const data: DataItem[] = [
  { name: "Jan", attendance: -100 },
  { name: "Feb", attendance: -20 },
  { name: "Mar", attendance: 60 },
  { name: "Apr", attendance: 0 },
  { name: "May", attendance: 20 },
  { name: "Jun", attendance: -60 },
];

const SingleLineChart: React.FC = () => {
  return (
    <div className="bg-white lg:w-[66%] w-full md:h-[377px] md:pb-0 pb-7 rounded-[5px] lg:mb-0 mb-9 pt-[26px]">
      <h5 className="text-[#828282] border-[#ECECEC] pb-[53px] pl-[37px] border-b mb-[17px] font-semibold text-sm">
        Total Attendance Report
      </h5>
      <ResponsiveContainer width="96%" height={157}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ECECEC" />
          <XAxis
            axisLine={{ stroke: "#ECECEC" }}
            dataKey="name"
            tick={{ fontSize: 10, fill: "#4F4F4F" }}
          />
          <YAxis
            dataKey="attendance"
            axisLine={{ stroke: "#ECECEC" }}
            tick={{ fontSize: 12, fill: "#4F4F4F" }}
          />
          <Tooltip contentStyle={{ fontSize: 14 }} />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#165BAA"
            fill="#165BAA"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleLineChart;
