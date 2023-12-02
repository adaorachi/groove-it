import { classNames } from "@/lib/utils";

import { Icon } from "..";

export default function ShowMoreButton({ className, ...props }) {
  return (
    <button
      className={classNames(
        "mt-4 text-secondary text-sm border border-secondary rounded-full p-2 flex items-center justify-between hover:text-onNeutralBg hover:bg-sidebar gap-1",
        className
      )}
      {...props}
    >
      See more
      <Icon name="BiChevronsRight" className="text-secondary" />
    </button>
  );
}
