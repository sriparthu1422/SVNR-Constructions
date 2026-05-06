import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (API_BASE.endsWith('/')) API_BASE = API_BASE.slice(0, -1);
if (!API_BASE.endsWith('/api')) API_BASE += '/api';
const API_URL = API_BASE;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('svnr_admin_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    if (token) {
      fetchAdmin();

      // Automatically log out when the token expires
      try {
        const payloadBase64 = token.split('.')[1];
        if (payloadBase64) {
          const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
          const payload = JSON.parse(payloadJson);
          if (payload.exp) {
            const timeToExpiry = payload.exp * 1000 - Date.now();
            if (timeToExpiry > 0) {
              timeoutId = setTimeout(() => {
                logout();
              }, timeToExpiry);
            } else {
              logout();
            }
          }
        }
      } catch (err) {
        console.error('Failed to parse token for expiration checking', err);
      }
    } else {
      setLoading(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token]);

  const fetchAdmin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem('svnr_admin_token', data.token);
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('svnr_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
