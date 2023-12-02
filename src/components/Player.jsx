import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useGlobalAudioPlayer } from "react-use-audio-player";

import { truncate, classNames, formatIndexToDouble } from "@/lib/utils";
import { usePlayer, useTheme } from "@/hooks";

import { IconButton, Icon } from "@/components";

const PlayerVolume = ({ muted, volume, handleVolumeMute, handleSetVolume }) => {
  return (
    <div className="relative flex group">
      <IconButton
        name={
          !muted
            ? volume > 0.5
              ? "BiVolumeFull"
              : "BiVolumeLow"
            : "BiVolumeMute"
        }
        onClick={handleVolumeMute}
      />

      <div className="absolute bottom-8 bg-card p-4 hidden group-hover:block rounded right-[50%] translate-x-[50%] shadow-dialog">
        <Slider.Root
          className="relative flex_justify_center bg-onNeutralBg select-none touch-none w-[5px] h-[100px] rounded-full"
          max={100}
          step={1}
          orientation="vertical"
          value={[muted ? 0 : volume * 100]}
          onValueChange={handleSetVolume}
        >
          <Slider.Track className="relative h-full rounded-full bg-player grow">
            <Slider.Range className="absolute w-full rounded-full bg-onNeutralBg" />
          </Slider.Track>

          <Slider.Thumb
            className="relative right-0 block w-5 h-3 rounded cursor-pointer bg-onNeutralBg shadow-dialog hover:bg-player focus:outline-none"
            aria-label="Volume"
          />
        </Slider.Root>
      </div>
    </div>
  );
};

const PlayerProgressBar = ({
  audioBarContainerRef,
  handleSeek,
  progressBarWidth,
}) => {
  return (
    <div
      className="w-full h-1 rounded-full cursor-pointer bg-player"
      ref={audioBarContainerRef}
      onClick={handleSeek}
    >
      <div
        style={{ width: `${progressBarWidth}%` }}
        className="h-1 rounded-full bg-primary"
      />
    </div>
  );
};

const PlayerButtons = ({ audioIconList }) => {
  return (
    <div className="flex items-center gap-4">
      {audioIconList.map((item) => (
        <button key={item.icon} onClick={item.handleClick}>
          <Icon
            name={item.icon}
            size={item.iconSize}
            className={classNames(item.className, "text-player") || ""}
          />
        </button>
      ))}
    </div>
  );
};

const QueueButton = ({ setOpenQueue, openQueue }) => {
  return (
    <IconButton
      name="HiOutlineQueueList"
      onClick={() => setOpenQueue(!openQueue)}
    />
  );
};

