import React, { useState, useContext } from "react";
import "./styles/EmployeePortal.css";
import { useAuth } from "../context/AuthContext";

const EmployeePortal: React.FC = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token && data.user) {
        login(data.token, data.user);
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="employee-portal-page">
        <h1>Employee Portal</h1>
        <form className="employee-login-form" onSubmit={handleLogin}>
          <label>
            Username
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          {error && <div className="employee-error">{error}</div>}
          <button type="submit" className="employee-login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // Staff dashboard (simple version)
  return (
    <div className="employee-portal-page">
      <h1>Welcome, {user.username}</h1>
      <div className="employee-dashboard">
        <div className="employee-card">
          <h2>Today's Shifts</h2>
          <p>Check your assigned shifts and attendance.</p>
        </div>
        <div className="employee-card">
          <h2>Order Management</h2>
          <p>View and manage customer orders.</p>
        </div>
        <div className="employee-card">
          <h2>Inventory</h2>
          <p>Monitor and update inventory levels.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;
