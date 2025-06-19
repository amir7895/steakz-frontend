import React, { useEffect, useState } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../services/api';
import axios from 'axios';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState<{ customerId: string; items: number[]; type: string; status: string; total: number }>(
    { customerId: '', items: [], type: '', status: '', total: 0 }
  );
  const [error, setError] = useState<string | null>(null);
  const [availableItems, setAvailableItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/items'); // Replace with your actual endpoint
        setAvailableItems(response.data);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };
    fetchItems();
  }, []);

  const handleCreateOrder = async () => {
    console.log('Create Order button clicked'); // Log to confirm button click
    try {
      if (!newOrder.customerId || newOrder.items.length === 0 || !newOrder.type || !newOrder.status || newOrder.total <= 0) {
        setError('Please fill in all fields before creating an order.');
        return;
      }
      console.log('Order Payload:', newOrder); // Log the payload before sending
      const createdOrder = await createOrder(newOrder);
      console.log('Order Created Successfully:', createdOrder); // Log the response
      setOrders([...orders, createdOrder]);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error('Error in handleCreateOrder:', err.response?.data || err.message); // Log the error
      setError(err.response?.data?.error || 'Failed to create order. Please try again.');
    }
  };

  const handleUpdateOrder = async (id: number) => {
    try {
      const updatedOrder = await updateOrder(id, { status: 'Updated' });
      setOrders(orders.map(order => (order.id === id ? updatedOrder : order)));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to update order. Please try again.');
    }
  };

  const handleDeleteOrder = async (id: number) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter(order => order.id !== id));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to delete order. Please try again.');
    }
  };

  const createTestOrder = async () => {
    try {
      console.log('Sending hardcoded test order...');
      const response = await axios.post('http://localhost:3001/orders', {
        customerId: 1,
        items: [1, 2], // Hardcoded valid MenuItem IDs
        total: 100,
        type: 'Dine-In',
        status: 'Pending',
      });
      console.log('Test Order Created:', response.data);
      alert('Test order created successfully!');
    } catch (err: any) {
      console.error('Error creating test order:', err.response?.data || err.message);
      alert('Failed to create test order.');
    }
  };

  const handleAddItemToOrder = (itemId: number) => {
    setNewOrder({ ...newOrder, items: [...newOrder.items, itemId] });
  };

  return (
    <div>
      <h1>Orders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      <div>
        <h2>Create Order</h2>
        <input
          type="text"
          id="customer-id-input" // Added id attribute
          name="customer-id" // Added name attribute
          placeholder="Customer ID"
          value={newOrder.customerId}
          onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
        />
        {/* Add more inputs for other fields */}
        <button onClick={() => { console.log('Button clicked'); handleCreateOrder(); }}>
          Create Order
        </button>
      </div>
      <button onClick={createTestOrder}>Create Test Order</button>
      <div>
        <h2>Add Items to Order</h2>
        <select
          onChange={(e) => {
            const itemId = parseInt(e.target.value, 10);
            if (!isNaN(itemId)) {
              handleAddItemToOrder(itemId);
            }
          }}
        >
          <option value="">Select an Item</option>
          {availableItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} (ID: {item.id})
            </option>
          ))}
        </select>
        <p>Items in Order: {newOrder.items.join(', ')}</p>
      </div>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.type} - {order.status}
            <button onClick={() => handleUpdateOrder(order.id)}>Update</button>
            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
