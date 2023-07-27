import { Select } from "@/components";
import { useState } from "react";

const Users = () => {
  const duration = [
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "This Week", value: "this_week" },
    { name: "Last Week", value: "last_week" },
    { name: "Last 7 Days", value: "last_7_days" },
    { name: "Last 28 Days", value: "last_28_days" },
    { name: "This Month", value: "this_month" },
    { name: "Last Month", value: "last_month" },
    { name: "Last 3 Months", value: "last_3_months" },
    { name: "This Year", value: "this_year" },
    { name: "Last Year", value: "last_year" },
  ];
  const [viewsDuration, setViewsDuration] = useState<string | number>("today");
  return (
    <section>
      <div className="bg-white py-10 flex">
        {/* <Selection */}
        <Select
          value={viewsDuration}
          onChange={(value) => setViewsDuration(value)}
          options={duration}
          className=" w-[150px] h-10 focus:outline-[2px] focus:outline-[#1CBD6] bg-white"
        />
      </div>
    </section>
  );
};

export default Users;
