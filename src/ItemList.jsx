import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [visibility, setVisibility] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/items', {
        params: {
          per_page: perPage,
          page: page,
          search: search,
          visibility: visibility
        }
      });
      setItems(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, [page, perPage, search, visibility]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        value={visibility}
        onChange={e => setVisibility(e.target.value)}
      >
        <option value="">All</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ItemList;
