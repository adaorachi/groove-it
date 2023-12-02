import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { classNames } from "@/lib/utils";

export function AppDropdownMenu({
  DropdownTrigger,
  DropdownContent,
  contentClassName,
}) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="w-full text-left">
          <DropdownTrigger />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute right-0 z-10 mt-2 origin-top-right rounded bg-card shadow-box text-onNeutralBg",
            contentClassName
          )}
        >
          {/* bg-sidebar rounded shadow-lg w-[300px] */}
          <div className="p-1 text-sm">
            {DropdownContent && <DropdownContent />}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
