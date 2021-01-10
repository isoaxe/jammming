import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';
import PlaylistList from '../PlaylistList/PlaylistList.js';


function Playlist(props) {

  function handleNameChange(e) {
    props.onNameChange(e.target.value);
  }

  function message(text, color) {
    setTimeout(() => document.getElementById("Message").style.color = color);
    return <p id="Message">{text}</p>
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
      <button className="Playlist-button" onClick={props.onSave}>SAVE TO SPOTIFY</button>
      {message('Playlist saved!', '#228B22')}
      <button className="Playlist-button" onClick={props.onRetrieve}>RETRIEVE PLAYLISTS</button>
      <PlaylistList playlists={props.playlists} delete={props.delete} />
    </div>
  );
}


export default Playlist;
