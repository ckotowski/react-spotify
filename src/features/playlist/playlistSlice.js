import { createAction, createSlice } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';

const initialState = {
  playlistMenu: [],
  playlists: [],
  fetchPlaylistPending: false,
  fetchPlaylistError: false,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    fetchPlaylistMenuPending(state, action) {
      state.fetchPlaylistPending = true;
    },
    fetchPlaylistMenuSuccess(state, action) {
      state.playlistMenu = action.payload;
      state.playlists = action.payload;
      state.fetchPlaylistPending = false;
      state.fetchPlaylistError = false;
    },
    fetchPlaylistMenuError(state, action) {
      state.fetchPlaylistPending = false;
      state.fetchPlaylistError = true;
    },
    addPlaylistItem(state, action) {
      state.playlists.push = action.payload;
    },
  },
});

export const fetchPlaylistSongsPending = createAction(
  'FETCH_PLAYLIST_SONGS_PENDING'
);
export const fetchPlaylistSongsSuccess = createAction(
  'FETCH_PLAYLIST_SONGS_SUCCESS'
);
export const fetchPlaylistSongsError = createAction(
  'FETCH_PLAYLIST_SONGS_ERROR'
);

export const {
  fetchPlaylistMenuPending,
  fetchPlaylistMenuSuccess,
  fetchPlaylistMenuError,
  addPlaylistItem,
} = playlistSlice.actions;
export default playlistSlice.reducer;

export const fetchPlaylistsMenu = (userId, accessToken) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );

    dispatch(fetchPlaylistMenuPending());

    fetch(request)
      .then((res) => {
        if (res.statusText === 'Unauthorized') {
          window.location.href = './';
        }
        return res.json();
      })
      .then((res) => {
        dispatch(fetchPlaylistMenuSuccess(res.items));
      })
      .catch((err) => {
        dispatch(fetchPlaylistMenuError(err));
      });
  };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );

    dispatch(fetchPlaylistSongsPending());

    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        //remove duplicate tracks
        res.items = uniqBy(res.items, (item) => {
          return item.track.id;
        });
        console.log('!!! Got playlist songs', res.items);
        dispatch(fetchPlaylistSongsSuccess(res.items));
      })
      .catch((err) => {
        dispatch(fetchPlaylistSongsError(err));
      });
  };
};
