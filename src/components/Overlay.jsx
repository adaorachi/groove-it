import { useEffect } from "react";

import { classNames } from "@/lib/utils";

export default function Overlay({
  isOpen,
  handleIsOpen,
  transparent,
  className,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={classNames(
            "fixed top-0 left-0 h-screen w-screen",
            transparent ? "bg-transparent" : "bg-glassmorphism",
            className
          )}
          onClick={() => handleIsOpen(false)}
        />
      )}
    </>
  );
}
