import { useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchArtist } from "@/lib/actions";
import { Tab, Sections, TabContents } from "@/components";

export default function Artist() {
  const { id } = useParams();
  const {
    data: artist,
    isPending: artistDataPending,
    isSuccess: artistDataSuccess,
  } = useFetchArtist({ id });

  const { details, topTracks, albums, playlists, relatedArtists } =
    artist || {};

  const [currentTab, setCurrentTab] = useState("discography");

  const content = {
    discography: (
      <TabContents.Discography
        setCurrentTab={setCurrentTab}
        data={artist}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    playlists: (
      <TabContents.Playlists
        playlists={playlists}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    top_tracks: (
      <TabContents.TopTracks
        topTracks={topTracks}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    related_artists: (
      <TabContents.RelatedArtists
        relatedArtists={relatedArtists}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
    albums: (
      <TabContents.Albums
        albums={albums}
        isPending={artistDataPending}
        isSuccess={artistDataSuccess}
      />
    ),
  };

  return (
    <section className="relative artist_section">
      <Sections.BannerSection
        details={details}
        tracks={topTracks?.data}
        type="artist"
        isLoading={artistDataPending}
        isSuccess={artistDataSuccess}
      />
      <div className="mt-8">
        <Tab
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          content={content}
          tabs={[
            {
              id: "discography",
              name: "Discography",
              display: true,
            },
            {
              id: "top_tracks",
              name: "Top Tracks",
              display: topTracks?.data?.length,
            },
            {
              id: "playlists",
              name: "Playlists",
              display: playlists?.data?.length,
            },
            {
              id: "related_artists",
              name: "Related Artists",
              display: relatedArtists?.data?.length,
            },
            { id: "albums", name: "Albums", display: albums?.data?.length },
          ]}
          isLoaded={Boolean(artist)}
        />
      </div>
    </section>
  );
}
