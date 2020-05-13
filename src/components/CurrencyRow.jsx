import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <Row className="d-flex justify-content-center align-content-center">
      <InputGroup className="mb-2 w-25 m-0">
        <FormControl
          aria-describedby="basic-addon1"
          value={amount}
          onChange={onChangeAmount}
          type="number"
        />
      </InputGroup>
      <Dropdown>
        <Dropdown.Toggle id="currencyDrop" variant="success">
          {selectedCurrency}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {currencyOptions.map((option) => (
            <Dropdown.Item
              className="d-flex justify-content-between"
              as="button"
              key={option}
              value={option}
              onClick={onChangeCurrency}
            >
              <div>{option}</div>
              <div>
                <img src="./images/gbp.png" alt="currency-flag" />
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
}
