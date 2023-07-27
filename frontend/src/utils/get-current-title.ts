// useCurrentRouteTitle.ts
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useCurrentRouteTitle(): string {
  const location = useLocation();
  const [currentRouteTitle, setCurrentRouteTitle] = useState<string>("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const title = pathSegments[pathSegments.length - 1];
    setCurrentRouteTitle(title.charAt(0).toUpperCase() + title.slice(1));
  }, [location]);

  return currentRouteTitle;
}
