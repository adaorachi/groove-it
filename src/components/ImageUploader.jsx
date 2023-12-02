/* eslint-disable no-unused-vars */
import { classNames } from "@/lib/utils";

import { Icon } from "@/components";

export default function ImageUploader({
  blobUrl,
  imageRef,
  containerDims = "h-32 w-full",
  borderType = "rounded",
}) {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 relative bg-main p-2",
        containerDims,
        borderType
      )}
    >
      <div
        className={classNames(
          "flex justify-center items-center h-full w-full border-2 border-dashed border-gray-600 cursor-pointer",
          borderType
        )}
        onClick={() => imageRef?.current?.click()}
      >
        {blobUrl ? (
          <img
            src={blobUrl}
            alt="image"
            width={96}
            height={96}
            className={classNames(
              "h-full w-full object-contain p-3",
              borderType
            )}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Icon
              name="AiOutlineCloudUpload"
              size={25}
              className="!text-secondary"
            />
            {/* <Icon name="HiOutlineCamera" size={20} /> */}
            <div className="text-sm font-semibold text-center text-secondary">
              Browse file to upload
              {/* Select */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
