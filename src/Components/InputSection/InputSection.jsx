import './InputSection.css';

const InputSection = ({
  monthlyAmount,
  setMonthlyAmount,
  duration,
  setDuration,
  expectedReturns,
  setExpectedReturns,
  returnsPercentage,
  showResults,
  setShowResults
}) => {
  return (
    <div className="input-section">
      <div className="input-section__header">
        <h2>Investment Amount</h2>
      </div>
      
      {/* Monthly Amount Input */}
      <div className="input-group">
        <label className="input-group__label">
          Monthly Investment Amount
        </label>
        <div className="input-group__field">
          <span className="input-group__currency">₹</span>
          <input
            type="number"
            value={monthlyAmount || ''}
            onChange={(e) => setMonthlyAmount(Number(e.target.value) || 0)}
            className="input-group__input"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Duration Dropdown */}
      <div className="input-group">
        <label className="input-group__label">
          Duration (Years)
        </label>
        <select
          value={duration || ''}
          onChange={(e) => setDuration(Number(e.target.value) || 0)}
          className="input-group__select"
        >
          {[...Array(30)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Year{i + 1 > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Expected Returns */}
      <div className="input-group">
        <label className="input-group__label">
          Expected Annual Returns (%)
        </label>
        <input
          type="number"
          value={expectedReturns || ''}
          onChange={(e) => setExpectedReturns(Number(e.target.value) || 0)}
          className="input-group__input"
          placeholder="Enter expected returns"
          step="0.1"
          min="1"
          max="30"
        />
      </div>

      {/* Compounding Effect Section */}
      <div className="compounding-effect">
        <h3 className="compounding-effect__title">
          Compounding Effect of Regular Contributions
        </h3>
        <div className="compounding-effect__value">
          <div className="compounding-effect__percentage">
            {returnsPercentage}%
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={() => setShowResults(!showResults)}
        className="calculate-button"
      >
        {showResults ? 'Hide Results' : 'Calculate SIP'}
      </button>
    </div>
  );
};

export default InputSection