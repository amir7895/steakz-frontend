import React from 'react';
import './styles/Financial.css';

const Financial: React.FC = () => {
  const financialData = [
    { quarter: 'Q1', revenue: '$50,000', expenses: '$30,000', profit: '$20,000' },
    { quarter: 'Q2', revenue: '$60,000', expenses: '$35,000', profit: '$25,000' },
    { quarter: 'Q3', revenue: '$70,000', expenses: '$40,000', profit: '$30,000' },
    { quarter: 'Q4', revenue: '$80,000', expenses: '$45,000', profit: '$35,000' },
    { quarter: 'Annual Total', revenue: '$260,000', expenses: '$150,000', profit: '$110,000' },
    { quarter: 'Projected Q1 Next Year', revenue: '$55,000', expenses: '$32,000', profit: '$23,000' },
  ];

  return (
    <div className="financial-page">
      <h1>Financial Summary</h1>
      <table className="financial-table">
        <thead>
          <tr>
            <th>Quarter</th>
            <th>Revenue</th>
            <th>Expenses</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((data, index) => (
            <tr key={index} className="financial-row">
              <td>{data.quarter}</td>
              <td>{data.revenue}</td>
              <td>{data.expenses}</td>
              <td>{data.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Financial;