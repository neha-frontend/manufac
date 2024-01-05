import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import wineData from "./Wine-Data.json"
import FlavanoidsStats from './FlavanoidsStats';
import GammaStats from './GammaStats';

interface Wine {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  "Magnesium": number,
  "Total phenols": number,
  "Flavanoids": number,
  "Nonflavanoid phenols":number,
  "Proanthocyanins":string,
  "Color intensity":number,
  "Hue":number,
  "OD280/OD315 of diluted wines":number,
  "Unknown":number
}
function App() {
  const [data, setData] = useState<Wine[]>([]);
  useEffect(() => {
    setData(wineData as Wine[]);
  }, []);
  // Function to calculate the mean
  const calculateMean = (data: number[]): number => {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  };
  // Function to calculate the median
  const calculateMedian = (data: number[]): number => {
    const sortedData = [...data].sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  };
  // Function to calculate the mode
  const calculateMode = (data: number[]): number => {
    const counts = new Map<number, number>();

    data.forEach((value) => {
      counts.set(value, (counts.get(value) || 0) + 1);
    });

    let mode: number | undefined;
    let maxCount = 0;

    counts.forEach((count, value) => {
      if (count > maxCount) {
        mode = value;
        maxCount = count;
      }
    });

    return mode!;
  };
  
  
  // Function to calculate the mean, median, and mode of Flavanoids for each class
const calculateClassWiseFlavanoidsStats = (dataset: Wine[]): Record<string, number[]> => {
  const classWiseStats: Record<string, number[]> = {};

  dataset.forEach((entry) => {
    const alcoholClass = `Class ${entry.Alcohol}`;
    if (!classWiseStats[alcoholClass]) {
      classWiseStats[alcoholClass] = [];
    }
    classWiseStats[alcoholClass].push(entry.Flavanoids);
  });

  // Calculate mean, median, and mode for each class
  Object.keys(classWiseStats).forEach((className) => {
    const data = classWiseStats[className];
    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const mode = calculateMode(data);
    
    classWiseStats[className] = [mean, median, mode];
  });

  return classWiseStats;
};
const classWiseFlavanoidsStats = calculateClassWiseFlavanoidsStats(wineData as Wine[]);
// Function to calculate Gamma for each point in the dataset
const calculateGammaForDataset = (dataset: Wine[]): number[] => {
  return dataset.map((entry) => (entry.Ash * entry.Hue) / entry.Magnesium);
};

// Function to calculate class-wise Gamma statistics
const calculateClassWiseGammaStats = (dataset: Wine[]): Record<string, number[]> => {
  const classWiseGammaStats: Record<string, number[]> = {};

  dataset.forEach((entry) => {
    const alcoholClass = `Class ${entry.Alcohol}`;
    const gamma = (entry.Ash * entry.Hue) / entry.Magnesium;

    if (!classWiseGammaStats[alcoholClass]) {
      classWiseGammaStats[alcoholClass] = [];
    }
    classWiseGammaStats[alcoholClass].push(gamma);
  });

  // Calculate mean, median, and mode for each class
  Object.keys(classWiseGammaStats).forEach((className) => {
    const data = classWiseGammaStats[className];
    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const mode = calculateMode(data);
    
    classWiseGammaStats[className] = [mean, median, mode];
  });

  return classWiseGammaStats;
};
const gammaValues = calculateGammaForDataset(data);
const classWiseGammaStats = calculateClassWiseGammaStats(data);
  return (
    <div className="App">
      <header className="App-header">
      <FlavanoidsStats classWiseFlavanoidsStats={classWiseFlavanoidsStats} />
      <GammaStats classWiseGammaStats={classWiseGammaStats} />
      </header>
    </div>
  );
}

export default App;
