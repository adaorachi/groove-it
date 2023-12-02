import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";

import { useAddTrackToMyPlaylist, useFetchSearch } from "@/lib/actions";
import { classNames, formatIndexToDouble, formatDuration } from "@/lib/utils";
import { useDebounce } from "@/hooks";

import { Icon, Title } from "@/components";

const ModalContent = ({
  item,
  playlistId,
  index,
  isSubmittingAddToPlaylist,
  setGetId,
  addToMyPlaylist,
  getId,
  close,
}) => {
  const navigate = useNavigate();

  return (
    <li
      key={item.id}
      className={classNames(
        "relative p-3 flex items-center text-base !text-onNeutralBg hover:bg-divider hover:rounded cursor-pointer group border-divider focus-within:bg-divider focus-within:rounded py-2",
        index !== 0 && " border-t"
      )}
    >
      <div className="relative flex items-center justify-between w-full gap-4">
        <div className="flex items-center justify-start gap-2">
          <span className="block text-sm font-bold">
            {formatIndexToDouble(index + 1)}
          </span>
          <div className="rounded h-14 w-14 bg-sidebar">
            <img
              src={item?.album?.cover_medium}
              alt={item?.album?.name}
              width={70}
              height={70}
              className={classNames("h-full w-full rounded aspect-square")}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2 text-onNeutralBg">
            <div className="flex flex-col">
              <span className="text-[15px]">{truncate(item.title, 15)}</span>
              <button
                onClick={() => {
                  close();
                  navigate(`/artist/${item?.artist?.id}`);
                }}
                className="text-left text-secondary hover:underline underline-offset-4 cursor-pointer text-[14px]"
              >
                {item?.artist?.name}
              </button>
            </div>
            <button
              onClick={() => {
                close();
                navigate(`/album/${item?.album?.id}`);
              }}
              className="text-[15px] text-left cursor-pointer hover:underline underline-offset-4"
            >
              {truncate(item?.album?.title, 15)}
            </button>
          </div>
        </div>
        <div className="top-0 right-0 ml-8">
          <div className="flex items-end justify-end text-sm text-right group-hover:hidden">
            {formatDuration(item.duration)}
          </div>
          <button
            className="hidden p-2 text-sm font-semibold border group-hover:flex rounded-xl"
            disabled={isSubmittingAddToPlaylist}
            onClick={() => {
              setGetId(item?.id);

              addToMyPlaylist({
                trackD: {
                  [item?.id]: {
                    id: item?.id,
                    type: "track",
                  },
                },
                id: playlistId,
                imageUrl: item?.album?.cover_medium,
              });
            }}
          >
            {isSubmittingAddToPlaylist && getId == item?.id
              ? "Adding ..."
              : "Add"}
          </button>
        </div>
      </div>
    </li>
  );
};

const SearchModal = ({ playlistId, title, close }) => {
  const {
    createMyPlaylist: addToMyPlaylist,
    isCreating: isSubmittingAddToPlaylist,
  } = useAddTrackToMyPlaylist();

  const [searchTerm, setSearchTerm] = useState("");
  const [getId, setGetId] = useState(null);

  const searchValue = useDebounce(searchTerm, 2000);

  const {
    isPending: searchDataPending,
    isSuccess: searchDataSuccess,
    data: searchResult,
  } = useFetchSearch({ searchText: searchValue });

  return (
    <div className="search_card">
      <div className="flex flex-col items-start w-fit">
        <Title
          name={title}
          desc={"Let's find a new addition for your playlist!"}
          type="medium"
          divider={false}
        />
        <div className="relative w-full p-2 rounded shadow-sm bg-sidebar h-14">
          <div className="flex items-center w-full h-full gap-2 px-2 border-0 rounded border-divider">
            <Icon name="BiSearch" />
            <input
              className="w-full h-full text-sm bg-transparent outline-none placeholder:text-secondary text-onNeutralBg"
              placeholder="Search for songs or tracks ..."
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {searchDataPending && (
        <div className="p-4 mt-4 rounded shadow-lg bg-sidebar w-fit">
          <Title name="Loading Search ..." divider={false} />
        </div>
      )}
      {searchDataSuccess && searchResult && (
        <div className="w-full mt-6 text-sm border-separate text-onNeutralBg border-spacing-y-4">
          <div>
            {searchResult?.tracks?.data ? (
              searchResult?.tracks?.data.map((item, index) => (
                <ModalContent
                  key={index}
                  {...{
                    item,
                    playlistId,
                    index,
                    isSubmittingAddToPlaylist,
                    setGetId,
                    addToMyPlaylist,
                    getId,
                    close,
                  }}
                />
              ))
            ) : (
              <div className="p-4 mt-4 rounded shadow-lg bg-sidebar w-fit">
                <Title name="No result found!" divider={false} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
