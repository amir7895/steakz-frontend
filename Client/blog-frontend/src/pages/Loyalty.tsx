import React, { useState } from 'react';
import './styles/Loyalty.css';

const Loyalty: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');

  const rewards = [
    { id: 1, name: 'Free Dessert', points: 100, claimed: true, category: 'Food' },
    { id: 2, name: '10% Off Next Meal', points: 200, claimed: false, category: 'Discount' },
    { id: 3, name: 'VIP Table Reservation', points: 300, claimed: false, category: 'Experience' },
    { id: 4, name: 'Exclusive Steakz Apron', points: 500, claimed: false, category: 'Merchandise' },
  ];

  const categories = ['All', ...Array.from(new Set(rewards.map(r => r.category)))];

  const filteredRewards = rewards.filter(r => filter === 'All' || r.category === filter);

  const handleClaim = (rewardId: number) => {
    setMessage('Reward claimed! Enjoy your perk.');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <main className="loyalty-main">
      <h1>Steakz Loyalty Program</h1>
      <div className="loyalty-filters">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="loyalty-rewards">
        {filteredRewards.map(r => (
          <div
            className={`reward-card${r.claimed ? ' claimed' : ''}`}
            key={r.id}
            onClick={() => handleClaim(r.id)}
            title="Claim reward"
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') handleClaim(r.id);
            }}
            aria-label={`Claim ${r.name}`}
          >
            <h3>{r.name}</h3>
            <p>{r.points} points</p>
            <div className="reward-meta">
              <span className="reward-category">{r.category}</span>
              {r.claimed && <span className="badge claimed">Claimed</span>}
            </div>
          </div>
        ))}
      </div>
      {message && <div className="loyalty-message">{message}</div>}
    </main>
  );
};

export default Loyalty;
