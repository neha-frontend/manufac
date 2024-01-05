import React from 'react';

interface FlavanoidsStatsProps {
    classWiseFlavanoidsStats: Record<string, number[]>;
  }

const FlavanoidsStats: React.FC<FlavanoidsStatsProps> = ({classWiseFlavanoidsStats }) => {
  return (
    <div>
      <h2>Flavanoids Statistics</h2>
      <div style={{overflowX:"auto"}}>
      <table>
            <thead>
              <tr>
                <th>Measure</th>
                {Object.keys(classWiseFlavanoidsStats).map((className) => (
                  <th key={className}>{className}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flavanoids Mean</td>
                {Object.values(classWiseFlavanoidsStats).map((stats, index) => (
                  <td key={index}>{stats[0].toFixed(3)}</td>
                ))}
              </tr>
              <tr>
                <td>Flavanoids Median</td>
                {Object.values(classWiseFlavanoidsStats).map((stats, index) => (
                  <td key={index}>{stats[1].toFixed(3)}</td>
                ))}
              </tr>
              <tr>
                <td>Flavanoids Mode</td>
                {Object.values(classWiseFlavanoidsStats).map((stats, index) => (
                  <td key={index}>{stats[2]}</td>
                ))}
              </tr>
            </tbody>
      </table>
      </div>
    </div>
  );
};

export default FlavanoidsStats;
