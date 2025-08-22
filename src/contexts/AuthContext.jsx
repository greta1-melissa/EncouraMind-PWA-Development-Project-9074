import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

  // Demo users for offline mode
  const demoUsers = [
    {
      id: 'demo-user-1',
      email: 'demo@encouramind.com',
      password: 'Demo123!',
      user_metadata: {
        full_name: 'Demo User'
      }
    },
    {
      id: 'demo-user-2',
      email: 'test@example.com',
      password: 'password123',
      user_metadata: {
        full_name: 'Test User'
      }
    }
  ]

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('currentUser')
    const adminToken = localStorage.getItem('adminToken')
    
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setSession({ user: userData })
    }
    
    if (adminToken) {
      setIsAdminAuthenticated(true)
    }
    
    setIsLoading(false)
  }, [])

  const signup = async (name, email, password) => {
    try {
      setIsLoading(true)
      console.log('Demo signup for:', email)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user already exists
      const existingUser = demoUsers.find(u => u.email === email)
      if (existingUser) {
        return { success: false, error: 'User already exists' }
      }
      
      // Create new demo user
      const newUser = {
        id: `demo-user-${Date.now()}`,
        email,
        user_metadata: {
          full_name: name
        }
      }
      
      // Save to localStorage for persistence
      const savedUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]')
      savedUsers.push({ ...newUser, password })
      localStorage.setItem('demoUsers', JSON.stringify(savedUsers))
      
      // Auto-login after signup
      setUser(newUser)
      setSession({ user: newUser })
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      
      console.log('Demo signup successful:', newUser)
      return { success: true, data: { user: newUser } }
    } catch (error) {
      console.error('Signup exception:', error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      console.log('Demo login attempt for:', email)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check built-in demo users
      let foundUser = demoUsers.find(u => u.email === email && u.password === password)
      
      // If not found, check saved demo users
      if (!foundUser) {
        const savedUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]')
        foundUser = savedUsers.find(u => u.email === email && u.password === password)
      }
      
      if (!foundUser) {
        console.error('Demo login failed: Invalid credentials')
        return { success: false, error: 'Invalid email or password' }
      }
      
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        user_metadata: foundUser.user_metadata
      }
      
      setUser(userData)
      setSession({ user: userData })
      localStorage.setItem('currentUser', JSON.stringify(userData))
      
      console.log('Demo login successful:', userData)
      return { success: true, data: { user: userData } }
    } catch (error) {
      console.error('Login exception:', error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setUser(null)
      setSession(null)
      localStorage.removeItem('currentUser')
      console.log('Demo logout successful')
    } catch (error) {
      console.error('Logout exception:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const adminLogin = async (username, password) => {
    try {
      // Check admin credentials (in production, this should be more secure)
      if (username === 'encouramind' && password === 'admin123') {
        setIsAdminAuthenticated(true)
        localStorage.setItem('adminToken', 'admin-token-456')
        return { success: true }
      }
      return { success: false, error: 'Invalid admin credentials' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const adminLogout = () => {
    setIsAdminAuthenticated(false)
    localStorage.removeItem('adminToken')
  }

  const updateAdminCredentials = async (currentPassword, newUsername, newPassword) => {
    try {
      // In a real app, this would verify current password with backend
      if (currentPassword === 'admin123') {
        // Store new credentials (in production, use secure backend)
        localStorage.setItem('adminUsername', newUsername)
        localStorage.setItem('adminPassword', newPassword) // Should be hashed
        return { success: true }
      }
      return { success: false, error: 'Current password is incorrect' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const resetPassword = async (email) => {
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if user exists
      const allUsers = [...demoUsers, ...JSON.parse(localStorage.getItem('demoUsers') || '[]')]
      const userExists = allUsers.find(u => u.email === email)
      
      if (!userExists) {
        return { success: false, error: 'No account found with that email address' }
      }
      
      console.log('Demo password reset email sent to:', email)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updatePassword = async (newPassword) => {
    try {
      // In demo mode, just simulate success
      console.log('Demo password updated')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    session,
    isAdminAuthenticated,
    isLoading,
    signup,
    login,
    logout,
    adminLogin,
    adminLogout,
    updateAdminCredentials,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}