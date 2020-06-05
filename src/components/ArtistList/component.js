import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistSongs } from '../../features/artists/artistSlice';
import { updateHeaderTitle } from '../../features/ui/uiSlice';
import './ArtistList.css';

const ArtistList = () => {
  const { token } = useSelector((state) => state.token);
  const { artists } = useSelector((state) => state.artists);
  const dispatch = useDispatch();

  const renderArtists = () => {
    console.log('artists', artists);
    return artists.map((artist, i) => {
      const artistSongsAction = (artist, token) => {
        dispatch(fetchArtistSongs(artist.id, token));
        dispatch(updateHeaderTitle(artist.name));
      };

      return (
        <li
          onClick={() => {
            console.log('Get songs for artist', artist, token);
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
