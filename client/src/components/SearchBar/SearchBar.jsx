import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/documentsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.documents.search);

  return (
    <input
      type="search"
      placeholder="Search all marketing documents..."
      value={search}
      onChange={e => dispatch(setSearch(e.target.value))}
      className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  );
};
export default SearchBar;
