import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import CurrencyRow from "./components/CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];

        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <Container className="d-flex w-100 h-100">
      <Container
        id="converterSection"
        className="d-flex flex-column justify-content-center "
      >
        <Row className="justify-content-center mb-4">
          <h1 className="display-4 m-0">Currency Coverter</h1>
        </Row>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(event) => setFromCurrency(event.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <Row className="d-flex justify-content-center h-10">
          <h1 className="display-3 m-0 pb-3">=</h1>
        </Row>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(event) => setToCurrency(event.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </Container>
    </Container>
  );
}

export default App;
