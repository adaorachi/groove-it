import { useId } from "react";

import { Sections } from "@/components";

export default function Discography({
  setCurrentTab,
  data,
  isPending,
  isSuccess,
}) {
  const { details, topTracks, albums, relatedArtists, playlists, radios } =
    data || {};

  const radioId = useId();

  return (
    <div className="relative mt-8 discography_tab_content">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-10">
        <div className="flex flex-col col-span-1 gap-8 md:col-span-7">
          <Sections.TrackSection
            data={topTracks?.data?.slice(0, 5)}
            details={{
              id: details?.id,
              type: "artist",
            }}
            disableHeader
            disableRowList={["album", "dateCreated"]}
            imageDims="10"
            enableTitle
            titleName="Top Tracks"
            titleDivider={false}
            showMoreLink={() => setCurrentTab("top_tracks")}
            showMoreDisplay="top"
            titleType="medium"
            className="px-1 py-1 rounded bg-sidebar"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSection
            data={albums?.data?.slice(0, 9)}
            title="Albums"
            titleType="medium"
            titleDivider={false}
            showMoreLink={() => setCurrentTab("albums")}
            type="album"
            cardItemNumber={9}
            gridNumber={3}
            isLoading={isPending}
            isSuccess={isSuccess}
          />
        </div>
        <div className="flex flex-col col-span-1 gap-8 md:col-span-3">
          <Sections.MediaSectionMinified
            data={playlists ? playlists?.data?.slice(0, 4) : []}
            title="Playlists"
            titleType="medium"
            titleDivider={false}
            type="playlist"
            gridNumber={1}
            showMoreLink={() => setCurrentTab("playlists")}
            showMoreDisplay="bottom"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSectionMinified
            data={relatedArtists?.data?.slice(0, 4)}
            title="Related Artists"
            titleType="medium"
            titleDivider={false}
            type="artist"
            gridNumber={1}
            showMoreLink={() => setCurrentTab("related_artists")}
            showMoreDisplay="bottom"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.TrackSection
            data={radios?.data?.slice(0, 6)}
            details={{
              id: radioId,
              type: "radio",
            }}
            disableHeader
            disableRowList={[
              "no",
              "album",
              "duration",
              "action_one",
              "action_two",
              "dateCreated",
            ]}
            imageDims="16"
            enableTitle
            listDivider={false}
            titleName="Radios"
            titleDivider={false}
            titleType="medium"
            isLoading={isPending}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
}
