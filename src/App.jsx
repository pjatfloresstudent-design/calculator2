import { useState } from 'react';
import './App.css';

function CalcDisplay({ displayValue }) {
  const isName = displayValue === 'Prince John Andrew T. Flores';

  return (
    <div className={`Display ${isName ? 'name-display' : ''}`}>
      <span>{displayValue}</span>
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '' }) {
  return (
    <button className={`Button ${className}`} onClick={onClick}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState('0');

  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(null);
  const [operator, setOperator] = useState(null);

  const buttonClickHandler = (e) => {
    e.preventDefault();

    const value = String(e.target.innerText || e.target.innerHTML);

    // Name button action
    if (value === 'Flores') {
      setDisplayValue('Prince John Andrew T. Flores');
      setOperand1(null);
      setOperand2(null);
      setOperator(null);
      return;
    }

    // Clear button
    if (value === 'C') {
      setDisplayValue('0');
      setOperand1(null);
      setOperand2(null);
      setOperator(null);
      return;
    }

    // Operator buttons
    if (['+', '-', 'x', '÷'].includes(value)) {
      if (operand1 !== null) {
        setOperator(value);
        setDisplayValue(value);
      }
      return;
    }

    // Equals button
    if (value === '=') {
      if (operand1 !== null && operand2 !== null && operator !== null) {
        let result = 0;

        if (operator === '+') {
          result = parseFloat(operand1) + parseFloat(operand2);
        } else if (operator === '-') {
          result = parseFloat(operand1) - parseFloat(operand2);
        } else if (operator === 'x') {
          result = parseFloat(operand1) * parseFloat(operand2);
        } else if (operator === '÷') {
          result =
            parseFloat(operand2) !== 0
              ? parseFloat(operand1) / parseFloat(operand2)
              : 'Error';
        }

        const resultStr = String(result);
        setDisplayValue(resultStr);
        setOperand1(resultStr === 'Error' ? null : resultStr);
        setOperand2(null);
        setOperator(null);
      }

      return;
    }

    // Number buttons
    if (operator === null) {
      if (operand1 === null) {
        setOperand1(value);
        setDisplayValue(value);
      } else {
        const stackedValue = operand1 + value;
        setOperand1(stackedValue);
        setDisplayValue(stackedValue);
      }
    } else {
      if (operand2 === null) {
        setOperand2(value);
        setDisplayValue(value);
      } else {
        const stackedValue = operand2 + value;
        setOperand2(stackedValue);
        setDisplayValue(stackedValue);
      }
    }
  };

  return (
    <div className="App">
      <div className="Header">
        Calculator of Prince John Andrew Flores - IT3A
      </div>

      <div className="Calculator">
        <CalcDisplay displayValue={displayValue} />

        <div className="Keypad">
          <CalcButton buttonLabel={7} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={8} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={9} onClick={buttonClickHandler} />
          <CalcButton buttonLabel="÷" onClick={buttonClickHandler} />

          <CalcButton buttonLabel={4} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={5} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={6} onClick={buttonClickHandler} />
          <CalcButton buttonLabel="x" onClick={buttonClickHandler} />

          <CalcButton buttonLabel={1} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={2} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={3} onClick={buttonClickHandler} />
          <CalcButton buttonLabel="-" onClick={buttonClickHandler} />

          <CalcButton buttonLabel="C" onClick={buttonClickHandler} />
          <CalcButton buttonLabel={0} onClick={buttonClickHandler} />
          <CalcButton buttonLabel="=" onClick={buttonClickHandler} />
          <CalcButton buttonLabel="+" onClick={buttonClickHandler} />

          <CalcButton
            buttonLabel="Flores"
            onClick={buttonClickHandler}
            className="name-btn"
          />
        </div>
      </div>
    </div>
  );
}

export default App;