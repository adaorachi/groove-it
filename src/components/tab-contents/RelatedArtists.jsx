import { Sections } from "@/components";

export default function RelatedArtists({
  relatedArtists,
  isPending,
  isSuccess,
}) {
  return (
    <div className="relative mt-8 artists_tab_content">
      <Sections.MediaSection
        data={relatedArtists?.data}
        enableTitle={false}
        type="artist"
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
