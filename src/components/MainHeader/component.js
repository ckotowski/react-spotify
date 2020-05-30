import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  fetchNewReleases,
  fetchFeatured,
} from '../../actions/browseActions';
import { updateHeaderTitle } from '../../features/ui/uiSlice';
import { updateViewType } from '../../actions/songActions';
import PropTypes from 'prop-types';
import './MainHeader.css';

const MainHeader = ({ pauseSong, resumeSong }) => {
  const songPaused = useSelector((state) => state.songsReducer.songPaused);
  const headerTitle = useSelector((state) => state.ui.title);
  const viewType = useSelector((state) => state.songsReducer.viewType);
  const playlists = useSelector((state) => state.playlistReducer.playlists);
  const artists = useSelector((state) =>
    state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : []
  );
  const token = useSelector((state) => state.tokenReducer.token);
  const dispatch = useDispatch();

  let currentPlaylist;
  let currentArtist;

  if (viewType === 'playlist') {
    currentPlaylist = playlists.filter((playlist) => {
      return playlist.name === headerTitle;
    })[0];
  }

  if (viewType === 'Artist' && artists.length > 0) {
    currentArtist = artists.filter((artist) => {
      return artist.name === headerTitle;
    })[0];
  }

  return (
    <div className="section-title">
      {viewType === 'playlist' && (
        <div className="playlist-title-container">
          <div className="playlist-image-container">
            <img
              alt="playlist"
              className="playlist-image"
              src={
                currentPlaylist.images[0] ? currentPlaylist.images[0].url : null
              }
            />
          </div>
          <div className="playlist-info-container">
            <p className="playlist-text">PLAYLIST</p>
            <h3 className="header-title">{headerTitle}</h3>
            <p className="created-by">
              Created By:{' '}
              <span className="lighter-text">
                {currentPlaylist.owner.display_name}
              </span>{' '}
              - {currentPlaylist.tracks.total} songs
            </p>
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className="main-pause-play-btn"
            >
              {songPaused ? 'PLAY' : 'PAUSE'}
            </button>
          </div>
        </div>
      )}

      {viewType === 'Artist' && currentArtist && (
        <div>
          <div className="current-artist-header-container">
            <img
              alt="current-artist"
              className="current-artist-image"
              src={currentArtist.images[0].url}
            />
            <div className="current-artist-info">
              <p>Artist from your library</p>
              <h3>{currentArtist.name}</h3>
            </div>
          </div>
          <button
            onClick={!songPaused ? pauseSong : resumeSong}
            className="main-pause-play-btn artist-button"
          >
            {songPaused ? 'PLAY' : 'PAUSE'}
          </button>
        </div>
      )}

      {(headerTitle === 'Songs' ||
        headerTitle === 'Recently Played' ||
        headerTitle === 'Albums' ||
        headerTitle === 'Artists') && (
        <div>
          <h3 className="header-title">{headerTitle}</h3>
          {headerTitle !== 'Artists' && (
            <button
              onClick={!songPaused ? pauseSong : resumeSong}
              className="main-pause-play-btn"
            >
              {songPaused ? 'PLAY' : 'PAUSE'}
            </button>
          )}
        </div>
      )}
      {headerTitle === 'Browse' && (
        <div>
          <h3 className="header-title">{headerTitle}</h3>
          <div className="browse-headers">
            <p
              className={viewType === 'Genres' ? 'active' : ''}
              onClick={() => {
                dispatch(fetchCategories(token));
                dispatch(updateViewType('Genres'));
                dispatch(updateHeaderTitle('Browse'));
              }}
            >
              Genres
            </p>
            <p
              className={viewType === 'New Releases' ? 'active' : ''}
              onClick={() => {
                dispatch(fetchNewReleases(token));
                dispatch(updateViewType('New Releases'));
                dispatch(updateHeaderTitle('Browse'));
              }}
            >
              New Releases
            </p>
            <p
              className={viewType === 'Featured' ? 'active' : ''}
              onClick={() => {
                dispatch(fetchFeatured(token));
                dispatch(updateViewType('Featured'));
                dispatch(updateHeaderTitle('Browse'));
              }}
            >
              Featured
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

MainHeader.propTypes = {
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
};

export default MainHeader;
