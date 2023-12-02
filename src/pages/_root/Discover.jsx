import {
  useFetchRecentPlayed,
  useFetchTopCharts,
  useFetchNewReleases,
} from "@/lib/actions";
import { Sections } from "@/components";

export default function Discover() {
  const {
    data: recentPlayed,
    isPending: isRecentPlayedDataPending,
    isSuccess: isRecentPlayedDataSucsess,
  } = useFetchRecentPlayed();
  const {
    data: topChartData,
    isPending: isTopChartDataPending,
    isSuccess: isTopChartDataSuccess,
  } = useFetchTopCharts({ id: "0", section: "charts" });

  const {
    data: newReleases,
    isPending: isNewReleaseDataPending,
    isSuccess: isNewReleaseDataSuccess,
  } = useFetchNewReleases({
    id: "0",
  });

  const { playlists, artists, albums, podcasts } = topChartData || {};
  const { releases } = newReleases || {};

  return (
    <section className="discover_page">
      <div className="flex flex-col gap-y-16">
        {recentPlayed && recentPlayed?.length ? (
          <div className="relative">
            <Sections.MediaSectionMinified
              data={recentPlayed}
              title="Recent Played"
              titleType="large"
              subTitle="Rediscover the Soundtrack of Your Moments."
              type="playlist"
              gridNumber={3}
              cardItemNumber={9}
              bgColor
              showPattern
              isLoading={isRecentPlayedDataPending}
              isSuccess={isRecentPlayedDataSucsess}
            />
          </div>
        ) : null}

        <Sections.MediaSection
          data={playlists?.data}
          title="Discover"
          subTitle="Explore sonic realms with our Discover feature."
          type="playlist"
          cardItemNumber={10}
          isLoading={isTopChartDataPending}
          isSuccess={isTopChartDataSuccess}
        />

        <Sections.MediaSection
          data={artists?.data}
          title="Suggested Artists"
          subTitle="Discover new sounds with handpicked artists tailored to your taste."
          skeletonItemNumber={5}
          randomListNumber={5}
          cardItemNumber={10}
          type="artist"
          isLoading={isTopChartDataPending}
          isSuccess={isTopChartDataSuccess}
        />

        <Sections.MediaSection
          data={albums?.data}
          title="Editor's Picks"
          subTitle="Curation of standout tracks."
          cardItemNumber={10}
          type="album"
          isLoading={isTopChartDataPending}
          isSuccess={isTopChartDataSuccess}
        />

        <Sections.MediaSection
          data={releases?.data}
          title="New Releases"
          subTitle="Discover fresh and latest soundscapes in our collection."
          cardItemNumber={10}
          type="album"
          isLoading={isNewReleaseDataPending}
          isSuccess={isNewReleaseDataSuccess}
        />

        <Sections.MediaSection
          data={podcasts?.data}
          title="Podcasts For You"
          subTitle="Listen and enjoy personalized audio content just for you."
          gridNumber={4}
          type="podcast"
          isLoading={isTopChartDataPending}
          isSuccess={isTopChartDataSuccess}
        />
      </div>
    </section>
  );
}
