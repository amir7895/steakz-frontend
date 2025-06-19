import React, { useEffect, useState } from 'react';
import { getReservations, createReservation, updateReservation, deleteReservation } from '../services/api';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [newReservation, setNewReservation] = useState({
    customerId: '',
    date: '',
    time: '',
    guests: 0,
    name: '', // Added name property
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  const handleCreateReservation = async () => {
    try {
      const createdReservation = await createReservation(newReservation);
      setReservations([...reservations, createdReservation]);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to create reservation. Please try again.');
    }
  };

  const handleUpdateReservation = async (id: number) => {
    try {
      const updatedReservation = await updateReservation(id, { status: 'Updated' });
      setReservations(reservations.map(reservation => (reservation.id === id ? updatedReservation : reservation)));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to update reservation. Please try again.');
    }
  };

  const handleDeleteReservation = async (id: number) => {
    try {
      await deleteReservation(id);
      setReservations(reservations.filter(reservation => reservation.id !== id));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to delete reservation. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reservations</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      <div>
        <h2>Create Reservation</h2>
        <input
          type="text"
          placeholder="Customer ID"
          value={newReservation.customerId}
          onChange={(e) => setNewReservation({ ...newReservation, customerId: e.target.value })}
        />
        <input
          type="text"
          id="reservation-name-input" // Added id attribute
          name="reservation-name" // Added name attribute
          placeholder="Name"
          value={newReservation.name}
          onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
        />
        {/* Add more inputs for other fields */}
        <button onClick={handleCreateReservation}>Create Reservation</button>
      </div>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            {reservation.date} - {reservation.time}
            <button onClick={() => handleUpdateReservation(reservation.id)}>Update</button>
            <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
