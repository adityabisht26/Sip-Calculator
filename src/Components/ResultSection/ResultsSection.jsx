import ChartSection from '../ChartSection/ChartSection';
import './ResultsSection.css';


const ResultsSection = ({ results, returnsPercentage, showResults, chartData, duration }) => {
  return (
    <div className="results-section">
      <div className="results-section__header">
        <h2>Expectations</h2>
      </div>
      
      {/* Expected Returns Display */}
      <div className="expected-returns">
        <div className="expected-returns__content">
          <span className="expected-returns__label">Expected Returns</span>
          <span className="expected-returns__value">
            ₹{results.maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Results Summary */}
      {showResults && (
        <div className="results-summary">
          <div className="results-item results-item--investment">
            <span className="results-item__label">Total Investment</span>
            <span className="results-item__value">
              ₹{results.totalInvestment.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="results-item results-item--gains">
            <span className="results-item__label">Total Gains</span>
            <span className="results-item__value">
              ₹{results.totalGains.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="results-item results-item--percentage">
            <span className="results-item__label">Returns Percentage</span>
            <span className="results-item__value">{returnsPercentage}%</span>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <ChartSection 
        chartData={chartData} 
        returnsPercentage={returnsPercentage} 
        duration={duration} 
      />
    </div>
  );
};

export default ResultsSection