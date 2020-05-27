import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSongs } from '../../actions/songActions';
import './TrackSearch.css';

const TrackSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector((state) => state.tokenReducer.token);
  const dispatch = useDispatch();

  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="track-search-container">
      <form
        onSubmit={() => {
          dispatch(searchSongs(searchTerm, token));
        }}
      >
        <input
          onChange={updateSearchTerm}
          type="text"
          placeholder="Search..."
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(searchSongs(searchTerm, token));
          }}
        >
          <i className="fa fa-search search" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};

export default TrackSearch;
