import React from 'react';
import './styles/Insights.css';

const Insights: React.FC = () => {
  const insightsData = [
    { id: 1, title: 'Customer Trends', description: 'Understand what your customers love the most.' },
    { id: 2, title: 'Sales Performance', description: 'Track your sales and identify growth opportunities.' },
    { id: 3, title: 'Staff Efficiency', description: 'Analyze staff performance and optimize operations.' },
    { id: 4, title: 'Menu Insights', description: 'Discover which dishes are the most popular.' },
  ];

  return (
    <main className="insights-main">
      <h1>Business Insights</h1>
      <section className="insights-content">
        {insightsData.map(insight => (
          <div key={insight.id} className="insight-card">
            <h2>{insight.title}</h2>
            <p>{insight.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Insights;