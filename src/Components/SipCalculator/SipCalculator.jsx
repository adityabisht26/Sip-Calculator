import React, { useState, useEffect, useRef } from 'react';
import HeaderSection from '../HeaderSection/HeaderSection.jsx';
import InputSection from '../InputSection/InputSection.jsx';
import ResultsSection from '../ResultSection/ResultsSection.jsx';

import './SipCalculator.css';


const SipCalculator = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [duration, setDuration] = useState(10);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [showResults, setShowResults] = useState(false);
  const [chartData, setChartData] = useState([]);
  const calculatorRef = useRef(null);

  // Calculate SIP values
  const calculateSIP = () => {
    const monthlyRate = expectedReturns / 100 / 12;
    const totalMonths = duration * 12;
    const totalInvestment = monthlyAmount * totalMonths;
    
    // SIP maturity calculation
    const maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalGains = maturityAmount - totalInvestment;
    
    return {
      maturityAmount,
      totalInvestment,
      totalGains,
      totalMonths
    };
  };

  // Generate chart data
  const generateChartData = () => {
    const monthlyRate = expectedReturns / 100 / 12;
    const totalMonths = duration * 12;
    const data = [];
    
    for (let month = 0; month <= totalMonths; month += 12) {
      const invested = monthlyAmount * month;
      let maturity = 0;
      
      if (month > 0) {
        maturity = monthlyAmount * (((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate) * (1 + monthlyRate));
      }
      
      data.push({
        year: month / 12,
        invested: invested,
        maturity: maturity,
        returns: (maturity - invested) || 0
      });
    }
    
    return data;
  };

  useEffect(() => {
    setChartData(generateChartData());
  }, [monthlyAmount, duration, expectedReturns]);

  const results = calculateSIP();
  const returnsPercentage = ((results.totalGains / results.totalInvestment) * 100).toFixed(2);

  const inputProps = {
    monthlyAmount,
    setMonthlyAmount,
    duration,
    setDuration,
    expectedReturns,
    setExpectedReturns,
    returnsPercentage,
    showResults,
    setShowResults
  };

  const resultsProps = {
    results,
    returnsPercentage,
    showResults,
    chartData,
    duration
  };

  return (
    <div className="sip-calculator" ref={calculatorRef}>
      <div className="sip-calculator__container">
        <HeaderSection />
        <div className="sip-calculator__content">
          <div className="sip-calculator__grid">
            <InputSection {...inputProps} />
            <ResultsSection {...resultsProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator