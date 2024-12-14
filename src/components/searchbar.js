import React, { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDeafualt();
    //  onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <imput type="text" placeholder="Search.." value={searchTerm} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}
