import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useNavScrollTigger } from "@/lib/store";

const triggerPoint = 50;

export default function ScrollProvider({ children }) {
  const { pathname } = useLocation();
  const { getIsNavScrollTrigger } = useNavScrollTigger();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= triggerPoint) {
        getIsNavScrollTrigger(true);
      } else {
        getIsNavScrollTrigger(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getIsNavScrollTrigger]);

  return children;
}
