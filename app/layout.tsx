// import { Navbar } from "@/components/Navbar";
import Panel from "@/components/panel";
import "./globals.css";
import React from "react";

const NavLayout = ({
  className = "",
  children,
  noPad = true,
  hidePanel = false,
}: {
  className?: string;
  children: React.ReactNode;
  noPad?: boolean;
  hidePanel?: boolean;
}) => {
  return (
    <RootLayout>
      <div
        className={`${className} flex min-h-screen w-full max-w-full flex-col items-center justify-between overflow-hidden`}
        id="app-root"
      >
        {/* <Navbar /> */}
        <Panel />

        <div
          className={`${
            !noPad && "mb-10"
          }  flex w-screen relative flex-col items-center justify-center`}
        >
          <div className={`flex flex-col w-full min-h-screen pl-[240px]`}>
            <div className="flex-grow">{children}</div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default NavLayout;
