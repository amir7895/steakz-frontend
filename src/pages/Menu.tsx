import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api'; // Correct import for createOrder
import './styles/Menu.css';

const menuData = [
	{
		id: 1,
		name: 'Ribeye Steak',
		desc: 'Juicy, marbled, grilled to perfection.',
		price: 32,
		img: '/images/ribeye.jpg',
		best: true,
		new: false,
		category: 'Steaks',
	},
	{
		id: 2,
		name: 'Filet Mignon',
		desc: 'Tender, buttery, melt-in-your-mouth.',
		price: 38,
		img: '/images/filet.jpg',
		best: true,
		new: true,
		category: 'Steaks',
	},
	{
		id: 3,
		name: 'New York Strip',
		desc: 'Classic cut, bold flavor, perfectly seared.',
		price: 29,
		img: '/images/nystrip.jpg',
		best: false,
		new: false,
		category: 'Steaks',
	},
	{
		id: 4,
		name: 'Porterhouse',
		desc: 'A steak lover’s dream: filet & strip in one.',
		price: 44,
		img: '/images/porterhouse.jpg',
		best: false,
		new: true,
		category: 'Steaks',
	},
	{
		id: 5,
		name: 'Steakhouse Burger',
		desc: 'Chargrilled patty, fresh toppings, house sauce.',
		price: 18,
		img: '/images/burger.jpg',
		best: false,
		new: true,
		category: 'Burgers',
	},
	{
		id: 6,
		name: 'Classic Cheeseburger',
		desc: 'Beef patty, cheddar, lettuce, tomato, onion.',
		price: 15,
		img: '/images/cheeseburger.jpg',
		best: false,
		new: false,
		category: 'Burgers',
	},
	{
		id: 7,
		name: 'Grilled Chicken Sandwich',
		desc: 'Juicy chicken breast, lettuce, tomato, aioli.',
		price: 14,
		img: '/images/chicken_sandwich.jpg',
		best: false,
		new: false,
		category: 'Sandwiches',
	},
	{
		id: 8,
		name: 'Caesar Salad',
		desc: 'Crisp romaine, parmesan, house dressing.',
		price: 12,
		img: '/images/salad.jpg',
		best: false,
		new: false,
		category: 'Salads',
	},
	{
		id: 9,
		name: 'Wedge Salad',
		desc: 'Iceberg, blue cheese, bacon, tomato.',
		price: 13,
		img: '/images/wedge_salad.jpg',
		best: false,
		new: true,
		category: 'Salads',
	},
	{
		id: 10,
		name: 'Loaded Fries',
		desc: 'Crispy fries, cheese, bacon, scallions.',
		price: 9,
		img: '/images/loaded_fries.jpg',
		best: true,
		new: false,
		category: 'Starters',
	},
	{
		id: 11,
		name: 'Shrimp Cocktail',
		desc: 'Chilled shrimp, zesty cocktail sauce.',
		price: 16,
		img: '/images/shrimp_cocktail.jpg',
		best: false,
		new: false,
		category: 'Starters',
	},
	{
		id: 12,
		name: 'Mac & Cheese',
		desc: 'Creamy, cheesy, baked golden brown.',
		price: 8,
		img: '/images/mac_cheese.jpg',
		best: false,
		new: false,
		category: 'Sides',
	},
	{
		id: 13,
		name: 'Garlic Mashed Potatoes',
		desc: 'Smooth, buttery, roasted garlic.',
		price: 7,
		img: '/images/mashed_potatoes.jpg',
		best: false,
		new: false,
		category: 'Sides',
	},
	{
		id: 14,
		name: 'Grilled Asparagus',
		desc: 'Charred, lemon, olive oil.',
		price: 8,
		img: '/images/asparagus.jpg',
		best: false,
		new: false,
		category: 'Sides',
	},
	{
		id: 15,
		name: 'Molten Chocolate Cake',
		desc: 'Warm, gooey center, vanilla ice cream.',
		price: 10,
		img: '/images/molten_cake.jpg',
		best: true,
		new: false,
		category: 'Desserts',
	},
	{
		id: 16,
		name: 'Classic Cheesecake',
		desc: 'Rich, creamy, graham crust.',
		price: 9,
		img: '/images/cheesecake.jpg',
		best: false,
		new: true,
		category: 'Desserts',
	},
	{
		id: 17,
		name: 'House Lemonade',
		desc: 'Fresh-squeezed, sweet & tart.',
		price: 4,
		img: '/images/lemonade.jpg',
		best: false,
		new: false,
		category: 'Drinks',
	},
	{
		id: 18,
		name: 'Iced Tea',
		desc: 'Brewed daily, served cold.',
		price: 3,
		img: '/images/iced_tea.jpg',
		best: false,
		new: false,
		category: 'Drinks',
	},
	{
		id: 19,
		name: 'Craft Beer',
		desc: 'Rotating local selection.',
		price: 7,
		img: '/images/beer.jpg',
		best: false,
		new: false,
		category: 'Drinks',
	},
	{
		id: 20,
		name: 'Cabernet Sauvignon',
		desc: 'Full-bodied, dark fruit, oak.',
		price: 12,
		img: '/images/cabernet.jpg',
		best: false,
		new: false,
		category: 'Drinks',
	},
];

