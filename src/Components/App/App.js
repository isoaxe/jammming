import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  function addTrack(track) {
    // If the track is already on the playlist, do not save.
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      playlistTracks.push(track);
      setPlaylistTracks(playlistTracks);
    }
  }

  function removeTrack(track) {
    const index = playlistTracks.indexOf(track);
    playlistTracks.splice(index, 1);
    setPlaylistTracks(playlistTracks);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    })
  }

  function search(term) {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistTracks={playlistTracks} playlistName={playlistName} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
