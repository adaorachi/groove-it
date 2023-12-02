import { Navigate } from "react-router-dom";

import { useFetchFavouritePlaylist } from "@/lib/actions";
import { useCurrentUser } from "@/lib/store";
import { Sections } from "@/components";

export default function FavouritePlaylists() {
  const { currentUser } = useCurrentUser();
  const { user, isLoaded } = currentUser || {};

  const {
    data: favouritePlaylists,
    isPending: isFavPlaylistDataPending,
    isSuccess: isFavPlaylistDataSuccess,
  } = useFetchFavouritePlaylist();

  return (
    <div className="favourite_playlists_page">
      {isLoaded && (
        <>
          {!user ? (
            <Navigate to="/" replace={true} />
          ) : (
            <Sections.MediaSectionMinified
              data={favouritePlaylists}
              title="Favourite Playlists"
              titleType="large"
              subTitle="Curate your top playlists effortlessly with Favourite Playlists."
              type="playlist"
              gridNumber={3}
              cardItemNumber={9}
              isLoading={isFavPlaylistDataPending}
              isSuccess={isFavPlaylistDataSuccess}
              noDataText="No favourite playlist added!"
            />
          )}
        </>
      )}
    </div>
  );
}