const categories = [
	'All',
	...Array.from(new Set(menuData.map(item => item.category))),
];

const Menu: React.FC = () => {
	const [filter, setFilter] = useState('All');
	const [showBest, setShowBest] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);
	const [orderConfirmed, setOrderConfirmed] = useState(false);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setCart(JSON.parse(savedCart)); // Restore cart from localStorage
		}
	}, []);

	const filtered = menuData.filter(item =>
		(filter === 'All' || item.category === filter) &&
		(!showBest || item.best) &&
		(!showNew || item.new)
	);

	const handleAddToCart = (item: typeof menuData[0]) => {
		setCart(prev => {
			const found = prev.find(ci => ci.id === item.id);
			if (found) {
				// If already in cart, increment quantity
				return prev.map(ci => ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci);
			} else {
				// Add new item to cart
				return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
			}
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCart(prev => prev.filter(ci => ci.id !== id));
	};

	const handleQtyChange = (id: number, qty: number) => {
		setCart(prev => prev.map(ci => ci.id === id ? { ...ci, qty: Math.max(1, qty) } : ci));
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

	const handleConfirmOrder = async () => {
		if (!user) {
			localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
			navigate('/login'); // Redirect to login page
			return;
		}

		if (cart.length === 0) {
			alert('Your cart is empty. Please add items before confirming your order.');
			return;
		}

		try {
			// Transform items into a flat array of IDs, repeating each ID by its quantity
			const transformedItems = cart.flatMap(item => Array(item.qty).fill(item.id));

			const orderData = {
				customerId: user.id, // Assuming `user` has an `id` field
				items: transformedItems, // Use the transformed items array
				type: 'Online', // Example order type
				status: 'Pending',
				total: total,
			};

			console.log('Order Payload:', orderData); // Log the payload before sending
			const createdOrder = await createOrder(orderData); // Send the order to the backend
			console.log('Order Created Successfully:', createdOrder); // Log the response

			setOrderConfirmed(true);
			setCart([]);
			setTimeout(() => {
				setOrderConfirmed(false);
				alert('Thank you for your order!'); // Display thank-you message
			}, 3000);
		} catch (err: any) {
			console.error('Error in handleConfirmOrder:', err.response?.data || err.message); // Log the error
			if (err.response?.data?.error) {
				alert(`Failed to confirm order: ${err.response.data.error}`); // Show backend error message
			} else {
				alert('Failed to confirm order. Please try again.');
			}
		}
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(e.target.value);
	};

	const handleShowBestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowBest(e.target.checked);
	};

	const handleShowNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowNew(e.target.checked);
	};

	return (
		<main className="menu-main">
			<h1>Our Menu</h1>
			<div className="menu-filters">
				<select value={filter} onChange={handleFilterChange}>
					{categories.map(cat => <option key={cat}>{cat}</option>)}
				</select>
				<label>
					<input
						type="checkbox"
						id="show-best-checkbox" // Added id attribute
						name="show-best" // Added name attribute
						checked={showBest}
						onChange={handleShowBestChange}
					/>
					Best Sellers
				</label>
				<label>
					<input type="checkbox" checked={showNew} onChange={handleShowNewChange} />
					New Items
				</label>
			</div>
			<div className="menu-list">
				{filtered.map(item => (
					<div
						className={`menu-item${item.best ? ' best-seller' : ''}${item.new ? ' new' : ''}`}
						key={item.id}
						onClick={e => {
							e.stopPropagation();
							handleAddToCart(item);
						}}
						title="Add to cart"
						tabIndex={0}
						role="button"
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') handleAddToCart(item);
						}}
						aria-label={`Add ${item.name} to cart`}
					>
						<h3>{item.name}</h3>
						<p>{item.desc}</p>
						<div className="menu-meta">
							<span className="menu-price">${item.price}</span>
							{item.best && <span className="badge best">Best Seller</span>}
							{item.new && <span className="badge new">New</span>}
						</div>
					</div>
				))}
			</div>
			{/* Cart is now below the menu items, not a modal */}
			<div className="cart-content" style={{margin: '2.5rem auto 0 auto', maxWidth: 540}}>
				<h2>Your Cart</h2>
				{cart.length === 0 ? (
					<div className="cart-empty">Cart is empty.</div>
				) : (
					<ul className="cart-list">
						{cart.map(item => (
							<li key={item.id} className="cart-item">
								<span className="cart-item-name">{item.name}</span>
								<input
									type="number"
									min={1}
									value={item.qty}
									onChange={e => handleQtyChange(item.id, parseInt(e.target.value) || 1)}
									className="cart-qty-input"
								/>
								<span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
								<button className="cart-remove" onClick={() => handleRemoveFromCart(item.id)}>&times;</button>
							</li>
						))}
					</ul>
				)}
				<div className="cart-total">Total: <b>${total.toFixed(2)}</b></div>
				<button className="cart-confirm" onClick={handleConfirmOrder} disabled={cart.length === 0}>Confirm Order</button>
				{orderConfirmed && <div className="cart-success">Order confirmed! Thank you for choosing Steakz.</div>}
			</div>
		</main>
	);
};

export default Menu;
