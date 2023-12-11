/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { arrayRemove, arrayUnion, serverTimestamp } from "@firebase/firestore";

import { useCurrentUser } from "@/lib/store";
import { elementInArray } from "@/lib/utils";
import {
  fbSetDoc,
  fbAddDoc,
  fbGetDoc,
  fbUpdateDoc,
  fbDeleteDoc,
  fbGetCollection,
  fbCountCollection,
  uploadImage,
  fbDeleteStorage,
} from "@/lib/helpers";

import { useNotification } from "@/hooks";
import { auth } from "@/configs";

import { fetchMultiplePlaylists } from "./editorial.action";

// recent played
export const useSaveRecentPlayed = () => {
  const userId = auth?.currentUser?.uid;

  const queryClient = useQueryClient();

  const { mutate: saveRecentPlayed } = useMutation({
    mutationFn: async (playlist) => {
      if (userId) {
        try {
          const recentPlayedRef = await fbGetDoc({
            collection: "recentPlayed",
            id: userId,
          });

          if (recentPlayedRef.exists()) {
            const { playlist_ids } = recentPlayedRef.data() || {};
            const notInArray = elementInArray(playlist_ids, playlist);
            if (!notInArray) {
              const playlistIdsData = [playlist, ...playlist_ids].slice(0, 6);

              await fbUpdateDoc({
                collection: "recentPlayed",
                id: userId,
                data: {
                  playlist_ids: playlistIdsData,
                },
              });
            }
          } else {
            await fbSetDoc({
              collection: "recentPlayed",
              id: userId,
              data: {
                user_id: userId,
                playlist_ids: arrayUnion(playlist),
                created_at: serverTimestamp(),
              },
            });
          }
        } catch (error) {
          // console.log(error);
        }
      } else {
        throw new Error("invalid params");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentPlayed"] });
    },
  });

  return {
    saveRecentPlayed,
  };
};

export const useFetchRecentPlayed = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["recentPlayed", { userId }],
    queryFn: async () => {
      if (userId) {
        try {
          const recentPlayedRef = await fbGetDoc({
            collection: "recentPlayed",
            id: userId,
          });

          if (recentPlayedRef.exists()) {
            const data = recentPlayedRef.data().playlist_ids;
            return await fetchMultiplePlaylists(data);
          } else {
            return null;
          }
        } catch (error) {
          // console.log(error);
        }
      } else {
        return null;
        // throw new Error("Invalid userId");
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

// fetch playlists

export const useFetchMyPlaylists = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const navigate = useNavigate();

  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["myPlaylists", { userId, navigate }],
    queryFn: async () => {
      if (userId) {
        try {
          const myPlaylistsRef = await fbGetCollection({
            collection: "myPlaylists",
            whereQueries: [["user_id", "==", userId]],
            orderByQueries: [["created_at", "desc"]],
          });

          return myPlaylistsRef.docs.map((i) => {
            const s = i.data();
            return { ...s, id: i.id, created_at: s.created_at.toDate() };
          });
        } catch (error) {
          navigate("/");
          // console.log(error);
        }
      } else {
        return null;
        // throw new Error("invalid params");
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

// playlist CRUD

export const useCreateMyPlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const navigate = useNavigate();
  const [notify] = useNotification();

  const queryClient = useQueryClient();

  const { mutate: createMyPlaylist, isPending: isCreating } = useMutation({
    mutationFn: async () => {
      if (userId) {
        try {
          const countMyPlaylist = await fbCountCollection({
            collection: "myPlaylists",
            whereQueries: [["user_id", "==", userId]],
          });

          const docRef = await fbAddDoc({
            collection: "myPlaylists",
            data: {
              user_id: userId,
              desc: "Here is an optional description",
              title: `My Playlist #${countMyPlaylist + 1}`,
              track_ids: [],
              image_url: null,
              created_at: serverTimestamp(),
            },
          });

          navigate(`/my-playlist/${docRef.id}`);
        } catch (error) {
          notify({
            title: "Error",
            variant: "error",
            description: "Request failed",
          });
          // console.log(error);
        }
      } else {
        throw new Error("Invalid params");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPlaylists"] });
    },
  });

  return {
    createMyPlaylist,
    isCreating,
  };
};

export const useFetchMyPlaylist = (id) => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const [notify] = useNotification();
  const navigate = useNavigate();

  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: [`singleMyPlaylist_${id}`, { userId, id }],
    queryFn: async () => {
      if (userId) {
        try {
          const singlePlaylist = await fbGetDoc({
            collection: "myPlaylists",
            id,
          });

          const { track_ids } = singlePlaylist.data() || {};

          let playlistDetails = singlePlaylist.data();

          playlistDetails = {
            ...playlistDetails,
            id: singlePlaylist.id,
            created_at: playlistDetails.created_at.toDate(),
          };

          if (track_ids?.length) {
            const tracks = await fetchMultiplePlaylists(track_ids);

            return {
              playlistDetails,
              playlistTracks: tracks,
            };
          } else {
            return {
              playlistDetails,
              playlistTracks: [],
            };
          }
        } catch (error) {
          notify({
            title: "Error",
            variant: "error",
            description: "Request failed",
          });
          navigate("/");
          // console.log(error);
        }
      } else {
        throw new Error("Invalid params");
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useEditMyPlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const [notify] = useNotification();
  const queryClient = useQueryClient();

  const {
    mutate: editMyPlaylist,
    isPending: isEditing,
    isSuccess: isEdited,
  } = useMutation({
    mutationFn: async (values) => {
      const { id, title, desc, files, imagePath } = values;

      if (userId) {
        try {
          let imageUrl = null;
          let pathUrl = null;
          if (files) {
            pathUrl = imagePath || uuidv4();

            imageUrl = await uploadImage({
              imageFile: files[0],
              storagePath: `myPlaylists/${pathUrl}`,
              fileName: "image.jpg",
            });
          }

          await fbUpdateDoc({
            data: {
              title,
              desc,
              ...(files ? { image_url: imageUrl, image_path: pathUrl } : {}),
            },
            collection: "myPlaylists",
            id,
          });

          notify({
            title: "Success",
            variant: "success",
            description: "Details successfully edited",
          });
        } catch (error) {
          notify({
            title: "Error",
            variant: "error",
            description: "Request failed",
          });
        }
      } else {
        throw new Error("invalid params");
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`singleMyPlaylist_${variables?.id}`],
      });
    },
  });

  return {
    editMyPlaylist,
    isEditing,
    isEdited,
  };
};

export const useRemoveMyPlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const navigate = useNavigate();
  const [notify] = useNotification();

  const queryClient = useQueryClient();

  const { mutate: deleteMyPlaylist, isPending: isRemoving } = useMutation({
    mutationFn: async (id) => {
      if (userId) {
        try {
          const playlist = await fbGetDoc({ collection: "myPlaylists", id });

          const filePath = playlist?.data()?.image_path;
          await fbDeleteDoc({ collection: "myPlaylists", id });
          if (filePath) {
            await fbDeleteStorage(`myPlaylists/${filePath}/image.jpg`);
          }

          navigate("/my-playlist");

          notify({
            title: "Success",
            variant: "success",
            description: "Deleted from playlist",
          });
          return null;
        } catch (error) {
          notify({
            title: "Error",
            variant: "error",
            description: "An error occurred while deleting",
          });
          // console.log(error);
        }
      } else {
        throw new Error("invalid error");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`myPlaylists`] });
    },
  });

  return {
    deleteMyPlaylist,
    isRemoving,
  };
};

// add/remove tracks to/from a playlist

export const useAddTrackToMyPlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const [notify] = useNotification();

  const queryClient = useQueryClient();

  const { mutate: createMyPlaylist, isPending: isCreating } = useMutation({
    mutationFn: async ({ trackD, id, imageUrl }) => {
      if (userId) {
        try {
          const addTrackRef = await fbGetDoc({
            collection: "myPlaylists",
            id,
          });

          if (addTrackRef.exists()) {
            const { track_ids, image_url } = addTrackRef.data();
            const notInArray = elementInArray(track_ids, trackD);

            if (!notInArray) {
              const trackIdsData = [trackD, ...track_ids].slice(0, 10);
              await fbUpdateDoc({
                data: {
                  track_ids: trackIdsData,
                  image_url: image_url || imageUrl,
                },
                collection: "myPlaylists",
                id,
              });
              notify({
                title: "Success",
                variant: "success",
                description: "Added to playlist",
              });
            }
          }
        } catch (error) {
          notify({
            title: "Error",
            variant: "error",
            description: "An error occurred while adding",
          });
          // console.log(error);
        }
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`singleMyPlaylist_${variables.id}`],
      });
    },
  });

  return {
    createMyPlaylist,
    isCreating,
  };
};

export const useRemoveTrackFromMyPlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const [notify] = useNotification();

  const queryClient = useQueryClient();

  const { mutate: deleteTrackFromMyPlaylist, isPending: isRemoving } =
    useMutation({
      mutationFn: async ({ trackD, id }) => {
        if (userId) {
          try {
            await fbUpdateDoc({
              data: {
                track_ids: arrayRemove(trackD),
              },
              collection: "myPlaylists",
              id,
            });

            notify({
              title: "Success",
              variant: "success",
              description: "Deleted from playlist",
            });
            return null;
          } catch (error) {
            notify({
              title: "Error",
              variant: "error",
              description: "An error occurred while deleting",
            });
            // console.log(error);
          }
        } else {
          throw new Error("Invalid params");
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [`singleMyPlaylist_${variables.id}`],
        });
      },
    });

  return {
    deleteTrackFromMyPlaylist,
    isRemoving,
  };
};

// favourites playlists CRUD

export const useSaveFavouritePlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const queryClient = useQueryClient();

  const [notify] = useNotification();

  const { mutate: saveFavouritePlaylist } = useMutation({
    mutationFn: async (playlist) => {
      if (userId) {
        try {
          const favouritePlaylistsRef = await fbGetDoc({
            collection: "favouritePlaylists",
            id: userId,
          });

          if (favouritePlaylistsRef.exists()) {
            const { playlist_ids } = favouritePlaylistsRef.data() || {};

            const notInArray = elementInArray(playlist_ids, playlist);

            if (!notInArray) {
              const playlistIdsData = [playlist, ...playlist_ids].slice(0, 10);

              await fbUpdateDoc({
                collection: "favouritePlaylists",
                id: userId,
                data: {
                  playlist_ids: playlistIdsData,
                },
              });
            }
          } else {
            await fbSetDoc({
              collection: "favouritePlaylists",
              id: userId,
              data: {
                user_id: userId,
                playlist_ids: arrayUnion(playlist),
                created_at: serverTimestamp(),
              },
            });
          }

          notify({
            title: "Success",
            variant: "success",
            description: "Favourite playlist added",
          });
        } catch (error) {
          // console.log(error);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listFavouritePlaylists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["favouritePlaylists"],
      });
    },
  });

  return {
    saveFavouritePlaylist,
  };
};

