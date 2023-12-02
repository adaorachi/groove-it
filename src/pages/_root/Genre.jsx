import {
  useFetchNewReleases,
  useFetchChartBySection,
  useFetchTopSelection,
  useFetchGenreBySection,
  useFetchGenreById,
} from "@/lib/actions";
import { Sections } from "@/components";

export default function Genre({ id }) {
  const {
    data: genre,
    isSuccess: genreDataSuccess,
    isPending: genreDataPending,
  } = useFetchGenreById({ id });

  const {
    data: playlists,
    isPending: playlistsDataPending,
    isSuccess: playlistsDataSuccess,
  } = useFetchChartBySection({
    id,
    section: "playlists",
  });

  const {
    data: artists,
    isPending: artistsDataPending,
    isSuccess: artistsDataSuccess,
  } = useFetchChartBySection({
    id,
    section: "artists",
  });

  const {
    data: topSelection,
    isPending: topSelectionDataPending,
    isSuccess: topSelectionDataSuccess,
  } = useFetchTopSelection({
    id,
  });

  const {
    data: newReleases,
    isPending: releasesDataPending,
    isSuccess: releasesDataSuccess,
  } = useFetchNewReleases({
    id,
  });

  const {
    data: radios,
    isPending: radiosDataPending,
    isSuccess: radiosDataSuccess,
  } = useFetchGenreBySection({
    id,
    section: "radios",
  });

  const { releases } = newReleases || {};
  const { selection } = topSelection || {};

  const genreName = genre?.name;

  const gridNumber = 5;

  return (
    <section className="genre_section">
      <div className="relative z-20 flex flex-col gap-10">
        <Sections.MediaSection
          data={playlists?.data}
          title={`Trending Now in ${genreName}`}
          titleType="large"
          titleDivider={false}
          type="playlist"
          cardItemNumber={10}
          gridNumber={gridNumber}
          isLoading={playlistsDataPending && genreDataPending}
          isSuccess={playlistsDataSuccess && genreDataSuccess}
        />

        <Sections.MediaSection
          data={releases?.data}
          title={`New ${genreName} Releases`}
          titleType="large"
          titleDivider={false}
          type="album"
          cardItemNumber={10}
          gridNumber={gridNumber}
          isLoading={releasesDataPending && genreDataPending}
          isSuccess={releasesDataSuccess && genreDataSuccess}
        />

        <Sections.MediaSection
          data={selection?.data}
          title={`Editor's Picks in ${genreName}`}
          titleType="large"
          titleDivider={false}
          type="album"
          cardItemNumber={10}
          gridNumber={gridNumber}
          isLoading={topSelectionDataPending && genreDataPending}
          isSuccess={topSelectionDataSuccess && genreDataSuccess}
        />

        <Sections.MediaSection
          data={artists?.data}
          title={`Artists in ${genreName}`}
          titleType="large"
          titleDivider={false}
          type="artist"
          cardItemNumber={10}
          randomListNumber={5}
          gridNumber={gridNumber}
          isLoading={artistsDataPending && genreDataPending}
          isSuccess={artistsDataSuccess && genreDataSuccess}
        />

        <Sections.MediaSection
          data={radios?.data}
          title={`Radios in ${genreName}`}
          titleType="large"
          titleDivider={false}
          type="radio"
          cardItemNumber={10}
          gridNumber={gridNumber}
          isLoading={radiosDataPending && genreDataPending}
          isSuccess={radiosDataSuccess && genreDataSuccess}
        />
      </div>
    </section>
  );
}
