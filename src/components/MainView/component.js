import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SongList from '../SongList';
import AlbumList from '../AlbumList';
import ArtistList from '../ArtistList';
import BrowseView from '../BrowseView';
import './MainView.css';

const MainView = ({ audioControl, resumeSong, pauseSong }) => {
  const headerTitle = useSelector((state) => state.ui.title);
  return (
    <div>
      {headerTitle === 'Albums' ? (
        <AlbumList audioControl={audioControl} />
      ) : headerTitle === 'Artists' ? (
        <ArtistList />
      ) : headerTitle === 'Browse' ? (
        <BrowseView />
      ) : (
        //anything else show SongList
        <SongList
          resumeSong={resumeSong}
          pauseSong={pauseSong}
          audioControl={audioControl}
        />
      )}
    </div>
  );
};

MainView.propTypes = {
  audioControl: PropTypes.func,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func,
};

export default MainView;
