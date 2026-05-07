// App.jsx — root component. Sets up routing, the navbar, and toast notifications.
// On mount it checks for an existing Supabase session so users stay logged in on refresh.

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import useAuthStore from './store/authStore';

import Navbar        from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Public pages
import Landing  from './pages/Landing';
import Login    from './pages/Login';
import Signup   from './pages/Signup';
import NotFound from './pages/NotFound';

// Authenticated pages
import Dashboard        from './pages/Dashboard';
import BrowseLobbies    from './pages/BrowseLobbies';
import LobbyDetail      from './pages/LobbyDetail';
import CreateLobby      from './pages/CreateLobby';
import BrowseTournaments from './pages/BrowseTournaments';
import TournamentDetail from './pages/TournamentDetail';
import Leaderboard      from './pages/Leaderboard';
import Profile          from './pages/Profile';
import Wallet           from './pages/Wallet';

const App = () => {
  useEffect(() => {
    // Restore session from localStorage on first load
    useAuthStore.getState().loadUser();

    // Keep state in sync when the user logs in/out in another tab
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        useAuthStore.setState({ user: null, session: null, isAuthenticated: false });
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        useAuthStore.getState().loadUser();
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* Global toast notifications (success / error popups) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#13131a',
            color: '#f4f4f5',
            border: '1px solid #1e1e2e',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#13131a' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#13131a' } },
        }}
      />

      <Routes>
        {/* Public — anyone can visit */}
        <Route path="/"       element={<Landing />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected — redirects to /login if not authenticated */}
        <Route path="/dashboard"       element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/lobbies"         element={<ProtectedRoute><BrowseLobbies /></ProtectedRoute>} />
        <Route path="/lobbies/create"  element={<ProtectedRoute><CreateLobby /></ProtectedRoute>} />
        <Route path="/lobbies/:id"     element={<ProtectedRoute><LobbyDetail /></ProtectedRoute>} />
        <Route path="/tournaments"     element={<ProtectedRoute><BrowseTournaments /></ProtectedRoute>} />
        <Route path="/tournaments/:id" element={<ProtectedRoute><TournamentDetail /></ProtectedRoute>} />
        <Route path="/leaderboard"     element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile"         element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/wallet"          element={<ProtectedRoute><Wallet /></ProtectedRoute>} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
