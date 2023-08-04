import { ReactComponent as Members } from "@/assets/svgs/dashboard/total-members.svg";
import { ReactComponent as Subunits } from "@/assets/svgs/dashboard/sub-units.svg";
import { ReactComponent as Birthday } from "@/assets/svgs/dashboard/birthdays.svg";
import { ReactComponent as Absent } from "@/assets/svgs/dashboard/absent.svg";

import SingleLineChart from "./line-chart";
import TwoSegmentedPieChart from "./pie-chart";

const fakeDashboardData = [
  {
    id: 1,
    icon: <Members />,
    numb: "35",
    text: "TOTAL MEMBERS",
  },
  {
    id: 2,
    icon: <Subunits />,
    numb: "08",
    text: "TOTAL SUB-UNITS",
  },
  {
    id: 3,
    icon: <Absent />,
    numb: "05",
    text: "ABSENT LAST WEEK",
  },
  {
    id: 4,
    icon: <Birthday />,
    numb: "02",
    text: "UPCOMING BIRTHDAYS",
  },
];

const Dashboard = () => {
  return (
    <main className="w-full">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-10 w-full">
        {fakeDashboardData.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-[5px] pt-[29px] pb-[33px] pl-[25px]"
          >
            {item.icon}
            <div className="pl-[15px]">
              <h5 className="sm:text-xl text-lg font-bold text-black pb-[3px]">
                {item.numb}
              </h5>
              <p className="text-xs font-normal uppercase sm:text-sm text-text_light">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className="flex flex-col justify-between w-full lg:flex-row">
        <SingleLineChart />
        <TwoSegmentedPieChart />
      </section>
    </main>
  );
};

export default Dashboard;
