import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Staff {
  id: string;
  name: string;
  role: string;
}

const ManageRoles = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch staff list from the API
    const fetchStaff = async () => {
      try {
        // Your API call logic here
      } catch (err) {
        setError('Failed to fetch staff list');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div>
      <h1>Manage Roles</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {staffList.map((staff) => (
          <li key={staff.id}>
            {staff.name} - {staff.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoles;
