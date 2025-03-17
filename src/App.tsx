// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './components/Dashboard';
import { SharedLayout } from './components/layout/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customize"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          />
          {/* Keep these routes for backward compatibility, but redirect to the new shared layout */}
          <Route path="/signincustomize" element={<Navigate to="/customize" replace />} />
          <Route path="/signupcustomize" element={<Navigate to="/customize" replace />} />
          <Route path="/forgetpwcustomize" element={<Navigate to="/customize" replace />} />
          <Route path="/checkincustomize" element={<Navigate to="/customize" replace />} />
          <Route path="/" element={<Navigate to="/customize" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;