"use client";

import React from "react";

import { HomeIcon } from "./icons";
import { PanelItem } from "./panelitem";
import Link from "next/link";

interface PanelType {}

const Panel = ({}: PanelType) => {
  return (
    <div
      className={`flex flex-col min-h-screen transition-all w-[240px] fixed bg-[#1F2330] text-white items-center left-0 py-4 font-semibold z-[100]`}
    >
      <div className="w-full border-b-[1px] border-dark-80 px-8 pt-8 pb-6 min-h-[175] flex flex-col justify-around items-between">
        <h1 className="font-bold text-2xl">Issues R Us</h1>
      </div>
      <div className="py-4 w-full px-8 flex flex-col justify-between items-between flex-grow">
        <div>
          <Link href="/app/">
            <PanelItem
              text={"Home"}
              icon={<HomeIcon className="mr-2 fill-white text-white" />}
            />
          </Link>
          {/* <Link href="/app/explore">
            <PanelItem
              text={"Explore"}
              icon={<ExploreIcon className="mr-2" />}
              highlighted={exploreHighlighted}
            />
          </Link>
          <Link href="/app/community">
            <PanelItem
              text={"Community"}
              icon={<CommunityIcon className="mr-2" />}
              highlighted={communityHighlighted}
            />
          </Link>
          <Link href="/app/my">
            <PanelItem
              text={"My Prompts"}
              icon={<MyPromptsIcon className="mr-2" />}
              highlighted={myPromptsHighlighted}
            />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Panel;
