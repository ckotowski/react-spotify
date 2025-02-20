import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlaylistsMenu,
  fetchPlaylistSongs,
} from '../../features/playlist/playlistSlice';
import { updateHeaderTitle } from '../../features/ui/uiSlice';
import './UserPlaylists.css';

const UserPlaylists = () => {
  const userId = useSelector((state) =>
    state.user.user ? state.user.user.id : ''
  );
  const { playlistMenu } = useSelector((state) => state.playlist);
  const { token } = useSelector((state) => state.token);
  const title = useSelector((state) => state.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== '' && token !== '') {
      dispatch(fetchPlaylistsMenu(userId, token));
    }
  }, [userId]);

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
