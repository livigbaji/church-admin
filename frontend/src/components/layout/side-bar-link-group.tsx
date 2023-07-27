import React, { useState } from "react";

interface ISidebarLinkGroup {
  children: any;
  activeCondition: boolean;
}
export const SidebarLinkGroup = ({
  children,
  activeCondition,
}: ISidebarLinkGroup) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};
