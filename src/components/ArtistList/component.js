import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistSongs } from '../../actions/artistActions';
import { updateHeaderTitle } from '../../features/ui/uiSlice';
import './ArtistList.css';

const ArtistList = () => {
  const token = useSelector((state) => state.tokenReducer.token);
  const artists = useSelector((state) => state.artistsReducer.artists);
  const dispatch = useDispatch();

  const renderArtists = () => {
    return artists.map((artist, i) => {
      const artistSongsAction = (artist, token) => {
        dispatch(fetchArtistSongs(artist.id, token));
        dispatch(updateHeaderTitle(artist.name));
      };

      return (
        <li
          onClick={() => {
            artistSongsAction(artist, token);
          }}
          className="artist-item"
          key={i}
        >
          <a>
            <div>
              <div className="artist-image">
                <img
                  alt="artist"
                  src={artist.images[0] ? artist.images[0].url : ''}
                />
              </div>
              <div className="artist-details">
                <p>{artist.name}</p>
              </div>
            </div>
          </a>
        </li>
      );
    });
  };

  return (
    <ul className="artist-view-container">{artists && renderArtists()}</ul>
  );
};

export default ArtistList;
