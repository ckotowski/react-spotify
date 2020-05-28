import React from 'react';
import { useSelector } from 'react-redux';
import './UserDetails.css';

const UserDetails = () => {
  const displayName = useSelector((state) =>
    state.userReducer.user ? state.userReducer.user.display_name : ''
  );
  const userImage = useSelector((state) =>
    state.userReducer.user && state.userReducer.user.images[0]
      ? state.userReducer.user.images[0].url
      : ''
  );

  return (
    <div className="user-details-container">
      <img alt="user" className="user-image" src={userImage} />
      <p className="user-name">{displayName}</p>
    </div>
  );
};

export default UserDetails;
