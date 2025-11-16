import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import InsertDocumentPage from './pages/InsertDocumentPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const ProtectedRoute = () => {
  // Check if user token exists in localStorage
  const token = localStorage.getItem('token');
  // If no token, redirect to login page; otherwise, render nested routes
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => (
  <Router>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/insert" element={<InsertDocumentPage />} />
        {/* Add other protected routes here */}
      </Route>

      {/* Redirect any unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;
