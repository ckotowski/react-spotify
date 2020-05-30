import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    images: [],
  },
  fetchUserError: false,
  songId: '',
  songAddedToLibrary: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserSuccess(state, action) {
      state.user = action.payload;
      state.fetchUserError = false;
    },
    fetchUserError(state, action) {
      state.fetchUserError = true;
    },

    addSongToLibrarySuccess(state, action) {
      state.songId = action.payload;
      state.songAddedToLibrary = true;
    },
    addSongToLibraryError(state, action) {
      state.songAddedToLibrary = false;
    },
  },
});

export const {
  fetchUserSuccess,
  fetchUserError,
  addSongToLibrarySuccess,
  addSongToLibraryError,
} = userSlice.actions;
export default userSlice.reducer;

export const fetchUser = (accessToken) => {
  return (dispatch) => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
      }),
    });

    fetch(request)
      .then((res) => {
        // send user back to homepage if no token
        if (res.statusText === 'Unauthorized') {
          window.location.href = './';
        }
        return res.json();
      })
      .then((res) => {
        dispatch(fetchUserSuccess(res));
      })
      .catch((err) => {
        dispatch(fetchUserError(err));
      });
  };
};

export const addSongToLibrary = (accessToken, id) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/me/tracks?ids=${id}`,
      {
        method: 'PUT',
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );

    fetch(request)
      .then((res) => {
        if (res.ok) {
          dispatch(addSongToLibrarySuccess(id));
        }
      })
      .catch((err) => {
        dispatch(addSongToLibraryError(err));
      });
  };
};
