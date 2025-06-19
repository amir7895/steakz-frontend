import React, { useState, useContext } from 'react';
import './styles/Staff.css';
import { useAuth } from '../context/AuthContext';

interface StaffDetails {
  name: string;
  role: string;
  contact: string;
  hoursWorked: number;
  schedule: string;
}

const Staff: React.FC = () => {
  const { user } = useAuth();

  const [staffData, setStaffData] = useState<StaffDetails[]>(
    [
      { name: 'John Doe', role: 'Manager', contact: 'john.doe@example.com', hoursWorked: 40, schedule: 'Mon-Fri, 9 AM - 5 PM' },
      { name: 'Jane Smith', role: 'Chef', contact: 'jane.smith@example.com', hoursWorked: 45, schedule: 'Tue-Sat, 10 AM - 6 PM' },
      { name: 'Emily Johnson', role: 'Waiter', contact: 'emily.johnson@example.com', hoursWorked: 30, schedule: 'Wed-Sun, 4 PM - 10 PM' },
      { name: 'Michael Brown', role: 'Bartender', contact: 'michael.brown@example.com', hoursWorked: 35, schedule: 'Thu-Mon, 6 PM - 12 AM' },
      { name: 'Sarah Davis', role: 'Hostess', contact: 'sarah.davis@example.com', hoursWorked: 25, schedule: 'Fri-Sun, 5 PM - 10 PM' },
      { name: 'Chris Wilson', role: 'Dishwasher', contact: 'chris.wilson@example.com', hoursWorked: 20, schedule: 'Sat-Sun, 8 AM - 2 PM' },
      { name: 'Anna Taylor', role: 'Sous Chef', contact: 'anna.taylor@example.com', hoursWorked: 40, schedule: 'Mon-Fri, 11 AM - 7 PM' },
      { name: 'David Lee', role: 'Delivery Driver', contact: 'david.lee@example.com', hoursWorked: 30, schedule: 'Tue-Sat, 2 PM - 8 PM' },
    ]
  );

  const handleFieldChange = (index: number, field: keyof StaffDetails, value: string | number) => {
    const updatedStaff = [...staffData];
    updatedStaff[index] = { ...updatedStaff[index], [field]: value };
    setStaffData(updatedStaff);
  };

  return (
    <div className="staff-page">
      <h1>Staff Details</h1>
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Hours Worked</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff, index) => (
            <tr key={index} className="staff-row">
              <td>{staff.name}</td>
              <td>
                {user?.role === 'ADMIN' ? (
                  <select
                    value={staff.role}
                    onChange={(e) => handleFieldChange(index, 'role', e.target.value)}
                  >
                    <option value="Manager">Manager</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Bartender">Bartender</option>
                    <option value="Hostess">Hostess</option>
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="Sous Chef">Sous Chef</option>
                    <option value="Delivery Driver">Delivery Driver</option>
                  </select>
                ) : (
                  <span>{staff.role}</span>
                )}
              </td>
              <td>
                <input
                  type="text"
                  value={staff.contact}
                  onChange={(e) => handleFieldChange(index, 'contact', e.target.value)}
                  disabled={user?.role !== 'ADMIN'}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={staff.hoursWorked}
                  onChange={(e) => handleFieldChange(index, 'hoursWorked', Number(e.target.value))}
                  disabled={user?.role !== 'ADMIN'}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={staff.schedule}
                  onChange={(e) => handleFieldChange(index, 'schedule', e.target.value)}
                  disabled={user?.role !== 'ADMIN'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;