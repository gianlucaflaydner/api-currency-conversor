import { useState } from "react";
import "./QuotationForm.css";
export default function QuotationForm() {
  const [inputValue, setInputValue] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [convertedValue, setConvertedValue] = useState("");

  type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

  const converterMoeda = async () => {
    const fetchResponse = await fetch(
      `https://economia.awesomeapi.com.br/last/${selectedCurrency}-BRL`
    );

    const response: JSONValue = await fetchResponse.json();
    const object = Object.values(response)[0];
    const cotacao = object.bid;

    const convertedValue = Number(inputValue) * cotacao;
    const formattedValue = convertedValue.toFixed(2);

    setConvertedValue(formattedValue);
  };

  return (
    <div className="form-widget">
      <div className="form-section">
        <h1 className="form-title"> Conversor de moedas para Real</h1>
        <label className="input-label" htmlFor="input-real">
          {" "}
          Valor em {selectedCurrency}:
          <input
            name="input-valor"
            type="number"
            id="input-valor"
            className="input-valor"
            value={inputValue}
            onChange={(e) => {
              setConvertedValue("");
              setInputValue(e.target.value);
            }}
          ></input>
        </label>

        <div className="radio-group">
          <label
            className="radio-label"
            htmlFor="USD"
            onClick={() => {
              setConvertedValue("");
              setSelectedCurrency("USD");
            }}
          >
            USD
            <input
              type="radio"
              value="USD"
              name="currency"
              id="USD"
              className="radio-option"
              defaultChecked
            ></input>
          </label>
          <label
            className="radio-label"
            htmlFor="ARS"
            onClick={() => {
              setConvertedValue("");
              setSelectedCurrency("ARS");
            }}
          >
            ARS
            <input
              type="radio"
              value="ARS"
              name="currency"
              id="ARS"
              className="radio-option"
            ></input>
          </label>
          <label
            className="radio-label"
            htmlFor="EUR"
            onClick={() => {
              setConvertedValue("");
              setSelectedCurrency("EUR");
            }}
          >
            EUR
            <input
              type="radio"
              value="EUR"
              name="currency"
              id="EUR"
              className="radio-option"
            ></input>
          </label>
          <label
            className="radio-label"
            htmlFor="CNY"
            onClick={() => {
              setConvertedValue("");
              setSelectedCurrency("CNY");
            }}
          >
            CNY
            <input
              type="radio"
              value="CNY"
              name="currency"
              id="CNY"
              className="radio-option"
            ></input>
          </label>
        </div>

        <button
          className="form-button"
          type="submit"
          onClick={converterMoeda}
          disabled={inputValue === ""}
        >
          Converter
        </button>
        {convertedValue !== "" && (
          <div>
            <h1 className="form-converted-value">
              O valor {selectedCurrency} {inputValue} é o equivalente a R$
              {convertedValue}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
