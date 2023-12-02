import { useMemo } from "react";

import { classNames, getRandomList, getFormatData } from "@/lib/utils";

import {
  PatternBg,
  ShowMoreButton,
  Title,
  Skeletons,
  Cards,
} from "@/components";

const grid = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-5",
};

export default function MediaSectionMinified({
  data,
  title,
  subTitle,
  titleType = "extra-large",
  titleDivider = true,
  type,
  gridNumber = 5,
  cardItemNumber,
  skeletonItemNumber = gridNumber * 2,
  bgColor,
  randomListNumber,
  showMoreLink,
  imageDims,
  isMyPlaylist,
  CreatePlaylistComp,
  noDataText,
  showPattern,
  isLoading,
  isSuccess,
}) {
  const getCardItemNumber = cardItemNumber || data?.length;

  const listFormatted = useMemo(() => {
    if (randomListNumber) {
      return getFormatData(
        getRandomList(data, randomListNumber, 1, data?.length)
      );
    }
    return getFormatData(data?.slice(0, getCardItemNumber));
  }, [getCardItemNumber, data, randomListNumber]);

  return (
    <>
      {isLoading && (
        <div className="animate_skeleton">
          <Skeletons.TitleSkeleton />
          <ul className={classNames("grid gap-4", grid?.[gridNumber])}>
            <Skeletons.TrackCardSkeleton
              number={skeletonItemNumber}
              type={type}
              imageDims={imageDims}
            />
          </ul>
        </div>
      )}
      {isSuccess && (
        <>
          {data?.length && listFormatted?.length ? (
            <section className="media_section">
              <div className="media_content">
                <div
                  className={classNames(
                    "relative",
                    bgColor && "p-6 rounded bg-card overflow-hidden"
                  )}
                >
                  {showPattern && <PatternBg />}

                  <Title
                    name={title}
                    type={titleType}
                    desc={subTitle}
                    divider={titleDivider}
                  />
                  <ul
                    className={classNames(
                      "grid",
                      grid?.[gridNumber],
                      isMyPlaylist ? "gap-6" : "gap-2"
                    )}
                  >
                    {listFormatted?.length &&
                      listFormatted?.map((item) => (
                        <Cards.MediaCardMinified
                          key={item.id}
                          item={item}
                          type={item?.type || type}
                          imageDims={imageDims}
                          isMyPlaylist={isMyPlaylist}
                        />
                      ))}
                    {CreatePlaylistComp && <CreatePlaylistComp />}
                  </ul>
                  {showMoreLink && <ShowMoreButton onClick={showMoreLink} />}
                </div>
              </div>
            </section>
          ) : (
            <div>
              <Title
                name={title}
                type={titleType}
                desc={subTitle}
                divider={titleDivider}
              />
              {noDataText && (
                <div className="p-4 mb-4 rounded shadow-lg bg-card w-fit">
                  <Title name={noDataText} type="small" divider={false} />
                </div>
              )}
              {CreatePlaylistComp && (
                <ul
                  className={classNames(
                    "grid",
                    grid?.[gridNumber],
                    isMyPlaylist ? "gap-6" : "gap-2"
                  )}
                >
                  {<CreatePlaylistComp />}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
