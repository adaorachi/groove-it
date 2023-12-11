import { create } from "zustand";

export const useNavScrollTigger = create((set) => ({
  getTrigger: false,
  getIsNavScrollTrigger: (value) => set(() => ({ getTrigger: value })),
}));

export const useAppUtil = create((set) => ({
  theme: {},
  openSwitch: false,
  toggleMenu: false,
  toggleSearch: false,
  toggleGenres: false,
  searchRef: undefined,
  getTheme: (value) => set(() => ({ theme: value })),
  getOpenSwitch: (value) => set(() => ({ openSwitch: value })),
  getToggleMenu: (value) => set(() => ({ toggleMenu: value })),
  getToggleSearch: (value) => set(() => ({ toggleSearch: value })),
  getToggleGenres: (value) => set(() => ({ toggleGenres: value })),
  getSearchRef: (value) => set(() => ({ searchRef: value })),
}));

export const useAppModal = create((set) => ({
  isOpen: false,
  modalContent: null,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false, modalContent: null })),
  getModalContent: (value) => set(() => ({ modalContent: value })),
}));

export const usePlayerStore = create((set) => ({
  tracklist: [],
  playlistId: null,
  playlistType: null,
  trackIndex: 0,
  trackId: null,
  trackType: null,
  currentPlaylistDetails: null,
  isTrackPlaying: false,
  audioLoader: null,
  isLooping: false,
  isShuffle: false,

  getTrackList: (value) =>
    set((state) => {
      const {
        tracklist,
        playlistId,
        playlistType,
        trackIndex,
        trackId,
        trackType,
      } = value || {};

      if (tracklist) state.tracklist = tracklist;
      if (playlistId) state.playlistId = playlistId;
      if (playlistType) state.playlistType = playlistType;
      if (trackIndex) state.trackIndex = trackIndex;
      if (trackId) state.trackId = trackId;
      if (trackType) state.trackType = trackType;
    }),

  getPlaylist: (value) =>
    set((state) => {
      const {
        tracklist,
        playlistId,
        playlistType,
        trackIndex,
        trackId,
        trackType,
      } = value || {};

      if (
        trackIndex?.toString() &&
        state.playlistId === playlistId &&
        state.tracklist.length &&
        state.tracklist.length > trackIndex
      ) {
        return {
          trackIndex: trackIndex,
          trackId: trackId,
          trackType: trackType,
        };
      }

      const index = trackIndex || 0;

      if (
        tracklist?.length &&
        playlistId &&
        playlistType &&
        state.playlistId !== playlistId
      ) {
        return {
          tracklist: tracklist,
          playlistId: playlistId,
          playlistType: playlistType,
          trackIndex: index,
          trackId: tracklist[index].id,
          trackType: tracklist[index].type,
        };
      }
    }),

  getCurrentPlaylist: (value) => set(() => ({ currentPlaylistDetails: value })),

  updateTrackIndex: (value) => set(() => ({ trackIndex: value })),

  getIsTrackPlaying: (value) => set(() => ({ isTrackPlaying: value })),

  getNextTrack: () =>
    set((state) => {
      const { tracklist, trackIndex } = state;
      const isLastSTrack = tracklist.length - 1 <= trackIndex;

      if (isLastSTrack) {
        return {
          trackIndex: 0,
          trackId: tracklist[0].id,
        };
      }

      return {
        trackIndex: trackIndex + 1,
        trackId: tracklist[trackIndex + 1].id,
      };
    }),

  getPrevTrack: () =>
    set((state) => {
      const { tracklist, trackIndex } = state;

      if (trackIndex <= 0) {
        const index = tracklist.length - 1;

        return {
          trackIndex: index,
          trackId: tracklist[index].id,
        };
      }

      return {
        trackIndex: trackIndex - 1,
        trackId: tracklist[trackIndex - 1].id,
      };
    }),

  setOnAudioEnd: () =>
    set((state) => {
      const { tracklist, trackIndex, isLooping } = state;
      const isLastSTrack = tracklist.length - 1 <= trackIndex;

      if (isLooping) {
        return {
          trackIndex: trackIndex,
          trackId: tracklist[trackIndex].id,
        };
      }
      if (isLastSTrack) {
        return {
          trackIndex: 0,
          trackId: tracklist[0].id,
        };
      }

      return {
        trackIndex: trackIndex + 1,
        trackId: tracklist[trackIndex + 1].id,
      };
    }),

  setIsLooping: () => set((state) => ({ isLooping: !state.isLooping })),

  setIsShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
}));

export const useCurrentUser = create((set) => ({
  currentUser: null,
  userProfile: null,
  getCurrentUser: (value) => set(() => ({ currentUser: value })),
  getUserProfile: (value) => set(() => ({ userProfile: value })),
}));
