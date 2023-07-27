import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth";

export const useUser = () => {
  const userJson = useSelector(selectCurrentUser);
  let user = userJson;

  const fullName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : "";

  return {
    user,
    fullName,
  };
};
