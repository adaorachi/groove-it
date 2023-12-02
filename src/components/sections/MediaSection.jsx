import { useMemo } from "react";

import { classNames, getRandomList, getFormatData } from "@/lib/utils";

import { Title, Cards, Skeletons } from "@/components";

const grid = {
  2: "grid-cols-2",
  3: "grid-cols-2 xs:grid-cols-3",
  4: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
};

export default function MediaSection({
  data,
  title,
  subTitle,
  titleType = "extra-large",
  titleDivider = true,
  enableTitle = true,
  showMoreLink,
  type,
  gridNumber = 5,
  cardItemNumber,
  skeletonItemNumber = gridNumber * 2,
  randomListNumber,
  isLoading,
  isSuccess,
}) {
  const getCardItemNumber = cardItemNumber || data?.length;

  const listFormatted = useMemo(() => {
    if (data) {
      if (randomListNumber) {
        return getFormatData(
          getRandomList(data, randomListNumber, 1, data?.length)
        );
      }
      return getFormatData(data?.slice(0, getCardItemNumber));
    }
  }, [getCardItemNumber, data, randomListNumber]);

  return (
    <>
      {isLoading && (
        <div className="animate_skeleton">
          {enableTitle && <Skeletons.TitleSkeleton />}
          <div className={classNames("grid gap-4", grid?.[gridNumber])}>
            <Skeletons.MediaCardSkeleton
              number={skeletonItemNumber}
              type={type}
            />
          </div>
        </div>
      )}
      {isSuccess && data?.length ? (
        <section className="media_section">
          <div className="media_content">
            {enableTitle && (
              <Title
                name={title || ""}
                type={titleType}
                desc={subTitle}
                divider={titleDivider}
                showMoreLink={showMoreLink}
              />
            )}
            <div className={classNames("grid gap-4", grid?.[gridNumber])}>
              {listFormatted?.length &&
                listFormatted?.map((item) => (
                  <Cards.MediaCard key={item.id} item={item} type={type} />
                ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
