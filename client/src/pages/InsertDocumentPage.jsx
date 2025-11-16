import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { insertDocument } from '../redux/documentsSlice';
import { useNavigate } from 'react-router-dom';

const categories = ['Q3 Campaign', 'Brand Guidelines', 'Sales Enablement', 'Product Launch'];
const fileTypes = ['DOCX', 'JPEG', 'PDF', 'PNG'];
const teams = ['Creative', 'Product Marketing', 'Sales Support'];

const InsertDocumentPage = () => {
  const [form, setForm] = useState({
    title: '',
    desc: '',
    type: fileTypes[0],
    tag: '',
    category: categories[0],
    formats: '',
    team: teams[0],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      formats: form.formats.split(',').map(f => f.trim()),
    };
    await dispatch(insertDocument(payload));
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl mb-6 font-bold">Insert New Document</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="desc"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <select
            name="type"
            className="flex-1 p-3 border border-gray-300 rounded"
            value={form.type}
            onChange={handleChange}
          >
            {fileTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          <input
            name="tag"
            className="flex-1 p-3 border border-gray-300 rounded"
            placeholder="Tag"
            value={form.tag}
            onChange={handleChange}
          />
        </div>
        <select
          name="category"
          className="w-full p-3 border border-gray-300 rounded"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <input
          name="formats"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Formats (comma separated)"
          value={form.formats}
          onChange={handleChange}
        />
        <select
          name="team"
          className="w-full p-3 border border-gray-300 rounded"
          value={form.team}
          onChange={handleChange}
        >
          {teams.map(t => <option key={t}>{t}</option>)}
        </select>
        <input type="file" name="file" className="w-full p-3 border rounded" onChange={handleFileChange} />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700">
          Add Document
        </button>
      </form>
    </div>
  );
};

export default InsertDocumentPage;
