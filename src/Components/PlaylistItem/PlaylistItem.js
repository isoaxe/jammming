import React from 'react';
import './PlaylistItem.css';


function PlaylistItem(props) {

  return (
    <div className="PlaylistItem">
      <p>{props.name}</p>
    </div>
  );
}


export default PlaylistItem;
