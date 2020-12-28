import React from 'react';
import './SearchBar.css';


function SearchBar(props) {

  function handleTermChange(e) {
    props.onSearch(e.target.value);
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
      <button className="SearchButton">SEARCH</button>
    </div>
  );
}


export default SearchBar;
