import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlaylistsMenu,
  fetchPlaylistSongs,
} from '../../actions/playlistActions';
import { updateHeaderTitle } from '../../actions/uiActions';
import './UserPlaylists.css';

const UserPlaylists = (props) => {
  const userId = useSelector((state) =>
    state.userReducer.user ? state.userReducer.user.id : ''
  );
  const playlistMenu = useSelector(
    (state) => state.playlistReducer.playlistMenu
  );
  const token = useSelector((state) =>
    state.tokenReducer.token ? state.tokenReducer.token : ''
  );
  const title = useSelector((state) => state.uiReducer.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== '' && token !== '') {
      dispatch(fetchPlaylistsMenu(userId, token));
    }
  }, [userId]);

  console.log(playlistMenu);

  const renderPlaylists = () => {
    return playlistMenu.map((playlist) => {
      const getPlaylistSongs = () => {
        dispatch(fetchPlaylistSongs(playlist.owner.id, playlist.id, token));
        dispatch(updateHeaderTitle(playlist.name));
      };

      return (
        <li
          onClick={getPlaylistSongs}
          className={
            title === playlist.name ? 'active side-menu-item' : 'side-menu-item'
          }
          key={playlist.id}
        >
          {playlist.name}
        </li>
      );
    });
  };

  return (
    <div className="user-playlist-container">
      <h3 className="user-playlist-header">Playlists</h3>
      {playlistMenu && renderPlaylists()}
    </div>
  );
};

export default UserPlaylists;
