import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import UserList from './pages/UserList';
import EmployeePortal from './pages/EmployeePortal';
import AdminDashboard from './pages/AdminDashboard';
import Menu from './pages/Menu';
import Feedback from './pages/Feedback';
import FeedbackList from './pages/FeedbackList';
import Loyalty from './pages/Loyalty';
import Reservation from './pages/Reservation';
import AboutUs from './pages/AboutUs';
import Insights from './pages/Insights';
import Staff from './pages/Staff';
import Financial from './pages/Financial';
import Analytics from './pages/Analytics';
import Inventory from './pages/Inventory';
import ProtectedRoute from './components/common/ProtectedRoute';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<div>My Posts Page</div>} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/employee" element={<EmployeePortal />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route
            path="/feedbacks"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <FeedbackList />
              </ProtectedRoute>
            }
          />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/insights" element={<Insights />} />
          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Staff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/financial"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Financial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Manager']}>
                <Inventory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

// TODO: Students - Complete the routing setup by:
// 1. Implementing the MyPosts page (/my-posts) to show the logged-in user's posts
// 2. Adding protected route logic to restrict access to certain routes based on user role
// 3. Adding a 404 page for invalid routes

