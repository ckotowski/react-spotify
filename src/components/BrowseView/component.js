import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlaylistSongs,
  addPlaylistItem,
} from '../../actions/playlistActions';
import { updateHeaderTitle } from '../../features/ui/uiSlice';
import './BrowseView.css';

const BrowseView = () => {
  const { view } = useSelector((state) => state.browse);
  const { viewType } = useSelector((state) => state.songsReducer);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  let browseView;

  if (view) {
    browseView = view.map((item, i) => {
      const getPlaylistSongs = () => {
        dispatch(addPlaylistItem(item));
        dispatch(fetchPlaylistSongs(item.owner.id, item.id, token));
        dispatch(updateHeaderTitle(item.name));
      };

      return (
        <li
          onClick={viewType === 'Featured' ? getPlaylistSongs : null}
          className="category-item"
          key={i}
        >
          <div className="category-image">
            <img
              alt="category"
              src={item.icons ? item.icons[0].url : item.images[0].url}
            />
            {viewType === 'Genres' && (
              <p className="category-name">{item.name}</p>
            )}
          </div>
        </li>
      );
    });
  }

  return <ul className="browse-view-container">{browseView}</ul>;
};

export default BrowseView;
