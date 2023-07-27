import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth";

export const useAuth = () => {
  const token = useSelector(selectToken);

  return token;
};
