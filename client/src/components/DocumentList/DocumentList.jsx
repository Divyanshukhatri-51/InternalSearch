import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DocumentCard from './DocumentCard';
import { fetchDocuments } from '../../redux/documentsSlice';

const DocumentList = () => {
  const dispatch = useDispatch();
  const { docs, search, activeCategory, activeTab, status } = useSelector(state => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || doc.category === activeCategory;
    const matchesTab = activeTab === 'All' || doc.type === activeTab.toUpperCase();
    return matchesSearch && matchesCategory && matchesTab;
  });

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {filteredDocs.map(doc => <DocumentCard key={doc._id || doc.id} doc={doc} />)}
    </div>
  );
};
export default DocumentList;