export default function TrackPlayer() {
  const {
    usePlayerInit,
    currentTrack,
    tracklist,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleSetVolume,
    handleVolumeMute,
    handleSeek,
    handleLoop,
    handleShuffle,
    volume,
    progressBarWidth,
    getTimer,
    audioBarContainerRef,
    isLooping,
    isShuffle,
  } = usePlayer();

  const [miniPlayer, setMiniPlayer] = useState(false);
  const [openQueue, setOpenQueue] = useState(false);
  const { playing, duration, muted } = useGlobalAudioPlayer();

  const [theme] = useTheme();

  const { player, isMobile } = theme || {};

  usePlayerInit();

  useEffect(() => {
    if (isMobile) {
      setMiniPlayer(true);
    } else {
      setMiniPlayer(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (miniPlayer) {
      setOpenQueue(false);
    }
  }, [miniPlayer]);

  const { name, artistName, image } = currentTrack || {};

  const audioIconList = [
    {
      icon: "TbArrowsShuffle2",
      handleClick: handleShuffle,
      iconSize: 18,
      className: isShuffle ? "" : "opacity-50",
    },
    {
      icon: "BiSkipPrevious",
      handleClick: handlePrev,
      iconSize: 28,
      className: "opacity-80 hover:opacity-100",
    },
    {
      icon: !playing ? "BsFillPlayCircleFill" : "BsFillPauseCircleFill",
      iconSize: 32,
      handleClick: handlePlayPause,
      className: "hover:scale-[1.05]",
    },
    {
      icon: "BiSkipNext",
      handleClick: handleNext,
      iconSize: 28,
      className: "opacity-80 hover:opacity-100",
    },
    {
      icon: "CgRepeat",
      handleClick: handleLoop,
      iconSize: 25,
      className: isLooping ? "" : "opacity-50",
    },
  ];

  const playPauseBtn = audioIconList[2];

  const isPlayerBoxed = player === "boxed" || isMobile;

  const getQueueTracks = tracklist.slice(
    currentTrack?.index + 1,
    currentTrack?.index + 4
  );

  if (duration === Infinity) return null;

  return (
    <>
      {currentTrack && (
        <div
          className={classNames(
            "fixed bottom-0 flex flex-col justify-between z-30 duration-500 transition-max-height bg-sidebar",
            isPlayerBoxed
              ? "p-2 w-[250px] xs:w-[280px] shadow-box right-0 xl:right-aside rounded max-h-[100%] border-0 border-divider gap-8"
              : "player_width h-player min-h-player left-0"
          )}
        >
          <div
            className={classNames(
              "absolute right-0 duration-500 rounded-tl rounded-tr shadow-box w-[250px] xs:w-[280px]",
              openQueue
                ? isPlayerBoxed
                  ? "bottom-0 bg-card-skeleton z-50"
                  : "bottom-player bg-sidebar"
                : "-bottom-[500px]"
            )}
          >
            <p className="p-4 font-semibold border-b border-divider">
              Queue List
            </p>
            <ul className="list-none divide-y divide-divider">
              {getQueueTracks ? (
                getQueueTracks?.map((item, index) => (
                  <li
                    key={item?.id}
                    className="flex items-center gap-4 p-4 text-sm"
                  >
                    <span>{formatIndexToDouble(index + 1)}</span>
                    <span>{item?.name}</span>
                    <span className="text-secondary">{item?.artistName}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-4 p-4 text-sm">
                  <span className="text-secondary">End of queue</span>
                </li>
              )}
            </ul>
          </div>

          <div
            className={classNames("bg-sidebar h-full", !isMobile && "relative")}
          >
            {isPlayerBoxed ? (
              <div
                className={classNames(
                  "border rounded bg-card-skeleton border-divider",
                  miniPlayer ? "p-0" : "p-4"
                )}
              >
                <div
                  className={classNames(
                    "absolute border-0 right-2 top-2 z-50",
                    !miniPlayer && "rotate-180"
                  )}
                >
                  <IconButton
                    name="MdKeyboardArrowUp"
                    onClick={() => {
                      setMiniPlayer(!miniPlayer);
                      setOpenQueue(false);
                    }}
                  />
                </div>

                {!miniPlayer && (
                  <div className="absolute z-50 border-0 left-4 top-2">
                    <QueueButton {...{ openQueue, setOpenQueue }} />
                  </div>
                )}
                <div
                  className={classNames(
                    "flex flex-col items-center justify-center text-onNeutralBg relative",
                    miniPlayer ? "mb-2" : "mb-8"
                  )}
                >
                  {!miniPlayer && (
                    <img
                      src={image}
                      className="object-cover w-32 h-32 rounded aspect-square shadow-dialog"
                      alt="player-image"
                    />
                  )}
                  <div className="flex-col mt-2 text-sm flex_justify_center">
                    <span>{truncate(name, 20)}</span>
                    <span className="text-secondary">
                      {truncate(artistName, 20)}
                    </span>
                  </div>
                </div>

                {!miniPlayer ? (
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="absolute -top-12 -left-4">
                      <PlayerVolume
                        {...{
                          muted,
                          volume,
                          handleVolumeMute,
                          handleSetVolume,
                        }}
                      />
                    </div>

                    <PlayerProgressBar
                      {...{
                        audioBarContainerRef,
                        handleSeek,
                        progressBarWidth,
                      }}
                    />

                    <div className="text-sm text-secondary">{getTimer}</div>

                    <PlayerButtons
                      audioIconList={audioIconList}
                      miniPlayer={miniPlayer}
                    />
                  </div>
                ) : (
                  <div className="pb-2 flex_justify_center">
                    <button
                      key={playPauseBtn.icon}
                      onClick={playPauseBtn.handleClick}
                    >
                      <Icon
                        name={playPauseBtn.icon}
                        size={playPauseBtn.iconSize}
                        className={playPauseBtn.className || ""}
                      />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <PlayerProgressBar
                  {...{
                    audioBarContainerRef,
                    handleSeek,
                    progressBarWidth,
                  }}
                />

                <div className="h-full gap-4 px-4 py-2 flex_justify_between">
                  <div className="w-[30%] flex items-center justify-start text-onNeutralBg">
                    <img
                      src={image}
                      className="object-cover w-12 h-12 rounded aspect-square"
                      width="50"
                      height="50"
                      alt=""
                    />
                    <div className="flex flex-col ml-2 text-sm">
                      <span>{truncate(name, 15)}</span>
                      <span className="text-secondary">
                        {truncate(artistName, 15)}
                      </span>
                    </div>
                  </div>

                  <PlayerButtons audioIconList={audioIconList} />

                  <div className="relative w-[30%] flex_justify_end gap-2">
                    <div className="text-sm text-secondary">{getTimer}</div>
                    <div className="flex flex-row gap-2">
                      <PlayerVolume
                        {...{
                          muted,
                          volume,
                          handleVolumeMute,
                          handleSetVolume,
                        }}
                      />

                      <QueueButton {...{ openQueue, setOpenQueue }} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
