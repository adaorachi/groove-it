import { startCase } from "lodash";
import { useMediaQuery } from "react-responsive";

import { useTheme } from "@/hooks";
import { themeConfig, defaultThemeConfig } from "@/configs";

const StylesProvider = () => {
  const [themeStorage] = useTheme();

  const {
    mode,
    color,
    sidebar,
    layout,
    orientation,
    fontFamily,
    isMobile,
    borderRadius,
  } = themeStorage || defaultThemeConfig;
  const isHorizontal = orientation === "horizontal";

  const { colors, themes, sidebars } = themeConfig || {};

  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isExtraLargeScreen = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const theme = mode === "light" ? "theme_light" : `theme_dark_${color}`;

  const themeObj = themes?.[theme];
  const colorObj = colors?.[color];
  const sT = sidebars?.[sidebar];

  const aside = 320;
  const asideMobile = isExtraLargeScreen ? aside : 0;
  const navHeight = 80;
  const playerHeight = 70;

  const sidebarWidth = isLargeScreen ? (isHorizontal ? 0 : sT) : 0;

  const {
    neutralBg,
    neutralBgOpacity,
    neutralBgAlt,
    onNeutralBg,
    onNeutralBgSecondary,
    player,
    onNeutralBgDivider,
    switchBg,
    cardBg,
    cardSkeletonBg,
    cardBgHover,
  } = themeObj || {};

  const { primary, primaryOpacity, primaryLightGray } = colorObj || {};

  const styles = `
    :root {
      --primary: ${primary};
      --primary-light-gray: ${primaryLightGray};
      --primary-opacity: ${primaryOpacity};
      --neutralBg: ${neutralBg};
      --neutralBgOpacity: ${neutralBgOpacity};
      --neutralBgAlt: ${neutralBgAlt};
      --onNeutralBg: ${onNeutralBg};
      --onNeutralBgSecondary: ${onNeutralBgSecondary};
      --playerBg: ${player};
      --onNeutralBgDivider: ${onNeutralBgDivider};
      --switchBg: ${switchBg};
      --cardBg: ${cardBg};
      --cardSkeletonBg: ${cardSkeletonBg};
      --cardBgHover: ${cardBgHover};
      --sidebar-width: ${isMobile ? sidebars["full"] : sT}px;
      --aside-width: ${aside}px;
      --sidebar-horizontal-width: ${sidebarWidth}px;
      --nav-height: ${navHeight}px;
      --nav-width: calc(100vw - ${asideMobile}px);
      --player-height: ${playerHeight}px;
      --logo-width: ${120}px;

      --main-width: calc(100% - ${sidebarWidth}px - ${asideMobile}px);
      --main-margin-top: ${
        isHorizontal && !isMobile ? `${navHeight * 2}px` : `${navHeight}px`
      };
      --direction: ${layout};
      --font-family: ${startCase(fontFamily)};
      --border-radius: ${borderRadius}px;
    }
  `;

  return <style>{styles}</style>;
};

export default StylesProvider;
