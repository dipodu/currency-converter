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
      <InputGroup className=" w-25 mb-0">
        <FormControl
          aria-describedby="basic-addon1"
          value={amount}
          onChange={onChangeAmount}
          type="number"
          className="h-100"
        />
      </InputGroup>
      <Dropdown>
        <Dropdown.Toggle id="currencyDrop" variant="success">
          <span>{selectedCurrency}</span>
          <img
            src={`./images/${selectedCurrency}.png`}
            width={30}
            height={30}
            class="rounded"
          />
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
                <img
                  src={`./images/${option}.png`}
                  width={30}
                  height={30}
                  class="rounded"
                  margin-left="40px"
                />
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
}
