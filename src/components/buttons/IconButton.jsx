import { forwardRef } from "react";

import { classNames } from "@/lib/utils";

import { Icon } from "@/components";

const IconButton = forwardRef(
  (
    {
      type = "button",
      name,
      size,
      className,
      iconClassName,
      disabled,

      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={classNames(
          "h-10 w-10 rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 duration-300 ease-linear outline-none hover:scale-[1.1] transition-all ",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <Icon name={name} size={size} className={iconClassName} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
