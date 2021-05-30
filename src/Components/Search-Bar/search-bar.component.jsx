import React from 'react';

import './search-bar.styles.css';


const SearchBar = ({ placeholder, handleChange, searchQuery, searchTagbar }) => (
    <input
        className={
            `${searchTagbar ? 'search-Tagbar' : ''}
            search-bar` }
        type='search'
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange} />
);

export default SearchBar;