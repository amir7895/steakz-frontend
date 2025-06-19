import React from 'react';
import './styles/AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <main className="aboutus-main">
      <h1>About Us</h1>
      <section className="aboutus-content">
        <p>
          Welcome to Steakz, where passion for premium steaks meets unforgettable dining experiences.
          Our journey began with a simple mission: to serve the finest cuts of meat, expertly grilled,
          and paired with exceptional service in a warm and inviting atmosphere.
        </p>
        <p>
          At Steakz, we believe in quality, sustainability, and community. We source our ingredients
          responsibly, ensuring every dish is crafted with care and precision. From our signature
          steaks to our fresh sides and decadent desserts, every bite is a celebration of flavor.
        </p>
        <p>
          Whether you're here for a special occasion, a casual meal, or just to indulge, Steakz is
          your destination for culinary excellence. Thank you for choosing us—we look forward to
          serving you.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
