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
  const [playlists, setPlaylists] = useState([]);
  const [msgVisibility, setMsgVisibility] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageColor, setMessageColor] = useState('');
  // Track whether button is HIDE or RETRIEVE PLAYLISTS.
  const [retrievalButton, setRetrievalButton] = useState(true);

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
        activateMsg('Playlist saved!', '#228B22');
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
        // Update list of playlists if already open after saving.
        if (playlists.length) {
          retrievePlaylists();
        }
      });
    }
  }

  async function retrievePlaylists() {
    activateMsg('Retrieving playlists...', '#FF8C00');
    const allPlaylists = await Spotify.retrievePlaylists();
    setPlaylists(allPlaylists);
    setTimeout(() => activateMsg('Playlists retrieved.', '#228B22'), 400);
  }

  function deletePlaylist(id) {
    Spotify.deletePlaylist(id);
    activateMsg('Playlist deleted.', '#FF0000');
    setTimeout(() => retrievePlaylists(), 800);
  }

  function search(term) {
    Spotify.search(term).then(searchResults => {
      setSearchResults([...searchResults]);
    });
  }

  function activateMsg(text, color) {
    setMessageText(text);
    setMessageColor(color);
    // Activates the displayMsg prop for 3 seconds.
    setMsgVisibility(true);
    setTimeout(() => {setMsgVisibility(false)}, 3000);
  }

  function toggleButton() {
    setRetrievalButton(!retrievalButton);
    if (retrievalButton) {
      retrievePlaylists();
    } else {
      setPlaylists([]);
    }
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
          <Playlist playlistTracks={playlistTracks} playlistName={playlistName} onRemove={removeTrack} onNameChange={setPlaylistName} onSave={savePlaylist} onRetrieve={toggleButton} playlists={playlists} msgVisibility={msgVisibility} msgText={messageText} msgColor={messageColor} delete={deletePlaylist} retrievalButton={retrievalButton} />
        </div>
      </div>
    </div>
  );
}


export default App;
