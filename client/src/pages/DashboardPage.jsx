import Sidebar from '../components/Layout/SideBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Tabs from '../components/Tabs/Tabs';
import DocumentList from '../components/DocumentList/DocumentList';
import { Link, useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDocuments } from '../redux/documentsSlice';

const DashboardPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
  <div className="min-h-screen bg-blue-50 flex flex-col">
    {/* <header className="">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header> */}
    <div className="max-w-7xl mx-auto py-12 px-4 flex gap-6">
      
      <Sidebar />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <SearchBar />
          <Link
            to="/insert"
            className="ml-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
          >
            + Add Document
          </Link>
        </div>
        <Tabs />
        <DocumentList />
         <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
  )
};

export default DashboardPage;
