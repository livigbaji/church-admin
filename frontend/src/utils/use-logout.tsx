// import React from "react";
import { logout } from "@/features";
import { useAppDispatch } from "@/store";
// import { API, useLogoutMutation } from "@/services";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  // const [logoutCurrentUser] = useLogoutMutation();

  const handleLogout = async () => {
    // const logoutResponse: any = await logoutCurrentUser();
    // const { message, success } = logoutResponse?.data;
    // if (!success) return toast.error(message);
    toast.success("logged out successfully");
    dispatch(logout());
    // dispatch(API.util.resetApiState());
  };
  return handleLogout;
};
