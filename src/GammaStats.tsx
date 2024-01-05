import React from "react";

interface GammaStatsProps {
  classWiseGammaStats: Record<string, number[]>;
}

const GammaStats: React.FC<GammaStatsProps> = ({ classWiseGammaStats }) => {
  return (
    <div>
      <h2>Gamma Statistics</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(classWiseGammaStats).map((className) => (
                <th key={className}>{className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gamma Mean</td>
              {Object.values(classWiseGammaStats).map((stats, index) => (
                <td key={index}>{stats[0].toFixed(3)}</td>
              ))}
            </tr>
            <tr>
              <td>Gamma Median</td>
              {Object.values(classWiseGammaStats).map((stats, index) => (
                <td key={index}>{stats[1].toFixed(3)}</td>
              ))}
            </tr>
            <tr>
              <td>Gamma Mode</td>
              {Object.values(classWiseGammaStats).map((stats, index) => (
                <td key={index}>{stats[2]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GammaStats;
