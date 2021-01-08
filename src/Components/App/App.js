import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [successMsg, setSuccessMsg] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  function addTrack(track) {
    // If the track is already on the playlist, do not save.
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      playlistTracks.push(track);
      setPlaylistTracks([...playlistTracks]);
      // Remove track from searchResults after adding it to playlistTracks.
      const index = searchResults.indexOf(track);
      searchResults.splice(index, 1);
      setSearchResults([...searchResults]);
    }
  }

  function removeTrack(track) {
    const index = playlistTracks.indexOf(track);
    playlistTracks.splice(index, 1);
    setPlaylistTracks([...playlistTracks]);
    // Add track back to searchResults if removing from playlistTracks.
    searchResults.unshift(track);
    setSearchResults([...searchResults]);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    if (playlistTracks.length > 0) {
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
        saveMsg();
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
      });
    }
  }

  function retrievePlaylists() {
    const allPlaylists = Spotify.retrievePlaylists();
    setPlaylists(allPlaylists);
  }

  function search(term) {
    Spotify.search(term).then(searchResults => {
      setSearchResults([...searchResults]);
    });
  }

  function saveMsg() {
    // This function should activate the saveMsg prop for 3 seconds.
    setSuccessMsg(true);
    setTimeout(() => {setSuccessMsg(false)}, 3000);
  }

  useEffect(() => {
    // Generate access token before running search to prevent page reset on initial search.
    Spotify.getAccessToken();
  }, []);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistTracks={playlistTracks} playlistName={playlistName} onRemove={removeTrack} onNameChange={setPlaylistName} onSave={savePlaylist} onRetrieve={retrievePlaylists} playlists={playlists} displayMsg={successMsg} />
        </div>
      </div>
    </div>
  );
}


export default App;
