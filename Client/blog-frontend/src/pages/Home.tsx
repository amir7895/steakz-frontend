import React from 'react';
import './styles/Home.css';

const Home: React.FC = () => (
  <main className="home-main">
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Steakz</h1>
        <p className="subtitle">Premium Steaks & Unforgettable Dining</p>
        <div className="hero-cta">
          <a href="/menu" className="btn secondary">View Menu</a>
          <a href="/login" className="btn secondary">Login</a>
        </div>
      </div>
    </section>
    <section className="intro">
      <h2>About Steakz</h2>
      <p>
        Steakz is your destination for the finest cuts, expertly grilled and served in a warm, inviting atmosphere.
        Enjoy our best-selling steaks, fresh sides, and signature sauces. Dine in, take away, or order online!
      </p>
    </section>
    <section className="highlights">
      <h2>Popular Dishes</h2>
      <div className="highlight-list">
        <div className="highlight-card">
          <h3>Ribeye Steak</h3>
          <p>Juicy, marbled, and grilled to perfection.</p>
        </div>
        <div className="highlight-card">
          <h3>Filet Mignon</h3>
          <p>Tender, buttery, and melt-in-your-mouth.</p>
        </div>
        <div className="highlight-card">
          <h3>Steakhouse Burger</h3>
          <p>Chargrilled patty, fresh toppings, house sauce.</p>
        </div>
      </div>
    </section>
  </main>
);

export default Home;

