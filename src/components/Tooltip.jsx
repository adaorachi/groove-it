import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { startCase } from "lodash";

import { classNames } from "@/lib/utils";

import { Icon } from "@/components";

export const AppTooltip = ({
  children,
  id,
  tooltipType = "hover",
  TooltipComp,
  arrowPos = "left-center",
  arrowClassName = "text-primary",
  disabled,
  hideTooltipFunc,
}) => {
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    position: { top: 0, left: 0, right: 0 },
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        tooltipState?.isVisible &&
        event.target.closest(`.dropdown_${id}`) === null
      ) {
        setTooltipState({
          isVisible: false,
          position: { top: 0, left: 0 },
        });
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [id, tooltipState]);

  const toggleTooltip = (event) => {
    if (tooltipState.isVisible) {
      setTooltipState({ isVisible: false, position: { top: 0, left: 0 } });
    } else {
      const { top, right } = event.target.getBoundingClientRect();

      setTooltipState({
        isVisible: true,
        position: { top: top, left: right },
      });
    }
  };

  const hideTooltip = () => {
    if (tooltipState.isVisible) {
      setTooltipState({ isVisible: false, position: { top: 0, left: 0 } });
      if (hideTooltipFunc) hideTooltipFunc();
    }
  };

  const arrowClass = {
    "left-top": "left-[-13px] top-[2%] rotate-[90deg]",
    "left-center": "left-[-13px] top-[50%] translate-y-[-50%] rotate-[90deg]",
    "left-bottom": "left-[-13px] bottom-[2%] rotate-[90deg]",
    "bottom-left": "bottom-[-13px] left-[2%] rotate-[0deg]",
    "bottom-center":
      "bottom-[-13px] left-[50%] translate-x-[-50%] rotate-[0deg]",
    "bottom-right": "bottom-[-13px] right-[2%] rotate-[0deg]",
  };

  return (
    <>
      {React.cloneElement(
        <div className="w-full h-full cursor-pointer flex_justify_center">
          {children}
        </div>,
        {
          ...(tooltipType === "click"
            ? {
                onClick: toggleTooltip,
              }
            : { onMouseEnter: toggleTooltip, onMouseLeave: hideTooltip }),
        }
      )}
      {tooltipState.isVisible &&
        !disabled &&
        ReactDOM.createPortal(
          <>
            {tooltipType === "click" && (
              <div
                className="fixed top-0 left-0 right-0 w-screen h-screen cursor-pointer bg-glassmorphism"
                onClick={hideTooltip}
              />
            )}
            <div
              className="tooltip absolute z-[2000] shadow-box"
              style={{
                top: tooltipState.position.top,
                left: tooltipState.position.left,
                right: tooltipState.position.right,
              }}
            >
              <Icon
                name="TiArrowSortedDown"
                className={classNames(
                  "absolute",
                  arrowClass[arrowPos],
                  arrowClassName
                )}
              />
              {TooltipComp ? (
                <TooltipComp hideTooltip={hideTooltip} />
              ) : (
                <div className="p-2 text-sm capitalize rounded bg-primary">
                  {startCase(id)}
                </div>
              )}
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default AppTooltip;
