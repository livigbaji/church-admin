// import { useAuth, getUserType } from "@/features/auth/hooks/use-auth";
import { useAuth } from "@/features/auth";
import { Navigate, useLocation } from "react-router-dom";

// import { useAuth } from "@/features/auth";

const PRIVATE = ["dashboard"];
const PUBLIC = ["/enter-password", "/"];

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const path = useLocation().pathname;
  const auth = useAuth() || null;
  // const user = useUser();
  const isLoggedIn = auth !== null;

  // console.log(isLoggedIn, "isLoggedIn");

  const isPrivate = PRIVATE.some((route) => path.includes(route));

  if (isPrivate && !isLoggedIn) return <Navigate to="/" replace />;
  // if user is an company admin
  // if user is an company admin
  if (PUBLIC.includes(path) && isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
