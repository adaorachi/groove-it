import { Sections } from "@/components";

export default function TopTracks({
  topTracks,
  details,
  isPending,
  isSuccess,
}) {
  return (
    <div className="relative mt-8 tracks_tab_content">
      <Sections.TrackSection
        data={topTracks?.data}
        details={{
          id: details?.id,
          type: details?.type,
        }}
        disableRowList={["dateCreated"]}
        enableTitle={false}
        skeletonItemNumber={20}
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