export const useFetchFavouritePlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["favouritePlaylists", { userId }],
    queryFn: async () => {
      if (userId) {
        try {
          const favPlaylistsRef = await fbGetDoc({
            collection: "favouritePlaylists",
            id: userId,
          });

          const { playlist_ids } = favPlaylistsRef?.data() || {};

          if (favPlaylistsRef.exists() && playlist_ids?.length) {
            return await fetchMultiplePlaylists(playlist_ids);
          } else {
            return null;
          }
        } catch (error) {
          // console.log(error);
        }
      } else {
        throw new Error("Invalid userId");
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useListFavouritePlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const { isPending, isSuccess, isError, isFetching, error, data } = useQuery({
    queryKey: ["listFavouritePlaylists", { userId }],
    queryFn: async () => {
      if (userId) {
        try {
          const favPlaylistsRef = await fbGetDoc({
            collection: "favouritePlaylists",
            id: userId,
          });

          const id = favPlaylistsRef?.id;
          const { playlist_ids } = favPlaylistsRef?.data() || {};

          const favouriteplaylistList = playlist_ids?.reduce((acc, item) => {
            acc.push(Object.keys(item)[0]);
            return acc;
          }, []);

          return { favouriteplaylistList, favouriteplaylistId: id };
        } catch (error) {
          // console.log(error);
        }
      } else {
        throw new Error("Invalid userId");
      }
    },
  });

  return { isPending, isSuccess, isError, isFetching, error, data };
};

export const useRemoveFavouritePlaylist = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = currentUser || {};

  const [notify] = useNotification();

  const queryClient = useQueryClient();

  const { mutate: removeFavouritePlaylist } = useMutation({
    mutationFn: async (params) => {
      const { playlistD, id } = params;
      if (userId) {
        try {
          await fbUpdateDoc({
            data: {
              playlist_ids: arrayRemove(playlistD),
            },
            collection: "favouritePlaylists",
            id,
          });

          notify({
            title: "Success",
            variant: "success",
            description: "Favourite playlist removed",
          });
        } catch (error) {
          notify({
            title: "Error",
            variant: "error",
            description: "An error occurred while deleting",
          });
          // console.log(error)
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listFavouritePlaylists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["favouritePlaylists"],
      });
    },
  });

  return { removeFavouritePlaylist };
};
