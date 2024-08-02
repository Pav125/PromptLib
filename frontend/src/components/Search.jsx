import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Trigger search on input change
  };

  return (
    <input
      className='w-6/12 p-2 px-6 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 shadow-lg flex align-middle justify-center'
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search for a tag ..."
    />
  );
};

export default Search;
