import Panel from "@/components/panel";
import React from "react";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div
          className={`flex min-h-screen w-full max-w-full flex-col items-center justify-between overflow-hidden`}
          id="app-root"
        >
          <Panel />
          <div
            className={`flex w-screen relative flex-col items-center justify-center`}
          >
            <div className={`flex flex-col w-full min-h-screen pl-[240px]`}>
              <div className="flex-grow">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
