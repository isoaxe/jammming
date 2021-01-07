import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';


function Playlist(props) {

  function handleNameChange(e) {
    props.onNameChange(e.target.value);
  }

  function displayMessage() {
    if (props.displayMsg) {
      document.getElementById("Message").style.visibility = "visible";
    } else {
      document.getElementById("Message").style.visibility = "hidden";
    }
  }

  setTimeout(() => {displayMessage()});

  return (
    <div className="Playlist">
      <input value={props.playlistName} onChange={handleNameChange} />
      <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
      <p id="Message">Playlist saved!</p>
    </div>
  );
}


export default Playlist;
