import React from "react";
import { Outlet } from "react-router-dom";
import { DefaultLayout } from "@/layout";

function Dashboard() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

export default Dashboard;
