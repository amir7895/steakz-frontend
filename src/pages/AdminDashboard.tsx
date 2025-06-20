import React, { useEffect, useState } from "react";
import "./styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import Modal from "../components/common/Modal";
import Toast from "../components/common/Toast"; // Assuming a reusable Toast component exists

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
  seller: string;
  branchId: string; // Added branchId property
}

interface FinancialSummary {
  sales: number;
  expenses: number;
  profit: number;
  revenueGrowth: string;
}

interface Branch {
  id: string;
  name: string;
  location: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  branchId: string;
}

interface Order {
  id: string;
  branchId: string;
  status: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  status: string;
  branchId: string;
}

const AdminDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [financial, setFinancial] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminSettings, setAdminSettings] = useState<{ taxRate: number; info: string }>({ taxRate: 0, info: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Secure access: Redirect if not admin
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
      navigate("/login");
    }

    // Fetch initial data
    Promise.all([
      fetch("/api/inventory").then((res) => res.json()),
      fetch("/api/financial/summary").then((res) => res.json()),
      fetch("/api/users").then((res) => res.json()),
      fetch("/api/branches").then((res) => res.json()),
      fetch("/api/menu").then((res) => res.json()),
      fetch("/api/orders").then((res) => res.json()),
      fetch("/api/settings").then((res) => res.json()),
    ])
      .then(([inv, fin, usersData, branchesData, menuData, ordersData, settingsData]) => {
        setInventory(inv.inventory || []);
        setFinancial(fin.summary || null);
        setUsers(usersData || []);
        setBranches(branchesData || []);
        setMenuItems(menuData || []);
        setOrders(ordersData || []);
        setAdminSettings(settingsData || { taxRate: 0, info: "" });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const exportData = (type: "csv" | "pdf") => {
    const branchParam = selectedBranch === "all" ? "" : `?branchId=${selectedBranch}`;
    fetch(`/api/export${branchParam}&type=${type}`)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, `report.${type}`))
      .catch((error) => console.error("Failed to export data:", error));
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteConfirmation = (entity: string, id: string, deleteCallback: () => void) => {
    openModal(
      <div>
        <p>Are you sure you want to delete this {entity}?</p>
        <button onClick={() => {
          deleteCallback();
          closeModal();
        }}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    );
  };

  const handleDeleteBranch = (branchId: string) => {
    fetch(`/api/branches/${branchId}`, { method: "DELETE" })
      .then(() => showToast("Branch deleted successfully!"))
      .catch(() => showToast("Failed to delete branch."));
  };

  const handleAddUser = () => {
    openModal(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newUser = {
            name: formData.get("name"),
            role: formData.get("role"),
            branchId: formData.get("branchId"),
          };
          fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          })
            .then(() => {
              alert("User added successfully!");
              closeModal();
            })
            .catch((error) => console.error("Failed to add user:", error));
        }}
      >
        <input name="name" placeholder="Name" required />
        <input name="role" placeholder="Role" required />
        <select name="branchId" required>
          <option value="">Select Branch</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
        <button type="submit">Add User</button>
      </form>
    );
  };

  const handleAddBranch = () => {
    openModal(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newBranch = {
            name: formData.get("name"),
            location: formData.get("location"),
          };
          fetch("/api/branches", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBranch),
          })
            .then(() => {
              showToast("Branch added successfully!");
              closeModal();
            })
            .catch(() => showToast("Failed to add branch."));
        }}
      >
        <input name="name" placeholder="Branch Name" required />
        <input name="location" placeholder="Location" required />
        <button type="submit">Add Branch</button>
      </form>
    );
  };

  const handleAddMenuItem = () => {
    openModal(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newMenuItem = {
            name: formData.get("name"),
            price: parseFloat(formData.get("price") as string),
            status: formData.get("status"),
          };
          fetch("/api/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMenuItem),
          })
            .then(() => {
              alert("Menu item added successfully!");
              closeModal();
            })
            .catch((error) => console.error("Failed to add menu item:", error));
        }}
      >
        <input name="name" placeholder="Item Name" required />
        <input name="price" type="number" placeholder="Price" required />
        <input name="status" placeholder="Status" required />
        <button type="submit">Add Menu Item</button>
      </form>
    );
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(e.target.value);
  };

  const filteredInventory = selectedBranch === "all" ? inventory : inventory.filter((item: InventoryItem) => item.branchId === selectedBranch);
  const filteredOrders = selectedBranch === "all" ? orders : orders.filter((order: Order) => order.branchId === selectedBranch);
  const filteredUsers = selectedBranch === "all" ? users : users.filter((user: User) => user.branchId === selectedBranch);
  const filteredMenuItems = selectedBranch === "all" ? menuItems : menuItems.filter((item: MenuItem) => item.branchId === selectedBranch);

  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard</h1>
      <div className="branch-selector">
        <label htmlFor="branch">Currently Managing:</label>
        <select id="branch" value={selectedBranch} onChange={handleBranchChange}>
          <option value="all">All Branches</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </div>
      {loading ? <div className="admin-loading">Loading...</div> : (
        <>
          <section className="admin-section">
            <h2>Branch Overview</h2>
            <div className="admin-branches-list">
              {branches.map((branch) => (
                <div key={branch.id} className="admin-branch-item">
                  <span>{branch.name}</span>
                  <span>Location: {branch.location}</span>
                  <span>Users: {filteredUsers.filter(user => user.branchId === branch.id).length}</span>
                  <span>Orders: {filteredOrders.filter(order => order.branchId === branch.id).length}</span>
                  <button onClick={() => handleDeleteConfirmation("branch", branch.id, () => handleDeleteBranch(branch.id))}>Delete</button>
                </div>
              ))}
            </div>
            <button onClick={handleAddBranch}>Add Branch</button>
          </section>
          <section className="admin-section">
            <h2>Inventory</h2>
            <div className="admin-inventory-list">
              {filteredInventory.length === 0 ? <div>No inventory data.</div> : filteredInventory.map(item => (
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
            <h2>Users</h2>
            <button onClick={handleAddUser}>Add User</button>
            <div className="admin-users-list">
              {filteredUsers.map((user) => (
                <div key={user.id} className="admin-user-item">
                  <span>{user.name}</span>
                  <span>Role: {user.role}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="admin-section">
            <h2>Branches</h2>
            <button onClick={handleAddBranch}>Add Branch</button>
            <div className="admin-branches-list">
              {branches.map((branch) => (
                <div key={branch.id} className="admin-branch-item">
                  <span>{branch.name}</span>
                  <span>Location: {branch.location}</span>
                  <span>Users: {filteredUsers.filter(user => user.branchId === branch.id).length}</span>
                  <span>Orders: {filteredOrders.filter(order => order.branchId === branch.id).length}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="admin-section">
            <h2>Menu Management</h2>
            <button onClick={handleAddMenuItem}>Add Menu Item</button>
            <div className="admin-menu-list">
              {filteredMenuItems.map((item) => (
                <div key={item.id} className="admin-menu-item">
                  <span>{item.name}</span>
                  <span>Price: ${item.price}</span>
                  <span>Status: {item.status}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="admin-section">
            <h2>Orders</h2>
            <div className="admin-orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id} className="admin-order-item">
                  <span>Order ID: {order.id}</span>
                  <span>Branch: {order.branchId}</span> {/* Corrected property reference */}
                  <span>Status: {order.status}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="admin-section">
            <h2>Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch("/api/settings", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(adminSettings),
                })
                  .then(() => alert("Settings updated successfully!"))
                  .catch((error) => console.error("Failed to update settings:", error));
              }}
            >
              <input
                type="number"
                value={adminSettings.taxRate}
                onChange={(e) =>
                  setAdminSettings({ ...adminSettings, taxRate: Number(e.target.value) })
                }
                placeholder="Tax Rate"
              />
              <textarea
                value={adminSettings.info}
                onChange={(e) =>
                  setAdminSettings({ ...adminSettings, info: e.target.value })
                }
                placeholder="Restaurant Info"
              />
              <button type="submit">Update Settings</button>
            </form>
          </section>
          <section className="admin-section">
            <h2>Export Reports</h2>
            <button onClick={() => exportData("csv")}>Export CSV</button>
            <button onClick={() => exportData("pdf")}>Export PDF</button>
          </section>
        </>
      )}
      {showModal && <Modal onClose={closeModal}>{modalContent}</Modal>}
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default AdminDashboard;
