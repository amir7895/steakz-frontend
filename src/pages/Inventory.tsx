import React, { useState } from 'react';
import './styles/Inventory.css';

interface InventoryItem {
  item: string;
  category: string;
  stock: number;
  seller: string;
  phone: string;
  email: string;
}

const Inventory: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>(
    [
      { item: 'Apples', category: 'Fruits', stock: 100, seller: 'Fresh Farms', phone: '123-456-7890', email: 'contact@freshfarms.com' },
      { item: 'Chicken', category: 'Meat', stock: 50, seller: 'Meat Market', phone: '987-654-3210', email: 'info@meatmarket.com' },
      { item: 'Milk', category: 'Dairy', stock: 200, seller: 'Dairy Delight', phone: '555-123-4567', email: 'support@dairydelight.com' },
      { item: 'Bread', category: 'Bakery', stock: 80, seller: 'Bakery Bliss', phone: '444-555-6666', email: 'hello@bakerybliss.com' },
      { item: 'Carrots', category: 'Vegetables', stock: 120, seller: 'Veggie World', phone: '333-444-5555', email: 'sales@veggieworld.com' },
      { item: 'Rice', category: 'Grains', stock: 300, seller: 'Grain Hub', phone: '222-333-4444', email: 'contact@grainhub.com' },
      { item: 'Eggs', category: 'Dairy', stock: 150, seller: 'Eggcellent Farms', phone: '111-222-3333', email: 'info@eggcellentfarms.com' },
      { item: 'Fish', category: 'Seafood', stock: 60, seller: 'Ocean Catch', phone: '999-888-7777', email: 'support@oceancatch.com' },
      { item: 'Tomatoes', category: 'Vegetables', stock: 90, seller: 'Veggie World', phone: '333-444-5555', email: 'sales@veggieworld.com' },
      { item: 'Cheese', category: 'Dairy', stock: 70, seller: 'Dairy Delight', phone: '555-123-4567', email: 'support@dairydelight.com' },
      { item: 'Beef', category: 'Meat', stock: 40, seller: 'Meat Market', phone: '987-654-3210', email: 'info@meatmarket.com' },
      { item: 'Bananas', category: 'Fruits', stock: 110, seller: 'Fresh Farms', phone: '123-456-7890', email: 'contact@freshfarms.com' },
      { item: 'Potatoes', category: 'Vegetables', stock: 130, seller: 'Veggie World', phone: '333-444-5555', email: 'sales@veggieworld.com' },
      { item: 'Pasta', category: 'Grains', stock: 250, seller: 'Grain Hub', phone: '222-333-4444', email: 'contact@grainhub.com' },
      { item: 'Shrimp', category: 'Seafood', stock: 45, seller: 'Ocean Catch', phone: '999-888-7777', email: 'support@oceancatch.com' },
    ]
  );

  const handleFieldChange = (index: number, field: keyof InventoryItem, value: string | number) => {
    const updatedInventory = [...inventoryData];
    updatedInventory[index] = { ...updatedInventory[index], [field]: value };
    setInventoryData(updatedInventory);
  };

  return (
    <div className="inventory-page">
      <h1>Inventory List</h1>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Seller</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((data, index) => (
            <tr key={index} className="inventory-row">
              <td>{data.item}</td>
              <td>{data.category}</td>
              <td>
                <input
                  type="number"
                  value={data.stock}
                  onChange={(e) => handleFieldChange(index, 'stock', Number(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={data.seller}
                  onChange={(e) => handleFieldChange(index, 'seller', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => handleFieldChange(index, 'phone', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => handleFieldChange(index, 'email', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;