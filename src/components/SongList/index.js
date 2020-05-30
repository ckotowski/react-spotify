import SongList from './component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSongs } from '../../actions/songActions';
import { addSongToLibrary } from '../../features/user/userSlice';

const mapStateToProps = (state) => {
  return {
    token: state.token.token ? state.token.token : '',
    songs: state.songsReducer.songs ? state.songsReducer.songs : '',
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.user.songId || '',
    viewType: state.songsReducer.viewType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchSongs,
      addSongToLibrary,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);
