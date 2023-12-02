import { Link } from "react-router-dom";

import {
  formatDateString,
  formatNumberWithCommas,
  formatTime,
  pluralize,
} from "@/lib/utils";

export const Genres = ({ genres }) => {
  return (
    <>
      {genres?.length ? (
        <div className="flex items-center gap-2">
          {genres && <>&nbsp;|</>}
          {genres?.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className="p-2 text-sm rounded-full bg-main"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export const Contributors = ({ contributors }) => {
  return (
    <>
      {contributors?.length ? (
        <div className="flex items-center">
          {contributors?.map((contributor, index) => (
            <>
              <Link
                key={contributor.id}
                to={`/artist/${contributor.id}`}
                className="text-base text-onNeutralBg hover:underline underline-offset-4"
              >
                {contributor.name}
              </Link>
              {contributors.length - 1 !== index && <>,&nbsp;</>}
            </>
          ))}
        </div>
      ) : null}
    </>
  );
};

export const MetaDetails = ({
  user,
  tracksNo,
  albumsNo,
  fansNo,
  duration,
  releaseDate,
}) => {
  return (
    <div className="flex flex-wrap items-center mb-4 -mt-2 text-sm tracking-wider text-secondary">
      {user && <span>{user} &nbsp;.&nbsp;&nbsp;</span>}

      {fansNo && (
        <span>
          {formatNumberWithCommas(fansNo)} {pluralize("fan", fansNo)}
          &nbsp;|&nbsp;
        </span>
      )}
      {tracksNo ? (
        <span>
          {tracksNo} {pluralize("track", tracksNo)}&nbsp;|&nbsp;
        </span>
      ) : null}
      {albumsNo ? (
        <span>
          {albumsNo} {pluralize("album", albumsNo)}
        </span>
      ) : null}
      {duration && <span>{formatTime(duration)}&nbsp;|&nbsp;</span>}
      {releaseDate && <span>{formatDateString(releaseDate)}</span>}
    </div>
  );
};

export const MetaDetailsMediaCard = ({
  tracksNo,
  fansNo,
  albumsNo,
  releaseDate,
  type,
}) => {
  return (
    <>
      {(tracksNo || releaseDate || fansNo || albumsNo) && (
        <>
          {["podcast", "artist"].includes(type) ? (
            <p className="mt-1 text-xs font-normal text-secondary">
              {fansNo && <span>{formatNumberWithCommas(fansNo)} fans</span>}
              {albumsNo && <span>&nbsp;&nbsp;{albumsNo} albums</span>}
            </p>
          ) : (
            <p className="mt-1 text-xs font-normal text-secondary">
              {tracksNo && <span>{tracksNo} tracks &nbsp;&nbsp;</span>}
              {releaseDate && <span>{formatDateString(releaseDate)}</span>}
            </p>
          )}
        </>
      )}
    </>
  );
};
