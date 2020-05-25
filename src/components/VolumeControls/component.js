import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './VolumeControls.css';

const VolumeControls = (props) => {
  const [volume, setVolume] = useState(props.volume);
  useEffect(() => {
    console.log('volume', volume);
  });

  const updateVolume = (e) => {
    setVolume(e.target.value);
    props.updateVolume(Math.ceil(e.target.value / 10) * 10);
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
        onChange={updateVolume}
      />
    </div>
  );
};

VolumeControls.propTypes = {
  volume: PropTypes.number,
  updateVolume: PropTypes.func,
};

export default VolumeControls;
