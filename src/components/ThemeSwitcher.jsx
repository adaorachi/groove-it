import { useState } from "react";
import { capitalize, startCase } from "lodash";
import Slider from "rc-slider";

import { classNames } from "@/lib/utils";
import { useAppUtil } from "@/lib/store";
import { useTheme } from "@/hooks";

import { themeConfig, defaultThemeConfig } from "@/configs";

import { Icon, Button, Tab, Overlay } from ".";

import "rc-slider/assets/index.css";

const themeIcon = {
  light: "MdOutlineLightMode",
  dark: "MdDarkMode",
};

const Swatch = ({ theme, setTheme }) => {
  const { modes, colors, themes, sidebars, orientations, players } =
    themeConfig || {};

  const { color, mode } = theme;

  const changeTheme = (value) => {
    setTheme({ ...defaultThemeConfig, ...theme, ...value });
  };

  return (
    <div className="switch_content bg-switch">
      <div className="switch_mode">
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h4 className="text-sm uppercase">Theme Mode</h4>
          <div className="flex flex-row gap-4">
            {modes.map((mode) => {
              const isActive = theme?.mode === mode;
              return (
                <button
                  key={mode}
                  className={classNames(
                    "border-2 rounded h-12 w-12 flex_justify_center",
                    isActive ? "border-primary" : "border-secondary"
                  )}
                  onClick={() =>
                    changeTheme({
                      mode,
                      theme:
                        mode === "light"
                          ? "theme_light"
                          : `theme_dark_${color}`,
                    })
                  }
                >
                  <Icon
                    name={themeIcon[mode]}
                    className={mode === "light" && "text-yellow-400"}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_color">
        <div className="p-4 space-y-4 border-b border-divider">
          <h4 className="text-sm uppercase">Preset Color</h4>
          <div className="flex flex-row flex-wrap gap-4">
            {Object.entries(colors).map((color) => {
              const isActive = theme?.color === color[0];
              const { primary } = color[1];

              const themeC =
                mode === "light" ? "theme_light" : `theme_dark_${color[0]}`;

              const main = themes?.[themeC]?.neutralBg;

              return (
                <button
                  key={color[0]}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${main} 50%, ${primary} 50%)`,
                  }}
                  className={classNames(
                    "relative rounded-full border-0 h-12 w-12 flex_justify_center",
                    isActive ? "border-primary" : "border-secondary"
                  )}
                  onClick={() =>
                    changeTheme({
                      color: color[0],
                      theme: themeC,
                    })
                  }
                >
                  {isActive && (
                    <Icon
                      name="BsPalette"
                      className={
                        mode === "light" ? "!text-zinc-900" : "!text-white"
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_sidebar">
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h4 className="text-sm uppercase">Sidebar drawer</h4>
          <div className="flex flex-row gap-4">
            {Object.entries(sidebars).map((sidebar) => {
              const w = Math.round(+sidebar[1] / 9);
              const isActive = theme?.sidebar === sidebar[0];
              const color = colors?.[theme?.color]?.primary;

              return (
                <button
                  key={sidebar[0]}
                  className={classNames(
                    "border-2 rounded-[2px] h-12 w-12 flex_justify_center p-1",
                    isActive ? "border-primary" : "border-secondary"
                  )}
                  onClick={() =>
                    changeTheme({
                      sidebar: sidebar[0],
                    })
                  }
                >
                  <div className="relative w-full h-full border border-dashed rounded-[2px] border-secondary">
                    <div
                      style={{
                        backgroundColor: color,
                        width: `${w}px`,
                      }}
                      className="absolute h-full rounded-[2px]"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_layout">
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h4 className="text-sm uppercase">Theme Layout</h4>
          <div className="flex flex-row gap-4">
            {orientations.map((orientation) => {
              const color = colors?.[theme?.color]?.primary;

              const isActive = theme?.orientation === orientation;
              return (
                <button
                  key={orientation}
                  className={classNames(
                    "border-2 rounded-[2px] h-12 w-12 flex_justify_center p-1",
                    isActive ? "border-primary" : "border-secondary"
                  )}
                  onClick={() =>
                    changeTheme({
                      orientation,
                    })
                  }
                >
                  <div
                    style={{}}
                    className="relative w-full h-full border border-dashed rounded-[2px] border-secondary"
                  >
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                      className={classNames(
                        "absolute rounded-[2px]",
                        orientation === "vertical"
                          ? "h-full w-1/3 "
                          : "w-full h-1/3 "
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_player">
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h4 className="text-sm uppercase">Player Layout</h4>
          <div className="flex flex-row gap-2">
            {players.map((player) => {
              const isActive = theme?.player === player;

              return (
                <button
                  key={player}
                  className={classNames(
                    "bg-primary-opacity rounded-full flex_justify_center py-2 px-4 border",
                    isActive ? "border-primary" : "border-primary-opacity"
                  )}
                  onClick={() =>
                    changeTheme({
                      player,
                    })
                  }
                >
                  <span className="text-sm">{capitalize(player)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Fonts = ({ theme, setTheme }) => {
  const { fontFamilies } = themeConfig || {};
  const { borderRadius } = theme || {};

  const changeTheme = (value) => {
    setTheme({ ...defaultThemeConfig, ...theme, ...value });
  };
  const min = 2;
  const max = 24;

  const handleRender = (node, props) => {
    const pos = 100 / (max - min);

    return (
      <div value={props.value}>
        {node}
        {props.dragging && (
          <div
            style={{ left: `${(props.value - min) * pos}%`, borderRadius: 2 }}
            className="absolute w-6 h-8 text-sm bg-primary shadow-box -top-10 flex_justify_center translate-x-[-50%]"
          >
            {props.value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="switch_content bg-switch">
      <div className="switch_font">
        <div className="p-4 space-y-4 border-b border-divider">
          <h4 className="text-sm uppercase">Font Style</h4>
          <div className="flex flex-col gap-4">
            {fontFamilies.map((font) => {
              const isActive = theme?.fontFamily === font;
              return (
                <button
                  key={font}
                  className={classNames(
                    "w-full border rounded text-left p-3 bg-main",
                    isActive ? "border-primary" : "border-divider "
                  )}
                  onClick={() =>
                    changeTheme({
                      fontFamily: font,
                    })
                  }
                >
                  {startCase(font)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="switch_border_radius">
        <div className="p-4 space-y-4 border-b border-divider">
          <h4 className="text-sm uppercase">Border Radius</h4>

          <div className="relative flex items-center gap-3 pt-6">
            <span className="text-sm">{min}px</span>
            <Slider
              min={min}
              max={max}
              defaultValue={borderRadius}
              onChange={(e) =>
                changeTheme({
                  borderRadius: e,
                })
              }
              handleRender={handleRender}
              handleStyle={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
              }}
              trackStyle={{ backgroundColor: "var(--primary)" }}
            />
            <span className="text-sm">{max}px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();

  const { openSwitch, getOpenSwitch: setOpenSwitch } = useAppUtil();
  const [currentTab, setCurrentTab] = useState("swatch");

  return (
    <section
      className={classNames(
        "theme_switch_section w-aside z-[1200]",
        openSwitch ? "right-0" : "-right-aside"
      )}
    >
      <button
        className="theme_switch_button bg-primary theme_switch_button_shadow -left-[45px] top-20"
        onClick={() => setOpenSwitch(!openSwitch)}
      >
        <Icon
          name={openSwitch ? "IoMdCloseCircle" : "MdOutlineSettings"}
          className={classNames(!openSwitch && "animate-spin", "!text-white")}
        />
      </button>

      <Overlay isOpen={openSwitch} handleIsOpen={setOpenSwitch} transparent />

      <div className="relative h-screen overflow-auto switch_body text-onNeutralBg bg-switch shadow-box">
        <div className="p-5 pb-4 switch_header flex_justify_between">
          <h5 className="">Theme Customization</h5>
          <div className="flex items-center gap-2">
            <Button
              label="Reset"
              variant="outlined"
              className="!border-red-500 !text-red-500"
              onClick={() => setTheme(defaultThemeConfig)}
            />
            <button
              className="w-8 h-8 rounded flex_justify_center bg-main"
              onClick={() => setOpenSwitch(false)}
            >
              <Icon name="TiTimes" />
            </button>
          </div>
        </div>
        <div className="border-t bg-main border-divider">
          <Tab
            tabs={[
              {
                id: "swatch",
                name: "",
                icon: "TbColorSwatch",
                display: true,
              },
              {
                id: "fonts",
                name: "",
                icon: "AiOutlineFontSize",
                display: true,
              },
            ]}
            isLoaded
            content={{
              swatch: <Swatch {...{ theme, setTheme }} />,
              fonts: <Fonts {...{ theme, setTheme }} />,
            }}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            fullWidth
          />
        </div>
      </div>
    </section>
  );
}
