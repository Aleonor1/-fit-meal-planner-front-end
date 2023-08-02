import React, { ReactNode } from "react";
import NavigationBar from "../Components/NavigationBar/NavigationBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-teal-400 min-h-screen">
        <NavigationBar />
        <div>{children}</div>
    </div>
  );
};

export default Layout;
