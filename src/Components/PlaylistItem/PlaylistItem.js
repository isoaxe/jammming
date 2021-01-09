import React from 'react';
import './PlaylistItem.css';


function PlaylistItem(props) {

  function deletePlaylist() {
    props.delete(props.id);
  }

  return (
    <div className="PlaylistItem">
      <p>{props.name}</p>
      <p className="Delete" onClick={deletePlaylist}>X</p>
    </div>
  );
}


export default PlaylistItem;
