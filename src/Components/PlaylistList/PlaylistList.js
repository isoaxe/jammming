import React from 'react';
import './PlaylistList.css';
import PlaylistItem from '../PlaylistItem/PlaylistItem.js';


function PlaylistList(props) {
  return (
    <div className="PlaylistList">
      {props.playlists.map(playlist => <PlaylistItem name={playlist.name} id={playlist.id} delete={props.delete} key={playlist.id} />)}
    </div>
  );
}


export default PlaylistList;
