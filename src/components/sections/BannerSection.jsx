import { useMemo } from "react";

import { usePlayerStore } from "@/lib/store";
import {
  useSaveFavouritePlaylist,
  useListFavouritePlaylist,
  useRemoveFavouritePlaylist,
} from "@/lib/actions";
import { classNames, getFormatData } from "@/lib/utils";
import { usePlayer } from "@/hooks";

import {
  Title,
  IconButton,
  PatternBg,
  Genres,
  Contributors,
  MetaDetails,
  Skeletons,
} from "@/components";

export default function BannerSection(props) {
  const {
    details,
    hideActionButtons,
    tracks,
    type: typeAlt,
    showPattern,
    isLoading,
    isSuccess,
  } = props;

  const { playlistId, playlistType } = usePlayerStore();

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const isCurrentPlaylist = useMemo(
    () => playlistId === details?.id && playlistType === details?.type,
    [details, playlistId, playlistType]
  );

  const trackFormatted = useMemo(() => getFormatData(tracks), [tracks]);

  const {
    image,
    name,
    type,
    desc,
    genres,
    contributors,
    tracksNo,
    albumsNo,
    fansNo,
    duration,
    releaseDate,
  } = getFormatData([details])?.[0] || [];

  const handleGetPlaylistFunc = () => {
    handleGetPlaylist({
      tracklist: trackFormatted,
      playlistId: details?.id,
      playlistType: details?.type,
      savePlay: true,
    });
  };

  const { saveFavouritePlaylist } = useSaveFavouritePlaylist();
  const { removeFavouritePlaylist } = useRemoveFavouritePlaylist();
  const {
    data: listFavouritePlaylist,
    isSuccess: listFavouritePlaylistDataSuccess,
  } = useListFavouritePlaylist();

  const { favouriteplaylistList, favouriteplaylistId } =
    listFavouritePlaylist || {};

  const isFavourite = favouriteplaylistList?.includes(`${details?.id}`);

  return (
    <div className="relative banner_section">
      {typeAlt !== "search" && (
        <div className="absolute w-full h-full rounded bg-primary-opacity" />
      )}

      {isLoading && (
        <div className="animate_skeleton">
          <Skeletons.HeaderBannerSectionSkeleton type={typeAlt} />
        </div>
      )}

      {isSuccess && details && (
        <div
          className={classNames(typeAlt === "search" && "bg-card rounded p-6")}
        >
          {typeAlt === "search" && (
            <Title name={"Top Results"} type={"medium"} divider={false} />
          )}
          <div
            className={classNames(
              "relative flex flex-col xs:flex-row items-center overflow-hidden z-10 gap-6",
              typeAlt !== "search" ? "border-b-0 border-divider p-4" : "p-0"
            )}
          >
            {showPattern && <PatternBg />}

            <img
              src={image}
              alt=""
              className={classNames(
                "aspect-square h-[180px] w-[180px] shadow_card",
                type === "artist" ? "rounded-full" : "rounded"
              )}
            />
            <div
              className={classNames(
                "text-onNeutralBg flex w-full",
                typeAlt === "search"
                  ? "flex-row items-center justify-start gap-8"
                  : "flex-col items-start justify-between "
              )}
            >
              <div className="gap-2">
                <div className="flex items-center">
                  <div className="block capitalize">{type}</div>
                  <Genres genres={genres?.data} />
                </div>
                <Title
                  name={name}
                  type="extra-large"
                  divider={false}
                  desc={desc || <Contributors contributors={contributors} />}
                />

                {typeAlt !== "search" && (
                  <MetaDetails
                    {...{ tracksNo, albumsNo, fansNo, duration, releaseDate }}
                  />
                )}
              </div>
              {!hideActionButtons && (
                <div className="flex gap-4">
                  <IconButton
                    name={
                      isCurrentPlaylist
                        ? !isPlaying
                          ? "BsFillPlayFill"
                          : "BsFillPauseFill"
                        : "BsFillPlayFill"
                    }
                    className="w-10 h-10 bg-primary"
                    iconClassName="!text-white"
                    size={25}
                    onClick={
                      isCurrentPlaylist
                        ? handlePlayPause
                        : handleGetPlaylistFunc
                    }
                  />
                  {!["search", "artist"].includes(typeAlt) &&
                    listFavouritePlaylistDataSuccess && (
                      <IconButton
                        name={
                          isFavourite ? "MdFavorite" : "MdOutlineFavoriteBorder"
                        }
                        className={classNames(
                          "h-10 w-10",
                          isFavourite && "!bg-switch border border-red-500"
                        )}
                        iconClassName={classNames(
                          "!text-onNeutralBg",
                          isFavourite && "!text-red-700"
                        )}
                        onClick={() => {
                          const data = {
                            [details?.id]: {
                              id: details?.id,
                              type: details?.type,
                            },
                          };
                          if (isFavourite) {
                            removeFavouritePlaylist({
                              playlistD: data,
                              id: favouriteplaylistId,
                            });
                          } else {
                            saveFavouritePlaylist(data);
                          }
                        }}
                      />
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
