import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth tokens
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    
    if (userToken) {
      setUser({ id: 1, name: 'User', email: 'user@encouramind.com' });
    }
    
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      if (email && password) {
        const userData = { id: 1, name: 'User', email };
        setUser(userData);
        localStorage.setItem('userToken', 'user-token-123');
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const adminLogin = async (username, password) => {
    try {
      // Check admin credentials
      if (username === 'encouramind' && password === 'admin123') {
        setIsAdminAuthenticated(true);
        localStorage.setItem('adminToken', 'admin-token-456');
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  const updateAdminCredentials = async (currentPassword, newUsername, newPassword) => {
    try {
      // In a real app, this would verify current password with backend
      if (currentPassword === 'admin123') {
        // Store new credentials (in production, use secure backend)
        localStorage.setItem('adminUsername', newUsername);
        localStorage.setItem('adminPassword', newPassword); // Should be hashed
        return { success: true };
      }
      return { success: false, error: 'Current password is incorrect' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAdminAuthenticated,
    isLoading,
    login,
    logout,
    adminLogin,
    adminLogout,
    updateAdminCredentials
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};