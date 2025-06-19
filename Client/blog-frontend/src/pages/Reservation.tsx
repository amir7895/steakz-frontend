import React, { useState, useEffect } from 'react';
import './styles/Reservation.css';
import { createReservation, getUsers } from '../services/api'; // Assuming these API functions exist

const Reservation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    specialRequests: '',
    tableNumber: 1, // Default value for tableNumber
  });
  const [users, setUsers] = useState<any[]>([]); // Ensure users is initialized as an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error('Unexpected response format:', usersData);
          setUsers([]); // Fallback to an empty array
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsers([]); // Fallback to an empty array
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reservationData = {
        customerId: 1, // Replace with dynamic user ID if available
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        specialRequests: formData.specialRequests,
        tableNumber: formData.tableNumber, // Include tableNumber in reservation data
      };
      console.log('Submitting reservation data:', reservationData);
      const response = await createReservation(reservationData); // Send data to backend
      console.log('Request payload:', reservationData);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      console.log('Backend response:', response); // Log the full response object
      console.log('Backend response status:', response.status); // Log the status code
      console.log('Backend response data:', response.data); // Log the response data

      if (response.status === 201) {
        console.log('Reservation created successfully:', response.data);
        alert('Reservation submitted successfully!');
      } else {
        console.error('Unexpected response status:', response.status);
        alert('Failed to create reservation. Please try again.');
      }
      
      setFormData({ name: '', email: '', date: '', time: '', guests: 1, specialRequests: '', tableNumber: 1 });
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      console.error('Backend error response:', err.response?.data);
      console.error('Error details (if any):', err.response?.data || err.message);
      alert(`Error: ${err.response?.data?.error || 'Failed to create reservation.'}`);
    }
  };

  return (
    <main className="reservation-main">
      <h1>Make a Reservation</h1>
      <div className="reservation-form">
        <div className="reservation-card">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
        </div>
        <div className="reservation-card">
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <div className="reservation-card">
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
        </div>
        <div className="reservation-card">
          <label>
            Time:
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </label>
        </div>
        <div className="reservation-card">
          <label>
            Number of Guests:
            <select name="guests" value={formData.guests} onChange={handleChange} required>
              {Array.from({ length: 20 }, (_, n) => (
                <option key={n + 1} value={n + 1}>{n + 1}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="reservation-card">
          <label>
            Table Number:
            <input type="number" name="tableNumber" value={formData.tableNumber} onChange={handleChange} required />
          </label>
        </div>
        <div className="reservation-card">
          <label>
            Special Requests:
            <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" className="btn primary" onClick={handleSubmit}>Submit Reservation</button>
      </div>
    </main>
  );
};

export default Reservation;
