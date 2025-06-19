import React, { useEffect, useState } from "react";
import "./styles/AdminDashboard.css";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
  seller: string;
}

interface FinancialSummary {
  sales: number;
  expenses: number;
  profit: number;
  revenueGrowth: string;
}

const AdminDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [financial, setFinancial] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/inventory").then(res => res.json()),
      fetch("/api/financial/summary").then(res => res.json())
    ]).then(([inv, fin]) => {
      setInventory(inv.inventory || []);
      setFinancial(fin.summary || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard</h1>
      {loading ? <div className="admin-loading">Loading...</div> : (
        <>
          <section className="admin-section">
            <h2>Inventory</h2>
            <div className="admin-inventory-list">
              {inventory.length === 0 ? <div>No inventory data.</div> : inventory.map(item => (
                <div className="admin-inventory-item" key={item.id}>
                  <span>{item.name}</span>
                  <span className="admin-qty">Qty: {item.quantity}</span>
                  <span>Category: {item.category}</span>
                  <span>Seller: {item.seller}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="admin-section">
            <h2>Financial Summary</h2>
            {financial ? (
              <div className="admin-financial">
                <div>Sales: <span className="admin-sales">${financial.sales.toLocaleString()}</span></div>
                <div>Expenses: <span className="admin-expenses">${financial.expenses.toLocaleString()}</span></div>
                <div>Profit: <span className="admin-profit">${financial.profit.toLocaleString()}</span></div>
                <div>Revenue Growth: <span>{financial.revenueGrowth}</span></div>
              </div>
            ) : <div>No financial data.</div>}
          </section>
          <section className="admin-section">
            <h2>Staff Overview</h2>
            <div className="admin-staff-list">
              <div className="admin-staff-item">
                <span>Name: John Doe</span>
                <span>Role: Manager</span>
                <span>Contact: john.doe@example.com</span>
              </div>
              <div className="admin-staff-item">
                <span>Name: Jane Smith</span>
                <span>Role: Chef</span>
                <span>Contact: jane.smith@example.com</span>
              </div>
              <div className="admin-staff-item">
                <span>Name: Emily Johnson</span>
                <span>Role: Waiter</span>
                <span>Contact: emily.johnson@example.com</span>
              </div>
            </div>
          </section>
          <section className="admin-section">
            <h2>Customer Feedback</h2>
            <div className="admin-feedback-list">
              <div className="admin-feedback-item">
                <span>Customer: Alice</span>
                <span>Rating: 5/5</span>
                <span>Message: Excellent service!</span>
              </div>
              <div className="admin-feedback-item">
                <span>Customer: Bob</span>
                <span>Rating: 4/5</span>
                <span>Message: Great food, but a bit slow.</span>
              </div>
              <div className="admin-feedback-item">
                <span>Customer: Charlie</span>
                <span>Rating: 3/5</span>
                <span>Message: Average experience.</span>
              </div>
            </div>
          </section>
          <section className="admin-section">
            <h2>Add Inventory Item</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newItem = {
                name: formData.get('name'),
                quantity: Number(formData.get('quantity')),
                category: formData.get('category'),
                seller: formData.get('seller'),
              };
              try {
                await fetch('/api/inventory', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newItem),
                });
                alert('Inventory item added successfully!');
              } catch (error) {
                console.error('Failed to add inventory item:', error);
              }
            }}>
              <input name="name" placeholder="Item Name" required />
              <input name="quantity" type="number" placeholder="Quantity" required />
              <input name="category" placeholder="Category" required />
              <input name="seller" placeholder="Seller" required />
              <button type="submit">Add Item</button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
