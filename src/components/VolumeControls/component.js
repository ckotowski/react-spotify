import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVolume } from '../../actions/soundActions';
import './VolumeControls.css';

const VolumeControls = () => {
  const volume = useSelector((state) => state.soundReducer.volume);
  const dispatch = useDispatch();

  const onVolumeChange = (e) => {
    dispatch(updateVolume(Math.ceil(e.target.value / 10) * 10));
  };

  return (
    <div className="volume-container">
      <i className="fa fa-volume-up" aria-hidden="true" />
      <input
        className="volume"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={onVolumeChange}
      />
    </div>
  );
};

export default VolumeControls;
