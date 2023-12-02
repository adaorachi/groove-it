import { Navigate, useParams } from "react-router-dom";

import { useFetchMyPlaylist } from "@/lib/actions";
import { useAppModal, useCurrentUser } from "@/lib/store";
import { Button, SearchModal, Title, Sections } from "@/components";

export default function MyPlaylist() {
  const { id } = useParams();

  const { open, close, getModalContent } = useAppModal();

  const {
    data: playlist,
    isPending: playlistDataPending,
    isSuccess: playlistDataSuccess,
  } = useFetchMyPlaylist(id);

  const { currentUser } = useCurrentUser();
  const { user, isLoaded } = currentUser || {};

  const { playlistDetails, playlistTracks } = playlist || {};

  const { created_at, title, desc, image_url, image_path, track_ids } =
    playlistDetails || {};

  const sumTrackDuration = playlistTracks?.length
    ? playlistTracks.reduce((acc, item) => {
        acc += item.duration;
        return acc;
      }, 0)
    : null;

  const details = playlistDetails
    ? {
        id,
        image: image_url,
        imagePath: image_path,
        name: title,
        type: "playlist",
        desc,
        tracksNo: track_ids ? Object?.keys(track_ids)?.length : "0",
        duration: sumTrackDuration,
        releaseDate: created_at,
      }
    : null;

  return (
    <section className="playlist_section">
      {isLoaded && (
        <>
          {user ? (
            <div>
              <Sections.MyPlaylistBannerSection
                details={{ ...details, user: user?.username }}
                tracks={playlistTracks}
                showPattern
              />

              <div className="relative mt-8">
                <Sections.TrackSection
                  data={playlistTracks}
                  details={{
                    id,
                    type: "playlist",
                  }}
                  myPlaylistId={id}
                  skeletonItemNumber={10}
                  isLoading={playlistDataPending}
                  isSuccess={playlistDataSuccess}
                />

                {track_ids && (
                  <div className="w-full mt-8">
                    <Title
                      name="Let's find a new addition for your playlist!"
                      type="medium"
                      divider={false}
                    />
                    <Button
                      labelIcon="MdAdd"
                      label="Add Tracks"
                      variant="outlined"
                      className="!border-sidebar !text-onNeutralBg bg-sidebar !p-4"
                      onClick={() => {
                        open();
                        getModalContent(
                          <SearchModal
                            playlistId={id}
                            title={title}
                            close={close}
                          />
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Navigate to="/" replace={true} />
          )}
        </>
      )}
    </section>
  );
}
