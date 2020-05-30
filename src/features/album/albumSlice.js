import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
  fetchAlbumsPending: false,
  fetchAlbumsError: false,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    fetchAlbumsPending(state, action) {
      state.fetchAlbumsPending = true;
    },
    fetchAlbumsSuccess(state, action) {
      state.albums = action.payload;
      state.fetchAlbumsPending = false;
      state.fetchAlbumsError = false;
    },
    fetchAlbumsError(state, action) {
      state.fetchAlbumsPending = false;
      state.fetchAlbumsError = true;
    },
  },
});

export const {
  fetchAlbumsPending,
  fetchAlbumsSuccess,
  fetchAlbumsError,
} = albumSlice.actions;
export default albumSlice.reducer;

export const fetchAlbums = (accessToken) => {
  return (dispatch) => {
    const request = new Request(`https://api.spotify.com/v1/me/albums`, {
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
      }),
    });

    dispatch(fetchAlbumsPending());

    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(fetchAlbumsSuccess(res.items));
      })
      .catch((err) => {
        dispatch(fetchAlbumsError(err));
      });
  };
};
