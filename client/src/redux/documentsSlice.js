import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async thunk for MongoDB API (update endpoint as needed)
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    const res = await fetch('http://localhost:5000/api/documents');
    return res.json();
  }
);

export const insertDocument = createAsyncThunk(
  'documents/insertDocument',
  async (doc) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Append all fields except file
    for (const [key, value] of Object.entries(doc)) {
      if (key !== 'file') {
        if (Array.isArray(value)) {
          formData.append(key, value.join(','));
        } else {
          formData.append(key, value);
        }
      }
    }
    // Attach file if present
    if (doc.file) formData.append('file', doc.file);

     const response = await fetch('http://localhost:5000/api/documents', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return response.json();
  }
);

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    docs: [],
    categories: [],
    fileTypes: [],
    teams: [],
    search: '',
    activeTab: 'All',
    activeCategory: null,
    status: 'idle',
  },
  reducers: {
    setSearch(state, action) { state.search = action.payload; },
    setActiveTab(state, action) { state.activeTab = action.payload; },
    setActiveCategory(state, action) { state.activeCategory = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.docs = action.payload.documents;
        state.categories = action.payload.categories;
        state.fileTypes = action.payload.fileTypes;
        state.teams = action.payload.teams;
      })
      .addCase(insertDocument.fulfilled, (state, action) => {
      state.docs.push(action.payload); // Add new doc optimistically
    });
  }
});

export const { setSearch, setActiveTab, setActiveCategory } = documentsSlice.actions;
export default documentsSlice.reducer;
// export { fetchDocuments };
