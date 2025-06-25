import React, { useState, useEffect, useRef } from 'react';
import HeaderSection from '../HeaderSection/HeaderSection.jsx';
import InputSection from '../InputSection/InputSection.jsx';
import ResultsSection from '../ResultSection/ResultsSection.jsx';
import logo from '../../assets/logo.jpg';

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
    <div className='background-container'>
      <div className='head-container'>
            <img src={logo} alt="Logo" />
            </div> 
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
          
          <div className='footer-container'> 
            <h2>Mutual Advisor/Distributor FAQ's</h2>
            <ol>
              <li>
                <strong>What is an SIP?</strong><br/>
                An SIP (Systematic Investment Plan) allows investors to invest a fixed amount regularly in a mutual fund scheme, promoting disciplined and long-term investing.
              </li>
              <li>
                <strong>How does an SIP calculator help?</strong><br/>
                An SIP calculator helps estimate the future value of investments based on monthly contributions, expected return rate, and duration. It simplifies planning by showing how wealth can grow over time.
              </li>
              <li>
                <strong>Can the SIP amount be changed later?</strong><br/>
                Yes, most mutual funds allow you to increase or decrease your SIP amount as per your financial goals and convenience.
              </li>
              <li>
                <strong>What happens if I miss an SIP payment?</strong><br/>
                 Missing one or two SIP installments doesn’t usually result in penalties, but repeated defaults may lead to cancellation of the SIP. It’s advisable to keep sufficient balance in your linked bank account.
              </li>
              <li>
                <strong>Are SIP returns guaranteed?</strong><br/>
                No. Mutual fund investments are subject to market risks. SIPs help average out market volatility (rupee cost averaging), but returns are not fixed or guaranteed.
              </li>
              <li>
                <strong>What is NAV and how does it impact SIP?</strong><br/>
                NAV (Net Asset Value) is the price per unit of a mutual fund. When you invest via SIP, units are purchased based on the NAV on the date of investment. Lower NAV means more units purchased.
              </li>
              <li>
                <strong>What is the best time to invest in an SIP?</strong><br/>
                There is no ideal time — the key is consistency. SIPs are designed to work across market cycles by averaging out the cost over time.
              </li>
              <li>
                <strong>Can I stop or pause my SIP anytime?</strong><br/>
                Yes. You can stop or pause your SIP through the fund house or distribution platform anytime. However, long-term consistency is recommended for better compounding.
              </li>
              <li>
                <strong>What returns can I expect from an SIP?</strong><br/>
                Returns vary based on the mutual fund scheme, market conditions, and investment duration. Historically, equity mutual funds have provided 10-15% annualized returns over the long term.
              </li>
              <li>
                <strong>How is SIP taxed?</strong><br/>
                SIP returns are taxed based on the type of fund:<br/>
                  <strong>Equity Funds</strong>: LTCG (after 1 year) is taxed at 10% above ₹1 lakh.<br/>
                  <strong>Debt Funds</strong>: Gains are added to your income and taxed as per slab (post-April 2023 rules).
              </li>
              <li>
                <strong>Is SIP suitable for short-term goals?</strong><br/>
                SIPs are best for long-term wealth creation. For short-term goals (less than 3 years), low-risk debt or liquid funds are preferred.
              </li>
              <li>
                <strong>Can SIPs be started online?</strong><br/>
                Yes, SIPs can be started easily through online platforms, mutual fund websites, or mobile apps with eKYC and auto-debit mandates.
              </li>
            </ol>

          </div>
    </div>
    
  );
};

export default SipCalculator