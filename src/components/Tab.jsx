import { Fragment } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import { classNames } from "@/lib/utils";
import { Icon } from "@/components";

import { Skeleton } from "./skeletons/Skeleton";

export function AppTab({
  currentTab,
  setCurrentTab,
  content,
  tabs,
  isLoaded,
  fullWidth,
}) {
  return (
    <Tabs.Root className="relative flex flex-col" value={currentTab}>
      <Tabs.List
        className={classNames("flex", isLoaded && "border-b border-divider")}
        aria-label=""
      >
        {!isLoaded && (
          <>
            {tabs.map((tab) => (
              <Skeleton
                key={tab.id}
                className={classNames(
                  "w-[100px] mx-1 h-[40px] bg-card-skeleton rounded-full"
                )}
              />
            ))}
          </>
        )}
        {isLoaded && (
          <div className="flex w-full overflow-auto hide_scrollbar">
            {tabs.map((tab) => (
              <Fragment key={tab.id}>
                {tab?.display ? (
                  <Tabs.Trigger
                    className={classNames(
                      "p-4 text-secondary flex items-center justify-center leading-none data-[state=active]:text-onNeutralBg data-[state=active]:border-b-2 data-[state=active]:border-onNeutralBg outline-none cursor-pointer font-semibold text-sm whitespace-nowrap",
                      fullWidth ? "w-full" : "w-fit"
                    )}
                    value={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    {tab.icon && <Icon name={tab.icon} size={22} />}
                    {tab.name}
                  </Tabs.Trigger>
                ) : null}
              </Fragment>
            ))}
          </div>
        )}
      </Tabs.List>
      {content &&
        Object?.entries(content).map((page) => (
          <Tabs.Content value={page[0]} key={page[0]}>
            {page[1] || null}
          </Tabs.Content>
        ))}
    </Tabs.Root>
  );
}
