/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { isEmpty } from "lodash";

import { useLogout } from "@/lib/actions";
import { classNames, getTimeOfDay } from "@/lib/utils";
import { useAppUtil, useCurrentUser } from "@/lib/store";
import { useTheme } from "@/hooks";

import { Button, Icon, DropdownMenu, Overlay } from "@/components";
import { defaultThemeConfig } from "@/configs";
import { logo } from "@/constants";

const Searchbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [input, setInput] = useState("");
  const ref = useRef();

  const { getSearchRef } = useAppUtil();

  const { getToggleSearch, toggleSearch } = useAppUtil();
  const [theme] = useTheme();

  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("q");
    if (query) {
      setInput(query);
    }
    if (!pathname.includes("/search")) {
      setInput("");
    }
  }, [pathname]);

  useEffect(() => {
    getSearchRef(ref);
  }, [ref]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isEmpty(input.trim()) && input.trim().length >= 3) {
        const path = location.pathname;

        if (path === "/search") {
          navigate("?q=" + input);
        } else {
          navigate("search?q=" + input);
        }
      }
    }
  };

  return (
    <>
      <div
        className={classNames(
          "w-full h-full",
          theme?.isMobile
            ? classNames(
                "absolute p-3 duration-300 transition-all left-0",
                toggleSearch ? "top-0 bg-card" : "-top-navbar"
              )
            : "flex items-center"
        )}
      >
        <div
          className={classNames(
            "flex_justify_between h-full w-full",
            theme?.isMobile &&
              "border border-divider hover:border-onNeutralBg rounded bg-main px-3 duration-500"
          )}
        >
          {theme?.isMobile && <Icon name="BiSearch" />}
          <input
            placeholder="Search songs, albums ..."
            className="flex-1 w-full h-12 px-4 text-sm bg-transparent rounded outline-0 text-onNeutralBg border-onNeutralBg focus:bg-card"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
            ref={ref}
          />
          {theme?.isMobile && (
            <button
              className="w-8 h-8 transition-colors duration-500 rounded flex_justify_center bg-sidebar hover:bg-red-500"
              onClick={() => getToggleSearch(false)}
            >
              <Icon name="MdCancel" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center h-full lg:hidden">
        <button
          className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
          onClick={() => getToggleSearch(true)}
        >
          <Icon name="BiSearch" className="group-hover:!text-white" />
        </button>
      </div>
    </>
  );
};

const SignUpButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-0 px-4">
      <Button
        label="Sign Up"
        onClick={() => navigate("/register")}
        className="!text-onNeutralBg !border-onNeutralBg"
      />
      <Button
        variant="contained"
        label="Log In"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

const notificationList = [
  {
    id: "1",
    content:
      "Mark Smith reacted to your recent added playlist - My first playlist",
    time: "1 minute ago",
  },
  {
    id: "2",
    content: "Sarah Johnson created a new playlist - Downtown Music",
    time: "1 day ago",
  },
  {
    id: "3",
    content: "Bob Manuel sent you a private message",
    time: "1 week ago",
  },
];

const NotificationButton = () => {
  return (
    <div className="flex items-center h-full">
      <DropdownMenu
        DropdownTrigger={() => (
          <div className="relative group">
            <div className="absolute flex items-center justify-center w-4 h-4 rounded-full top-2 right-2 bg-primary animate-bounce group-hover:bg-white">
              <span className="text-xs text-white group-hover:text-primary">
                {notificationList?.length}
              </span>
            </div>
            <div className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity group-hover:bg-primary">
              <Icon
                name="IoMdNotificationsOutline"
                className="group-hover:!text-white"
              />
            </div>
          </div>
        )}
        DropdownContent={() => (
          <div className="p-2 space-y-2">
            <div className="flex items-center gap-3 p-3 rounded bg-main">
              <p className="text-base">All notifications</p>
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary group-hover:bg-white">
                <span className="text-xs text-white group-hover:text-primary">
                  {3}
                </span>
              </div>
            </div>
            <ul className="list-none divide-y divide-divider">
              {notificationList.map((item) => (
                <li
                  className="p-3 rounded cursor-pointer hover:bg-main"
                  key={item.id}
                >
                  <Link className="flex gap-3" to="/notifications">
                    <Icon name="IoMdNotificationsOutline" />
                    <div className="flex flex-col flex-1 gap-1">
                      <p className="text-sm">{item.content}</p>
                      <span className="text-xs text-secondary">
                        {item.time}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="w-full border-t border-divider" />

            <Link
              className="inline-block w-full p-3 text-sm text-center hover:text-primary"
              to={"/notifications"}
            >
              See all notifications
            </Link>
          </div>
        )}
        contentClassName="w-[300px]"
      />
    </div>
  );
};

const UserMenu = () => {
  const { currentUser } = useCurrentUser();

  const { user } = currentUser || {};
  const { email, username, imageUrl } = user || {};
  const { logout: signOut } = useLogout();

  const navigate = useNavigate();
  return (
    <div className="flex items-center h-full">
      <DropdownMenu
        DropdownTrigger={() => (
          <div
            className={classNames(
              "rounded-full flex_justify_center transition-colors duration-500 gap-2 hover:bg-primary bg-primary-opacity p-2 h-full group"
            )}
          >
            <div className="rounded-full w-9 h-9 flex_justify_center bg-main">
              {imageUrl ? (
                <img src={imageUrl} className="w-full h-full rounded-full" />
              ) : (
                <Icon name="FaRegUser" size={16} />
              )}
            </div>
            <span className="pr-2">
              <Icon
                name="MdOutlineSettings"
                className="group-hover:!text-white"
              />
            </span>
          </div>
        )}
        DropdownContent={() => (
          <div className="p-2 space-y-3">
            {email && (
              <div className="p-3 text-sm rounded bg-main">
                <h5 className="text-lg font-semibold">
                  {getTimeOfDay()},{" "}
                  <span className="font-normal capitalize">{username}</span>
                </h5>
                {/* <p className="text-base">@{username}</p> */}
                <span className="text-secondary">{email}</span>
              </div>
            )}
            <hr className="w-full border-t border-divider" />

            <div className="relative flex flex-col gap-3 p-4 overflow-hidden rounded bg-main">
              <h5 className="text-lg font-semibold">Upgrade your plan</h5>
              <p>70% discount for 1 years subscriptions.</p>
              <Button
                label="Go Premium"
                variant="contained"
                className="w-fit"
              />
              <div className="absolute w-[200px] h-[200px] border-[19px] rounded-full border-primary top-[65px] right-[-150px]" />
              <div className="absolute w-[200px] h-[200px] border-[3px] rounded-full border-primary top-[135px] right-[-70px]" />
            </div>
            <hr className="w-full border-t border-divider" />

            <ul className="list-none divide divide-divider">
              {[
                {
                  id: "profile",
                  name: "Profile",
                  icon: "BiUser",
                  onClick: () => navigate("profile"),
                },
                {
                  id: "notifications",
                  name: "Notifications",
                  icon: "IoMdNotificationsOutline",
                  onClick: () => navigate("notifications"),
                },
                {
                  id: "logout",
                  name: "Logout",
                  icon: "MdLogout",
                  onClick: signOut,
                },
              ].map((item) => (
                <li
                  className="rounded cursor-pointer hover:text-primary hover:font-semibold group"
                  key={item.id}
                >
                  <button
                    className="w-full p-4 text-left"
                    onClick={item.onClick}
                  >
                    <div className="flex gap-3">
                      <Icon
                        name={item.icon}
                        className="group-hover:text-primary"
                      />

                      <p className="text-sm whitespace-nowrap">{item.name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        contentClassName="min-w-[300px]"
      />
    </div>
  );
};

const MobileToggleButton = () => {
  const { getToggleMenu, toggleMenu } = useAppUtil();

  return (
    <div className="flex items-center h-full lg:hidden">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => getToggleMenu(!toggleMenu)}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};

const DesktopToggleButton = () => {
  const [theme, setTheme] = useTheme();

  const changeTheme = (value) => {
    setTheme({ ...theme, ...value });
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div className="items-center hidden h-full lg:flex">
      <button
        className="w-12 h-12 transition-colors duration-500 rounded flex_justify_center bg-primary-opacity hover:bg-primary group"
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon name="HiMenuAlt2" className="group-hover:!text-white" />
      </button>
    </div>
  );
};

const Logo = ({ isFolded, isHorizontal }) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const showFull = Boolean(isFolded && !isHorizontal && isMobile);

  return (
    <div
      className={classNames(
        "relative p-3 z-20 h-navbar duration-500",
        !isHorizontal && "w-sidebar",
        showFull ? "bg-primary" : "lg:bg-sidebar"
      )}
    >
      <Link to="/" className="flex items-center h-full gap-2 logo w-fit">
        <div
          className={
            showFull
              ? "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              : ""
          }
        >
          <Icon
            name={logo.icon}
            size={25}
            className={showFull ? "!text-white" : "!text-primary"}
          />
        </div>

        <h1
          className={classNames(
            "text-[20px] text-primary font-bold duration-1000 transition-opacity",
            showFull ? "invisible w-0 opacity-0" : "opacity-100"
          )}
        >
          {logo.name}
        </h1>
      </Link>
    </div>
  );
};

export default function Navbar() {
  const { getToggleSearch, toggleSearch } = useAppUtil();
  const [theme] = useTheme();

  const { currentUser } = useCurrentUser();

  const { orientation, sidebar, isMobile } = theme || defaultThemeConfig;
  const isHorizontal = orientation === "horizontal" && !isMobile;
  const isFolded = sidebar === "folded";

  const { isLoaded, user } = currentUser || {};

  return (
    <nav className="fixed z-[1200] h-navbar top-0 bg-neutralBgOpacity backdrop-blur-[50px] sidebar_horizontal_width">
      <Overlay isOpen={toggleSearch} handleIsOpen={getToggleSearch} />
      <div className="absolute w-full h-full transition-all duration-300" />

      <div
        className={classNames(
          "relative flex h-full items-center justify-between",
          isHorizontal && "bg-sidebar"
        )}
      >
        <Logo isFolded={isFolded} isHorizontal={isHorizontal} />
        <div className="flex items-center gap-4 px-3 lg:flex-1">
          <div className="z-20 flex items-center flex-1 h-full gap-4">
            {!isHorizontal && <DesktopToggleButton />}
            <Searchbar />
            <MobileToggleButton />
          </div>
          {isLoaded && !isMobile ? (
            <div className="flex items-center h-full gap-4 nav-icons">
              {user ? (
                <>
                  <NotificationButton />
                  <UserMenu />
                </>
              ) : (
                <SignUpButtons />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
