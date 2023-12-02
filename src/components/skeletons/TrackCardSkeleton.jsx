import { classNames } from "@/lib/utils";

import { Skeleton } from "./Skeleton";

const imageDimsOpt = {
  11: "h-11 w-11",
  16: "h-16 w-16",
  20: "h-20 w-20",
  28: "h-28 w-28",
};

export default function TrackCardSkeleton({ number, imageDims = "11" }) {
  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div key={index} className="col-span-1">
          <Skeleton className="flex flex-row items-center w-full p-4 rounded bg-card-skeleton">
            <Skeleton
              className={classNames(
                "rounded",
                gradientClass,
                imageDimsOpt[imageDims]
              )}
            />

            <div className="flex flex-col gap-2 ml-3">
              <Skeleton className={`w-20 h-4 rounded ${gradientClass}`} />
              <Skeleton className={`w-32 h-4 rounded ${gradientClass}`} />
            </div>
          </Skeleton>
        </div>
      ))}
    </>
  );
}
