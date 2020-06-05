import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  artistIds: '',
  artists: [],
  fetchArtistsPending: false,
  fetchArtistsError: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtistIds(state, action) {
      state.artistIds = action.payload;
    },
    fetchArtistsPending(state, action) {
      state.fetchArtistsPending = true;
    },
    fetchArtistsSuccess(state, action) {
      state.artists = action.payload;
      state.fetchArtistsPending = false;
      state.fetchArtistsError = false;
    },
    fetchArtistsError(state, action) {
      state.fetchArtistsPending = false;
      state.fetchArtistsError = true;
    },
  },
});

export const fetchArtistSongsPending = createAction(
  'FETCH_ARTIST_SONGS_PENDING'
);
export const fetchArtistSongsSuccess = createAction(
  'FETCH_ARTIST_SONGS_SUCCESS'
);
export const fetchArtistSongsError = createAction('FETCH_ARTIST_SONGS_ERROR');

export const {
  setArtistIds,
  fetchArtistsPending,
  fetchArtistsSuccess,
  fetchArtistsError,
} = artistsSlice.actions;

export default artistsSlice.reducer;

export const fetchArtists = (accessToken, artistIds) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/artists?ids=${artistIds}`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );

    dispatch(fetchArtistsPending());

    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(fetchArtistsSuccess(res.artists));
      })
      .catch((err) => {
        dispatch(fetchArtistsError(err));
      });
  };
};

export const fetchArtistSongs = (artistId, accessToken) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );

    dispatch(fetchArtistSongsPending());

    fetch(request)
      .then((res) => {
        if (res.statusText === 'Unauthorized') {
          window.location.href = './';
        }
        return res.json();
      })
      .then((res) => {
        // map the response to match that returned from get song request
        res.items = res.tracks.map((item) => {
          return {
            track: item,
          };
        });

        console.log(res);
        dispatch(fetchArtistSongsSuccess(res.items));
      })
      .catch((err) => {
        dispatch(fetchArtistSongsError(err));
      });
  };
};

