import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../components/common/STYLES/Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Steakz</Link>
      </div>
      <div className="navbar-links">
        {user && user.role === 'MANAGER' && (
          <>
            <Link className="navbar-link" to="/inventory">Inventory</Link>
            <Link className="navbar-link" to="/financial">Financial</Link>
            <Link className="navbar-link" to="/staff">Staff</Link>
            <Link className="navbar-link" to="/analytics">Analytics</Link>
            <Link className="navbar-link" to="/feedback">Feedback</Link>
            <Link className="navbar-link" to="/feedbacks">Feedbacks</Link>
          </>
        )}
        {user && user.role === 'ADMIN' && (
          <>
            <Link className="navbar-link" to="/inventory">Inventory</Link>
            <Link className="navbar-link" to="/financial">Financial</Link>
            <Link className="navbar-link" to="/staff">Staff</Link>
            <Link className="navbar-link" to="/analytics">Analytics</Link>
            <Link className="navbar-link" to="/feedback">Feedback</Link>
            <Link className="navbar-link" to="/admin/dashboard">Admin Dashboard</Link>
            <Link className="navbar-link" to="/feedbacks">Feedbacks</Link>
          </>
        )}
        {user && (user.role === 'STAFF' || user.role === 'WRITER') && (
          <>
            <Link className="navbar-link" to="/menu">Menu</Link>
            <Link className="navbar-link" to="/reservation">Reservation</Link>
            <Link className="navbar-link" to="/feedback">Feedback</Link>
            <Link className="navbar-link" to="/about-us">About Us</Link>
          </>
        )}
        {!user && (
          <>
            <Link className="navbar-link" to="/menu">Menu</Link>
            <Link className="navbar-link" to="/reservation">Reservation</Link>
            <Link className="navbar-link" to="/login">Login</Link>
            <Link className="navbar-link" to="/signup">Signup</Link>
            <Link className="navbar-link" to="/">Home</Link>
            <Link className="navbar-link" to="/about-us">About Us</Link>
          </>
        )}
        {user && (
          <>
            <Link className="navbar-link" to="/menu">Menu</Link>
            <Link className="navbar-link" to="/reservation">Reservation</Link>
            <Link className="navbar-link" to="/login">Login</Link>
            <Link className="navbar-link" to="/signup">Signup</Link>
            <Link className="navbar-link" to="/">Home</Link>
            <Link className="navbar-link" to="/about-us">About Us</Link>
            <Link className="navbar-link" to="/insights">Insights</Link>
            <span className="navbar-user">{user.username}</span>
            <button className="navbar-link" onClick={handleLogout}>Logout</button>
          </>
        )}
        <Link className="navbar-link" to="/feedback">Feedback</Link>
      </div>
    </nav>
  );
};

export default Navbar;

// TODO: Students - Enhance the Navbar with the following:
// 1. Add responsive design (e.g., hamburger menu for mobile)
// 2. Add styling for active links using react-router-dom's NavLink
// 3. Add accessibility attributes (e.g., aria-labels)

