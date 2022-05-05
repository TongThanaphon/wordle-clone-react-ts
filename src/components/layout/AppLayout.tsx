import React from "react";

import "./styles/app-layout.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props;

  return <div className="layout">{children}</div>;
};

export default AppLayout;
