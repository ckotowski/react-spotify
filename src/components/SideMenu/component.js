import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSongs,
  fetchRecentlyPlayed,
  updateViewType,
} from '../../actions/songActions';
import { fetchAlbums } from '../../actions/albumActions';
import { fetchArtists } from '../../actions/artistActions';
import { fetchFeatured } from '../../actions/browseActions';
import { updateHeaderTitle } from '../../actions/uiActions';
import './SideMenu.css';

const SideMenu = () => {
  const token = useSelector((state) => state.tokenReducer.token);
  const artistIds = useSelector((state) => state.artistsReducer.artistIds);
  const title = useSelector((state) => state.uiReducer.title);
  const dispatch = useDispatch();

  const handleClick = (name) => {
    dispatch(updateHeaderTitle(name));
    dispatch(updateViewType(name));
  };

  const handleBrowseClick = () => {
    dispatch(updateHeaderTitle('Browse'));
    dispatch(updateViewType('Featured'));
    dispatch(fetchFeatured(token));
  };

  const renderSideMenu = () => {
    const menu = [
      {
        name: 'Recently Played',
        action: fetchRecentlyPlayed,
      },
      {
        name: 'Songs',
        action: fetchSongs,
      },
      {
        name: 'Albums',
        action: fetchAlbums,
      },
      {
        name: 'Artists',
        action: fetchArtists,
        getArtists: true,
      },
    ];

    return menu.map((item) => {
      return (
        <li
          key={item.name}
          className={
            title === item.name ? 'active side-menu-item' : 'side-menu-item'
          }
          onClick={() => {
            item.getArtists
              ? item.action(token, artistIds)
              : item.action(token);
            handleClick(item.name);
          }}
        >
          {item.name}
        </li>
      );
    });
  };

  return (
    <ul className="side-menu-container">
      <li
        onClick={handleBrowseClick}
        className={
          title === 'Browse' ? 'active side-menu-item' : 'side-menu-item'
        }
      >
        Browse
      </li>
      <li className="side-menu-item radio">Radio</li>
      <h3 className="user-library-header">Your Library</h3>
      {renderSideMenu()}
    </ul>
  );
};

export default SideMenu;
