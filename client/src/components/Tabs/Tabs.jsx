import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../redux/documentsSlice';

const TABS = ['All', 'Documents', 'Images', 'Videos', 'Spreadsheets'];

const Tabs = () => {
  const activeTab = useSelector(state => state.documents.activeTab);
  const dispatch = useDispatch();
  return (
    <div className="flex border-b mb-4">
      {TABS.map(tab => (
        <button
          key={tab}
          onClick={() => dispatch(setActiveTab(tab))}
          className={`px-4 py-2 focus:outline-none border-b-2 -mb-px ${activeTab === tab ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-500'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
export default Tabs;
