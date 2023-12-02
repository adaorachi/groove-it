import { useMemo } from "react";
import { Navigate } from "react-router-dom";

import { useCreateMyPlaylist, useFetchMyPlaylists } from "@/lib/actions";
import { useCurrentUser } from "@/lib/store";
import { IconButton, Sections } from "@/components";

export default function MyPlaylists() {
  const { currentUser } = useCurrentUser();
  const { user, isLoaded } = currentUser || {};

  const { createMyPlaylist, isCreating } = useCreateMyPlaylist();

  const {
    data: myPlaylists,
    isPending: myPlaylistsDataPending,
    isSuccess: myPlaylistsDataSuccess,
  } = useFetchMyPlaylists();

  const playlists = useMemo(() => {
    if (myPlaylists && myPlaylists.length) {
      return myPlaylists.map((playlist) => {
        const { image_url, created_at, desc, track_ids } = playlist;
        return {
          ...playlist,
          cover_big: image_url,
          type: "my-playlist",
          release_date: created_at,
          description: desc,
          track_total: track_ids ? Object.keys(track_ids)?.length : "0",
        };
      });
    } else {
      return null;
    }
  }, [myPlaylists]);

  return (
    <section className="my_playlist_page">
      {isLoaded && (
        <>
          {!user ? (
            <Navigate to="/" replace={true} />
          ) : (
            <Sections.MediaSectionMinified
              data={playlists}
              title="My Playlists"
              subTitle="Curate your sounds and tracks at the go."
              titleType="large"
              type="my-playlist"
              gridNumber={3}
              imageDims={28}
              isMyPlaylist
              CreatePlaylistComp={() => (
                <li className="col-span-1">
                  <div className="h-full add_playlist">
                    <div className="flex-col w-full h-full gap-2 p-4 border border-dashed rounded border-secondary flex_justify_center text-onNeutralBg">
                      <IconButton
                        name={isCreating ? "HiOutlineDotsHorizontal" : "MdAdd"}
                        className="w-12 h-12 rounded-full shadow-lg bg-primary flex_justify_center"
                        iconClassName="!text-white"
                        size="30"
                        disabled={isCreating}
                        onClick={() => createMyPlaylist()}
                      />
                      <p className="text-sm font-semibold tracking-wider">
                        Create Playlist
                      </p>
                    </div>
                  </div>
                </li>
              )}
              isLoading={myPlaylistsDataPending}
              isSuccess={myPlaylistsDataSuccess}
            />
          )}
        </>
      )}
    </section>
  );
}
