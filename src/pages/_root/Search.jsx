import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchSearch } from "@/lib/actions";
import { Tab, Title, TabContents } from "@/components";

export default function Search() {
  const [getQuery, setQuery] = useState(null);
  const [currentTab, setCurrentTab] = useState("all");

  const params = useParams();

  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("q");
    if (query) {
      setQuery(query);
    }
  }, [params]);

  const {
    isPending: searchDataPending,
    isSuccess: searchDataSuccess,
    data: searchResult,
  } = useFetchSearch({ searchText: getQuery });

  const { tracks, albums, playlists, artists } = searchResult || {};

  const content = {
    all: (
      <TabContents.AllSearch
        setCurrentTab={setCurrentTab}
        data={searchResult}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    playlists: (
      <TabContents.Playlists
        playlists={playlists}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    tracks: (
      <TabContents.TopTracks
        topTracks={tracks}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    artists: (
      <TabContents.RelatedArtists
        relatedArtists={artists}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
    albums: (
      <TabContents.Albums
        albums={albums}
        isPending={searchDataPending}
        isSuccess={searchDataSuccess}
      />
    ),
  };

  return (
    <section className="search_page relative">
      {!searchDataPending ? (
        <>
          {searchDataSuccess && tracks?.data?.length ? (
            <Tab
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              content={content}
              tabs={[
                { id: "all", name: "All", display: true },
                { id: "tracks", name: "Tracks", display: tracks?.data?.length },
                {
                  id: "playlists",
                  name: "Playlists",
                  display: playlists?.data?.length,
                },
                {
                  id: "artists",
                  name: "Artists",
                  display: artists?.data?.length,
                },
                { id: "albums", name: "Albums", display: albums?.data?.length },
              ]}
              isLoaded={Boolean(searchResult)}
            />
          ) : (
            <div className="rounded p-4 bg-card shadow-lg w-fit">
              <Title name="No result found!" type="small" divider={false} />
            </div>
          )}
        </>
      ) : (
        <div className="rounded p-4 bg-card shadow-lg w-fit">
          <Title name="Searching ..." type="small" divider={false} />
        </div>
      )}
    </section>
  );
}
