import React, { Component, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from './actions/songActions';
import { setToken } from './features/token/tokenSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import UserPlaylists from './components/UserPlaylists';
import MainView from './components/MainView';
import ArtWork from './components/ArtWork';
import MainHeader from './components/MainHeader';
import SideMenu from './components/SideMenu';
import './App.css';

var myAudio;

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      window.location.href =
        'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    } else {
      dispatch(setToken(hashParams.access_token));
      dispatch(fetchUser(hashParams.access_token));
    }

    if (myAudio !== undefined) {
      myAudio.volume = props.volume / 100;
    }
  }, []);

  const pauseSong = () => {
    if (myAudio) {
      props.pauseSong();
      myAudio.pause();
    }
  };

  const resumeSong = () => {
    if (myAudio) {
      props.resumeSong();
      myAudio.play();
    }
  };

  const audioControl = (song) => {
    const { playSong, stopSong } = props;

    if (myAudio === undefined) {
      playSong(song.track);
      myAudio = new Audio(song.track.preview_url);
      myAudio.play();
    } else {
      stopSong();
      myAudio.pause();
      playSong(song.track);
      myAudio = new Audio(song.track.preview_url);
      myAudio.play();
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <div className="left-side-section">
          <SideMenu />
          <UserPlaylists />
          <ArtWork />
        </div>
        <div className="main-section">
          <Header />
          <div className="main-section-container">
            <MainHeader pauseSong={pauseSong} resumeSong={resumeSong} />{' '}
            <MainView
              pauseSong={pauseSong}
              resumeSong={resumeSong}
              audioControl={audioControl}
            />
          </div>
        </div>
        <Footer
          stopSong={stopSong}
          pauseSong={pauseSong}
          resumeSong={resumeSong}
          audioControl={audioControl}
        />
      </div>
    </div>
  );
};

App.propTypes = {
  fetchUser: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  volume: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    volume: state.soundReducer.volume,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      playSong,
      stopSong,
      pauseSong,
      resumeSong,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
