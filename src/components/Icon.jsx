import { IconContext } from "react-icons";

import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloudUpload,
  AiOutlineFontSize,
} from "react-icons/ai";
import {
  BiCheckCircle,
  BiChevronsRight,
  BiFont,
  BiPlayCircle,
  BiSearch,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
  BiTimeFive,
  BiUser,
  BiUserVoice,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
} from "react-icons/bi";
import {
  BsCheckLg,
  BsFillPauseCircleFill,
  BsFillPauseFill,
  BsFillPlayCircleFill,
  BsFillPlayFill,
  BsHeadphones,
  BsMusicNoteBeamed,
  BsPalette,
} from "react-icons/bs";
import { CgRepeat } from "react-icons/cg";
import {
  FaApple,
  FaGithub,
  FaMusic,
  FaPlay,
  FaRegUser,
  FaSearchengin,
  FaSpinner,
  FaUserCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GiLoveSong, GiMusicSpell } from "react-icons/gi";
import { GoPlay } from "react-icons/go";
import {
  HiDotsVertical,
  HiMenuAlt1,
  HiMenuAlt2,
  HiOutlineDotsHorizontal,
  HiOutlineCamera,
  HiOutlineHome,
} from "react-icons/hi";
import { HiMiniPlay, HiOutlinePlay, HiOutlineQueueList } from "react-icons/hi2";
import {
  IoMdAddCircle,
  IoMdClose,
  IoMdCloseCircle,
  IoMdMicrophone,
  IoMdNotifications,
  IoMdNotificationsOutline,
} from "react-icons/io";
import {
  IoLogoGooglePlaystore,
  IoPersonCircle,
  IoShuffleOutline,
} from "react-icons/io5";
import {
  MdAdd,
  MdArrowRight,
  MdCancel,
  MdDarkMode,
  MdFavorite,
  MdHome,
  MdKeyboardArrowUp,
  MdLogin,
  MdLogout,
  MdOutlineCancel,
  MdOutlineDashboard,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineLightMode,
  MdOutlineMarkEmailUnread,
  MdOutlineRepeatOne,
  MdOutlineSettings,
  MdRepeat,
  MdRepeatOne,
  MdSkipNext,
  MdSkipPrevious,
  MdSpaceDashboard,
} from "react-icons/md";
import {
  PiMusicNoteDuotone,
  PiMusicNoteFill,
  PiPlaylistBold,
  PiSquareSplitHorizontalFill,
  PiWarningCircleBold,
} from "react-icons/pi";
import {
  RiDeleteBin5Line,
  RiListIndefinite,
  RiPlayList2Line,
  RiSettings4Fill,
} from "react-icons/ri";
import { TbArrowsShuffle2, TbColorSwatch, TbPlaylistAdd } from "react-icons/tb";
import { LuSplitSquareHorizontal } from "react-icons/lu";
import { TiTimes, TiArrowSortedDown } from "react-icons/ti";

import { classNames } from "@/lib/utils";

const icons = {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCloudUpload,
  AiOutlineFontSize,
  BiCheckCircle,
  BiChevronsRight,
  BiFont,
  BiPlayCircle,
  BiSearch,
  BiSkipNext,
  BiSkipPrevious,
  BiSolidVolumeFull,
  BiTimeFive,
  BiUser,
  BiUserVoice,
  BiVolumeFull,
  BiVolumeLow,
  BiVolumeMute,
  BsFillPauseCircleFill,
  BsFillPauseFill,
  BsFillPlayCircleFill,
  BsFillPlayFill,
  BsHeadphones,
  BsCheckLg,
  BsMusicNoteBeamed,
  BsPalette,
  CgRepeat,
  FaApple,
  FaGithub,
  FaMusic,
  FaPlay,
  FaRegUser,
  FaSearchengin,
  FaSpinner,
  FaUserCircle,
  FcGoogle,
  GiLoveSong,
  GiMusicSpell,
  GoPlay,
  HiDotsVertical,
  HiMenuAlt1,
  HiMenuAlt2,
  HiMiniPlay,
  HiOutlineCamera,
  HiOutlineDotsHorizontal,
  HiOutlineHome,
  HiOutlinePlay,
  HiOutlineQueueList,
  IoLogoGooglePlaystore,
  IoMdAddCircle,
  IoMdClose,
  IoMdCloseCircle,
  IoMdMicrophone,
  IoMdNotifications,
  IoMdNotificationsOutline,
  IoPersonCircle,
  IoShuffleOutline,
  LuSplitSquareHorizontal,
  MdAdd,
  MdArrowRight,
  MdCancel,
  MdDarkMode,
  MdFavorite,
  MdHome,
  MdKeyboardArrowUp,
  MdLogin,
  MdLogout,
  MdOutlineCancel,
  MdOutlineDashboard,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineLightMode,
  MdOutlineMarkEmailUnread,
  MdOutlineRepeatOne,
  MdOutlineSettings,
  MdRepeat,
  MdRepeatOne,
  MdSkipNext,
  MdSkipPrevious,
  MdSpaceDashboard,
  PiMusicNoteDuotone,
  PiMusicNoteFill,
  PiPlaylistBold,
  PiSquareSplitHorizontalFill,
  PiWarningCircleBold,
  RiDeleteBin5Line,
  RiListIndefinite,
  RiPlayList2Line,
  RiSettings4Fill,
  TbArrowsShuffle2,
  TbColorSwatch,
  TbPlaylistAdd,
  TiArrowSortedDown,
  TiTimes,
};

const SimpleIcon = ({
  name = "MdHome",
  size = 20,
  className = "",
  ...props
}) => {
  const IconT = icons?.[name] || icons?.["MdHome"];

  return (
    <IconContext.Provider
      value={{
        className: classNames("text-onNeutralBg", className),
        ...props,
      }}
    >
      <IconT size={size} />
    </IconContext.Provider>
  );
};

export default SimpleIcon;
