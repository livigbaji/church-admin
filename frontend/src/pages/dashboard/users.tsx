import React, { useState } from "react";

import { ReactComponent as EyeIcon } from "@/assets/svgs/dashboard/eye.svg";
import { ReactComponent as PlusIcon } from "@/assets/svgs/dashboard/plus.svg";
import { ReactComponent as CloseIcon } from "@/assets/svgs/dashboard/close-x.svg";

import { Select } from "@/components";
import { Table } from "@/components/table";
import CustomFileInput from "@/components/custom-file-input/custom-file-input";
import AddUserButton from "@/components/add-user-button";

const Users = () => {
  const [viewsDuration, setViewsDuration] = useState<string | number>("");

  const handleFileSelect = (file: File | null) => {
    // Handle the selected file here
    if (file) {
      console.log("Selected File:", file);
      // You can perform further actions with the selected file
    } else {
      console.log("No file selected");
    }
  };

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

  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "", // accessor is the "key" in the data
        Cell: ({ cell: { row } }: any) => <>{row.index + 1}.</>,
      },
      {
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Sub Unit",
        accessor: "subunit",
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: ({}: any) => (
          <div className="border-[0.50px] flex justify-around w-[75px] h-[25px] border-[#525252] rounded-[5px]">
            <div className="py-[5px]">
              <PlusIcon />
            </div>
            <div className="py-[5px] px-1 border-x border-[#525252]">
              <EyeIcon />
            </div>
            <div className="py-[5px]">
              <CloseIcon />
            </div>
          </div>
        ),
      },
    ],
    []
  );
  const data = [
    {
      key: "1",
      name: "John Brown",
      phoneNumber: "+91-0000000000",
      subunit: "video",
    },
    {
      key: "1",
      name: "John Brown",
      phoneNumber: "+91-0000000000",
      subunit: "video",
    },
    {
      key: "1",
      name: "John Brown",
      phoneNumber: "+91-0000000000",
      subunit: "Admin",
    },
    {
      key: "1",
      name: "John Brown",
      phoneNumber: "+91-0000000000",
      subunit: "Admin",
    },
    {
      key: "1",
      name: "John Brown",
      phoneNumber: "+91-0000000000",
      subunit: "Admin",
    },
    {
      key: "1",
      name: "John Brown",
      phoneNumber: "+91-0000000000",
      subunit: "Video",
    },
  ];
  return (
    <section className="bg-white -z-[300px] pb-[131px] rounded-[5px]">
      {/* <Selection */}
      <div className="flex flex-wrap py-10 justify-between items-center sm:pb-[51px] sm:px-[54px] px-5 w-full">
        <Select
          value={viewsDuration}
          onChange={(value) => setViewsDuration(value)}
          options={duration}
          placeholder="Filter by"
          className="w-[173px] h-[43px] focus:outline-[2px] focus:outline-[#1CBD6] bg-white"
        />

        {/* Button section */}
        <div className="flex justify-between sm:w-[328px] w-full flex-wrap margin">
          <CustomFileInput
            onFileSelect={handleFileSelect}
            className="mb-5 sm:mb-0"
          />
          <AddUserButton />
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="w-full">
        <Table
          data={data}
          columns={columns}
          pageCount={40}
          setQueryParams={() => {}}
        />
      </div>
    </section>
  );
};

export default Users;
