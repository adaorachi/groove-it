import { forwardRef } from "react";

import { classNames } from "@/lib/utils";

import { Icon } from "@/components";

const Button = forwardRef(
  (
    {
      type,
      label,
      disabled,
      className,
      variant,
      labelIcon,
      isSubmitting,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={classNames(
          variant === "outlined" && "border border-primary text-primary",
          variant === "contained" && "bg-primary text-white",
          variant === "gradient" &&
            "bg-gradient-to-r from-button_gradient_from to-button_gradient_to text-white",
          "rounded font-semibold text-sm py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 ease-linear scale-1 outline-none",
          className
        )}
        disabled={disabled || isSubmitting}
        type={type}
        ref={ref}
        {...props}
      >
        {!isSubmitting ? (
          <div className="flex flex-row items-center">
            {labelIcon && (
              <div className="mr-1">
                <Icon
                  name={labelIcon}
                  className={classNames(
                    variant === "contained" && "text-primary",
                    variant === "filled" && "text-white",
                    variant === "gradient" && "text-white"
                  )}
                />
              </div>
            )}
            <div className="w-full text-center whitespace-nowrap">{label}</div>
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
