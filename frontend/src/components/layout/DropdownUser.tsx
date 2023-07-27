import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logout } from "@/assets/svgs/logout.svg";
import { useUser } from "@/features";
import { getInitials, useLogout } from "@/utils";
export const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const user = useUser();

  console.log(user, "user");

  const handleLogout = useLogout();

  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <div className="hidden text-right lg:block">
          <p>Admin</p>
        </div>

        <span className="h-[50px] px-4 border rounded flex items-center justify-center truncate text-sm">
          {/* ADMIN */}

          {getInitials(user?.fullName)}
        </span>
        {/* <Caret /> */}
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-[200px] flex-col rounded-sm border bg-white shadow-default  ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out text-primary lg:text-base  hover:text-[#FFA400] "
        >
          <Logout />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};
