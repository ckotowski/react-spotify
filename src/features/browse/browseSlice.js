import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: [],
  fetchCategoriesError: false,
  fetchNewReleasesError: false,
  fetchFeaturedError: false,
};

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {
    fetchCategoriesSuccess(state, action) {
      state.view = action.payload.items;
      state.fetchCategoriesError = false;
    },
    fetchCategoriesError(state, action) {
      state.fetchCategoriesError = true;
    },
    fetchNewReleasesSuccess(state, action) {
      state.view = action.payload.items;
      state.fetchNewReleasesError = false;
    },
    fetchNewReleasesError(state, action) {
      state.fetchNewReleasesError = true;
    },
    fetchFeaturedSuccess(state, action) {
      console.log(action);
      state.view = action.payload.items;
      state.fetchFeaturedError = false;
    },
    fetchFeaturedError(state, action) {
      state.fetchFeaturedError = true;
    },
  },
});

export const {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  fetchNewReleasesSuccess,
  fetchNewReleasesError,
  fetchFeaturedSuccess,
  fetchFeaturedError,
} = browseSlice.actions;
export default browseSlice.reducer;

export const fetchCategories = (accessToken) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/browse/categories`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );
    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(fetchCategoriesSuccess(res.categories));
      })
      .catch((err) => {
        dispatch(fetchCategoriesError(err));
      });
  };
};

export const fetchNewReleases = (accessToken) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/browse/new-releases`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );
    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(fetchNewReleasesSuccess(res.albums));
      })
      .catch((err) => {
        dispatch(fetchNewReleasesError(err));
      });
  };
};

export const fetchFeatured = (accessToken) => {
  return (dispatch) => {
    const request = new Request(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
      }
    );
    fetch(request)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(fetchFeaturedSuccess(res.playlists));
      })
      .catch((err) => {
        dispatch(fetchFeaturedError(err));
      });
  };
};
