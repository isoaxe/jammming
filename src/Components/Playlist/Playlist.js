import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js'


function Playlist(props) {

  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} onChange={props.onNameChange} />
      <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}  />
      <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}


export default Playlist;
