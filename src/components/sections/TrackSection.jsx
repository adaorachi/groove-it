/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";

import { useFetchMyPlaylists } from "@/lib/actions";
import { usePlayerStore } from "@/lib/store";
import { classNames, getFormatData } from "@/lib/utils";
import { usePlayer } from "@/hooks";

import { ShowMoreButton, Title, Skeletons, Cards } from "@/components";

export default function TrackSection({
  data,
  details,
  disableHeader,
  disableRowList = [""],
  imageDims = "16",
  skeletonItemNumber = 5,
  enableTitle,
  titleDivider = true,
  titleName,
  titleType,
  showMoreLink,
  showMoreDisplay,
  listDivider = true,
  myPlaylistId,
  className,
  isLoading,
  isSuccess,
}) {
  useFetchMyPlaylists();

  const { playlistId, trackId, trackType } = usePlayerStore() || {};

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const trackFormatted = useMemo(() => getFormatData(data), [data]);

  const handleTrackClick = ({ id, type, index }) => {
    if (trackId === id) {
      handlePlayPause();
    } else {
      handleGetPlaylist({
        tracklist: trackFormatted,
        playlistId: details?.id,
        playlistType: details?.type,
        trackIndex: index,
        trackId: id,
        trackType: type,
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="animate_skeleton">
          {enableTitle && <Skeletons.TitleSkeleton type="top-pick" />}
          <Skeletons.TrackCardSkeleton
            number={skeletonItemNumber}
            imageDims={imageDims}
          />
        </div>
      )}

      {isSuccess && data?.length ? (
        <div className="track_section">
          {enableTitle && (
            <Title
              name={titleName || ""}
              type={titleType}
              divider={titleDivider}
              {...(showMoreDisplay === "top" && {
                showMoreLink,
              })}
            />
          )}
          <div className="">
            {!disableHeader && <Title name="Songs" type="medium" />}

            <div className={classNames("list_content", className)}>
              <ul className="flex flex-col w-full list-none">
                {trackFormatted?.length &&
                  trackFormatted?.map((item) => {
                    return (
                      <Cards.TrackCard
                        key={item.id}
                        item={item}
                        {...{
                          item,
                          trackId,
                          trackType,
                          playlistId,
                          details,
                          isPlaying,
                          myPlaylistId,
                          listDivider,
                          disableRowList,
                          handleTrackClick,
                          imageDims,
                        }}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
          {showMoreLink && showMoreDisplay === "bottom" && (
            <ShowMoreButton onClick={showMoreLink} />
          )}
        </div>
      ) : null}
    </>
  );
}
