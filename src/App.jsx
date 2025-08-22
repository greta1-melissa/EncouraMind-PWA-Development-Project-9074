import React,{useState,useEffect} from 'react';
import {HashRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import {motion} from 'framer-motion';

// Contexts
import {AuthProvider} from './contexts/AuthContext';
import {ThemeProvider} from './contexts/ThemeContext';
import {DataProvider} from './contexts/DataContext';

// Components
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import InstallPrompt from './components/InstallPrompt';
import NotificationManager from './components/NotificationManager';
import Logo from './components/Logo';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

// Main Pages
import Dashboard from './pages/Dashboard';
import DailyEncouragement from './pages/DailyEncouragement';
import WellnessAssessmentPage from './pages/WellnessAssessmentPage';
import Progress from './pages/Progress';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Stories from './pages/Stories';
import Quiz from './pages/Quiz';
import Resources from './pages/Resources';
import Profile from './pages/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminContent from './pages/admin/AdminContent';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Styles
import './App.css';

// Auth Hook
import {useAuth} from './contexts/AuthContext';

// Protected Route Component 
const ProtectedRoute=({children})=> {
  const {user,isLoading}=useAuth();

  if (isLoading) {
    return ( 
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{rotate: 360}} 
          transition={{duration: 1,repeat: Infinity,ease: "linear"}} 
          className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" 
        />
      </div> 
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Admin Protected Route
const AdminRoute=({children})=> {
  const isAdminAuthenticated=localStorage.getItem('adminToken') !==null;
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Auth Route (redirect if already logged in) 
const AuthRoute=({children})=> {
  const {user,isLoading}=useAuth();

  if (isLoading) {
    return ( 
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{rotate: 360}} 
          transition={{duration: 1,repeat: Infinity,ease: "linear"}} 
          className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" 
        />
      </div> 
    );
  }

  return user ? <Navigate to="/" /> : children;
};

// Loading Screen Component
const LoadingScreen=()=> ( 
  <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
    <motion.div 
      className="text-center" 
      initial={{opacity: 0,scale: 0.8}} 
      animate={{opacity: 1,scale: 1}} 
      transition={{duration: 0.6}} 
    >
      <motion.div 
        className="mx-auto mb-6" 
        initial={{rotate: 0}} 
        animate={{rotate: 360}} 
        transition={{duration: 2,repeat: Infinity,ease: "linear"}} 
      >
        <Logo size="xl" className="shadow-2xl" />
      </motion.div>
      <h1 className="text-4xl font-bold text-white mb-2">EncouraMind</h1>
      <p className="text-xl text-blue-100">Encouraging Minds,Enriching Lives</p>
      <div className="mt-8">
        <motion.div 
          className="w-12 h-1 bg-blue-300 mx-auto rounded-full" 
          initial={{width: 0}} 
          animate={{width: 48}} 
          transition={{repeat: Infinity,duration: 1.5,ease: "easeInOut"}} 
        />
      </div>
    </motion.div>
  </div> 
);

function App() {
  const [loading,setLoading]=useState(true);

  // Simulate loading 
  useEffect(()=> {
    const timer=setTimeout(()=> {
      setLoading(false);
    },2000);
    return ()=> clearTimeout(timer);
  },[]);

  // Register service worker for PWA 
  useEffect(()=> {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load',()=> {
        navigator.serviceWorker.register('/sw.js') 
          .then((registration)=> {
            console.log('ServiceWorker registration successful with scope: ',registration.scope);
          },(err)=> {
            console.log('ServiceWorker registration failed: ',err);
          });
      });
    }
  },[]);

  if (loading) {
    return <LoadingScreen />;
  } 

  return ( 
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <div className="App">
              <InstallPrompt />
              <NotificationManager />
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<AuthRoute> <Login /> </AuthRoute>} />
                <Route path="/signup" element={<AuthRoute> <Signup /> </AuthRoute>} />
                <Route path="/forgot-password" element={<AuthRoute> <ForgotPassword /> </AuthRoute>} />

                {/* Main App Routes */}
                <Route path="/" element={<ProtectedRoute> <Layout> <Dashboard /> </Layout> </ProtectedRoute>} />
                <Route path="/daily" element={<ProtectedRoute> <Layout> <DailyEncouragement /> </Layout> </ProtectedRoute>} />
                <Route path="/wellness-assessment" element={<ProtectedRoute> <Layout> <WellnessAssessmentPage /> </Layout> </ProtectedRoute>} />
                <Route path="/progress" element={<ProtectedRoute> <Layout> <Progress /> </Layout> </ProtectedRoute>} />
                <Route path="/goals" element={<ProtectedRoute> <Layout> <Goals /> </Layout> </ProtectedRoute>} />
                <Route path="/journal" element={<ProtectedRoute> <Layout> <Journal /> </Layout> </ProtectedRoute>} />
                <Route path="/stories" element={<ProtectedRoute> <Layout> <Stories /> </Layout> </ProtectedRoute>} />
                <Route path="/quiz" element={<ProtectedRoute> <Layout> <Quiz /> </Layout> </ProtectedRoute>} />
                <Route path="/resources" element={<ProtectedRoute> <Layout> <Resources /> </Layout> </ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute> <Layout> <Profile /> </Layout> </ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute> <AdminLayout> <AdminDashboard /> </AdminLayout> </AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute> <AdminLayout> <AdminUsers /> </AdminLayout> </AdminRoute>} />
                <Route path="/admin/content" element={<AdminRoute> <AdminLayout> <AdminContent /> </AdminLayout> </AdminRoute>} />
                <Route path="/admin/analytics" element={<AdminRoute> <AdminLayout> <AdminAnalytics /> </AdminLayout> </AdminRoute>} />
                <Route path="/admin/settings" element={<AdminRoute> <AdminLayout> <AdminSettings /> </AdminLayout> </AdminRoute>} />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router> 
  );
}

export default App;