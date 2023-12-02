import { classNames } from "@/lib/utils";

import { Icon } from "..";

const Title = ({
  name,
  desc,
  type,
  color,
  className,
  divider = true,
  showMoreLink,
}) => {
  const fontType = () => {
    switch (type) {
      case "extra-large":
        return "text-3xl";
      case "large":
        return "text-2xl";
      case "medium":
        return "text-xl";
      case "small":
        return "text-lg";
      case "extra-small":
        return "text-sm";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex_justify_between">
        <h2
          className={classNames(
            "font-semibold",
            fontType(),
            color === "primary" ? "text-primary" : "text-onNeutralBg",
            className
          )}
        >
          {name}
        </h2>
        {showMoreLink && (
          <button
            className="flex items-center justify-between gap-1 p-2 text-sm border rounded-full text-secondary border-main hover:text-onNeutralBg hover:bg-sidebar hover:border-secondary"
            onClick={showMoreLink}
          >
            See more <Icon name="BiChevronsRight" className="text-secondary" />
          </button>
        )}
      </div>
      {desc && (
        <p className="-mt-2 text-sm font-normal tracking-wider text-secondary">
          {desc || "Top picks for you. Updated daily."}
        </p>
      )}
      {divider && <div className="w-full h-[1px] bg-divider" />}
    </div>
  );
};

export default Title;
