import { useState } from "react";
import { Select } from "..";

const AttendanceComp = () => {
  const [viewServices, setViewServices] = useState<string | number>(
    "all-services"
  );

  const services = [
    { name: "All services", value: "all-services" },
    { name: "1 service", value: "1-service" },
    { name: "2 services", value: "2-services" },
    { name: "3 services", value: "3-services" },
  ];

  return (
    <main className="lg:w-[35%] w-full mx-auto lg:mt-[60px] mt-11">
      <form className="w-full">
        <div className="w-full">
          <label className="text-sm font-normal text-black">Sub-unit</label>
          <Select
            className="h-[49px] mt-[11px] bg-white"
            placeholder="Select sub unit"
            onChange={(e) => e.preventDefault()}
          />
        </div>
        <div className="w-full my-[30px]">
          <label className="text-sm font-normal text-black">User</label>
          <Select
            className="h-[49px] mt-[11px] bg-white"
            placeholder="Select user"
            onChange={(e) => e.preventDefault()}
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-normal text-black">Services</label>
          <Select
            className="h-[49px] mt-[11px] bg-white"
            placeholder="How many services"
            onChange={(value) => setViewServices(value)}
            options={services}
            value={viewServices}
          />
        </div>
        <div className="w-full mt-8">
          <button
            type="submit"
            className="w-full bg-primary rounded-[5px] text-white text-xs font-semibold py-3"
          >
            CHECK
          </button>
        </div>
      </form>
    </main>
  );
};

export default AttendanceComp;
