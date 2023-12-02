import { Sections } from "@/components";

export default function Playlists({ playlists, isPending, isSuccess }) {
  return (
    <div className="relative mt-8 playlist_tab_content">
      <Sections.MediaSection
        data={playlists?.data}
        enableTitle={false}
        type="playlist"
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
