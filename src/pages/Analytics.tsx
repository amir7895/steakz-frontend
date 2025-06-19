import React from 'react';
import './styles/Analytics.css';

const Analytics: React.FC = () => {
  const analyticsData = [
    { metric: 'Customer Satisfaction', value: '85%' },
    { metric: 'Order Accuracy', value: '90%' },
    { metric: 'Revenue Growth', value: '15%' },
    { metric: 'Employee Retention', value: '95%' },
    { metric: 'Inventory Turnover', value: '12%' },
    { metric: 'Website Traffic', value: '120,000 visits/month' },
    { metric: 'Social Media Engagement', value: '10,000 interactions/month' },
  ];

  return (
    <div className="analytics-page">
      <h1>Analytics Overview</h1>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.map((data, index) => (
            <tr key={index} className="analytics-row">
              <td>{data.metric}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;