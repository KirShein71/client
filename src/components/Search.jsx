import React from 'react';
import { fetchSearch } from '.././http/productApi';
import debounce from 'lodash.debounce';

const Search = () => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  const fetchSearch = async () => {
    try {
      const response = fetchSearch();
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const clearSearchResults = () => {
    setResults([]);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={fetchSearch}>Поиск</button>
      <button onClick={clearSearchResults}>Очистить</button>
      {/* {displaySearchResults()} */}
    </div>
  );
};

export default Search;
