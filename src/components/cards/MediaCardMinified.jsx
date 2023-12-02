import { useNavigate } from "react-router-dom";

import { usePlayerStore } from "@/lib/store";
import { useFetchTracks } from "@/lib/actions";
import {
  classNames,
  formatDateString,
  formatNumWithCommas,
  getFormatData,
  truncate,
  pluralize,
} from "@/lib/utils";
import { usePlayer } from "@/hooks";

import { Icon, IconButton } from "@/components";

const imageDimsOpt = {
  16: "h-16 w-16",
  20: "h-20 w-20",
  28: "h-28 w-28",
};

export default function MediaCardMinified({
  item,
  type,
  imageDims = 16,
  isMyPlaylist,
}) {
  const navigate = useNavigate();
  const { playlistId, playlistType } = usePlayerStore();

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const { fetchTracks, isSubmitting } = useFetchTracks();

  const isCurrentPlaylist =
    playlistId === item.id && item.type.includes(playlistType);

  return (
    <li
      className="col-span-1"
      onClick={() => {
        navigate(`/${type}/${item?.id}`);
      }}
    >
      <div className="relative px-3 py-3 transition-all duration-300 cursor-pointer group bg-card border-divider hover:rounded hover:bg-card-hover">
        <div className="flex items-center gap-3">
          <div className={classNames("relative", imageDimsOpt[imageDims])}>
            <div
              className={classNames(
                "absolute w-full h-full group-hover:bg-main group-hover:opacity-70",
                isCurrentPlaylist ? "bg-main opacity-50" : "bg-transparent",
                type === "artist" ? "rounded-full" : " rounded"
              )}
            />
            {item.image ? (
              <img
                src={item.image}
                className={classNames(
                  "object-cover shadow_card aspect-square h-full w-full",
                  type === "artist" ? "rounded-full" : " rounded"
                )}
                alt="image"
              />
            ) : (
              <div
                className={classNames(
                  "object-cover shadow-lg aspect-square h-full w-full flex_justify_center bg-secondary",
                  type === "artist" ? "rounded-full" : "rounded"
                )}
              >
                <Icon
                  name="BsMusicNoteBeamed"
                  size={40}
                  className="!text-secondary"
                />
              </div>
            )}
            {(!isMyPlaylist || (playlistId === item.id && isMyPlaylist)) && (
              <div
                className={classNames(
                  "play_button absolute top-0 w-full h-full items-center justify-center",
                  isCurrentPlaylist ? "flex" : "hidden group-hover:flex"
                )}
              >
                <IconButton
                  name={
                    isCurrentPlaylist
                      ? isPlaying
                        ? isSubmitting
                          ? "HiOutlineDotsHorizontal"
                          : "BsFillPauseFill"
                        : "BsFillPlayFill"
                      : "BsFillPlayFill"
                  }
                  className="rounded-full h-9 w-9 bg-primary"
                  iconClassName="!text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrentPlaylist) {
                      handlePlayPause();
                    } else {
                      const callback = (tracks) => {
                        handleGetPlaylist({
                          tracklist: getFormatData(tracks, item?.image),
                          playlistId: item?.id,
                          playlistType: item?.type,
                          savePlay: !isMyPlaylist,
                          imageAlt: item?.image,
                        });
                      };
                      fetchTracks({ id: item?.id, type: item?.type, callback });
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex items-start justify-between flex-1 w-full">
            <div className="flex flex-col">
              <h6 className="text-sm text-onNeutralBg">
                {truncate(item?.name, 18)}
              </h6>
              {item?.desc && (
                <p className="text-sm font-normal text-secondary">
                  {truncate(item?.desc || "", type === "podcast" ? 40 : 20)}
                </p>
              )}
              {(item?.tracksNo ||
                item?.releaseDate ||
                item?.fansNo ||
                item?.albumsNo) && (
                <>
                  {["podcast", "artist"].includes(type) ? (
                    <p className="mt-1 text-xs font-normal text-secondary">
                      {item?.fansNo && (
                        <span>{formatNumWithCommas(item?.fansNo)} fans</span>
                      )}
                      {item?.albumsNo && (
                        <span>
                          &nbsp;&nbsp;{item?.albumsNo}{" "}
                          {pluralize("album", item?.albumsNo)}
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs font-normal text-secondary">
                      {`${item?.tracksNo}` && (
                        <span>
                          {`${item?.tracksNo || 0}`}{" "}
                          {pluralize("track", item?.tracksNo)}
                        </span>
                      )}
                      {item?.releaseDate && (
                        <span>
                          &nbsp;&nbsp;{formatDateString(item?.releaseDate)}
                        </span>
                      )}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* <div className="flex-col hidden action_buttons group-hover:flex">
              <IconButton
                name="MdOutlineFavoriteBorder"
                className="w-8 h-8 rounded hover:bg-divider"
                iconClassName="text-secondary"
              />
              <IconButton
                name="HiOutlineDotsHorizontal"
                className="w-8 h-8 rounded hover:bg-divider"
                iconClassName="text-secondary"
              />
            </div> */}
          </div>
        </div>
      </div>
    </li>
  );
}
