import { classNames } from "@/lib/utils";

import { Skeleton } from "./Skeleton";

export default function MediaCardSkeleton({ type, number }) {
  const gradientClass = "bg-gradient-to-l from-main to-card";

  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div className="col-span-1" key={index}>
          <Skeleton className="w-full p-4 rounded bg-card-skeleton">
            <div className="aspect-square">
              <Skeleton
                className={classNames(
                  "w-full h-full",
                  gradientClass,
                  type === "artist" ? "rounded-full" : "rounded"
                )}
              />
            </div>
            <div className="flex justify-center">
              <Skeleton className={`w-20 h-4 rounded mt-4 ${gradientClass}`} />
            </div>
          </Skeleton>
        </div>
      ))}
    </>
  );
}
