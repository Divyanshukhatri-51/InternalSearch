import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../redux/documentsSlice';

const Sidebar = () => {
  const categories = useSelector(state => state.documents.categories);
  const fileTypes = useSelector(state => state.documents.fileTypes);
  const teams = useSelector(state => state.documents.teams);
  const dispatch = useDispatch();

  return (
    <aside className="w-64 bg-white p-6 rounded-2xl shadow mr-6">
      <div className="mb-5">
        <h4 className="font-bold text-gray-700 mb-2">Category</h4>
        {categories?.map(cat => (
          <div
            key={cat.name}
            className="flex items-center justify-between px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
            onClick={() => dispatch(setActiveCategory(cat.name))}
          >
            <span>{cat.name}</span>
            <span className="text-sm bg-gray-200 px-2 rounded">{cat.count}</span>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <h4 className="font-bold text-gray-700 mb-2">File Type</h4>
        {fileTypes?.map(type => (
          <div key={type.name} className="flex items-center justify-between px-2 py-1">
            <span>{type.name}</span>
            <span className="text-sm bg-gray-200 px-2 rounded">{type.count}</span>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <h4 className="font-bold text-gray-700 mb-2">Team</h4>
        {teams?.map(team => (
          <div key={team} className="px-2 py-1">{team}</div>
        ))}
      </div>
      <div>
        <h4 className="font-bold text-gray-700 mb-2">Date Range</h4>
        {/* Add a date picker here if needed */}
      </div>
    </aside>
  );
};
export default Sidebar;
