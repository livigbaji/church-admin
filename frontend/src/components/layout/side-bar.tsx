import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Dashboard } from "@/assets/svgs/dashboard.svg";
import { ReactComponent as Attendance } from "@/assets/svgs/attendance.svg";
import { ReactComponent as Logout } from "@/assets/svgs/logout.svg";
import { ReactComponent as Logo } from "@/assets/svgs/church-logo.svg";
import { ReactComponent as Users } from "@/assets/svgs/users.svg";
import { ReactComponent as Unit } from "@/assets/svgs/unit.svg";
import { ReactComponent as Profile } from "@/assets/svgs/profile.svg";
import { useLogout } from "@/utils";

const routes = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: <Dashboard /> },
  {
    id: 2,
    name: "Attendance",
    href: "/dashboard/attendance",
    icon: <Attendance />,
  },
  { id: 3, name: "Users", href: "/dashboard/users", icon: <Users /> },
  { id: 4, name: "Sub-units", href: "/dashboard/sub-units", icon: <Unit /> },
  { id: 5, name: "Profile", href: "/dashboard/profile", icon: <Profile /> },
];

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const handleLogout = useLogout();

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  // eslint-disable-next-line
  const [sidebarExpanded, _setSidebarExpanded] = useState<any>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-[269px] flex-col overflow-y-hidden bg-[#132034] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="lg:flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 hidden">
        <NavLink to="/" className={`text-white mt-10 flex items-end `}>
          <Logo />
          &nbsp;
          <p className="text-[20px] font-bold">Techunit</p>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 mt-5 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-[46px] flex flex-col gap-3 text-white">
              {/* <!-- Menu Item Dashboard --> */}
              {routes.map((route) => (
                <li key={route.id}>
                  <NavLink
                    to={route.href}
                    className={`group relative cursor-pointer text-base hover:bg-gray-900 flex items-center gap-[30px] rounded-sm h-[43px] px-[23px] font-normal duration-300 ease-in-out  ${
                      pathname == route.href.toLocaleLowerCase() &&
                      "bg-bg_active"
                    }`}
                  >
                    {route.icon}
                    {route.name}
                  </NavLink>
                </li>
              ))}

              {/* <!-- Menu Item dashboard --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div className="absolute bottom-0">
            <ul className="flex flex-col gap-3 mb-6 text-white">
              {/* <!-- Menu Item Logout --> */}

              <li
                role="button"
                onClick={handleLogout}
                className={`group relative cursor-pointer flex items-center gap-[30px] rounded-sm py-2 px-[23px] font-medium text-white duration-300 ease-in-out hover:bg-gray-900`}
              >
                <Logout />
                Logout
              </li>
              {/* <!-- Menu Item Logout --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

// export default Sidebar;
