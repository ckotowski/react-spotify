import React from 'react';
import { useSelector } from 'react-redux';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import './AlbumList.css';

const AlbumList = ({ audioControl }) => {
  const songs = useSelector((state) =>
    state.songsReducer.songs
      ? uniqBy(state.songsReducer.songs, (item) => item.track.album.name)
      : ''
  );

  const renderAlbums = () => {
    return songs.map((song, i) => {
      return (
        <li
          onClick={() => {
            audioControl(song);
          }}
          className="album-item"
          key={i}
        >
          <div>
            <div className="album-image">
              <img alt="album" src={song.track.album.images[0].url} />
              <div className="play-song">
                <i
                  className="fa fa-play-circle-o play-btn"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="album-details">
              <p className="album-name">{song.track.album.name}</p>
              <p className="artist-name">{song.track.album.artists[0].name}</p>
            </div>
          </div>
        </li>
      );
    });
  };

  return <ul className="album-view-container">{renderAlbums()}</ul>;
};

AlbumList.propTypes = {
  audioControl: PropTypes.func,
};

export default AlbumList;
