import { useState, useEffect, SyntheticEvent, FC } from "react";
import SelectElement from "../../components/SelectElement";
import BasicTable from "../../components/Table";

const CurrenciesPage = (props: { "data-testid"?: string }): JSX.Element => {
  const [currency, setCurrency] = useState<"UAH" | "CZK">("UAH");
  const [quantity, setQuantity] = useState(0);
  function proceedValue(value: "UAH" | "CZK") {
    setCurrency(value);
  }

  function handleChange(e: SyntheticEvent) {
    const { value } = e.target as HTMLInputElement;
    setQuantity(Number(value));
  }

  // useEffect(() => {}, []);

  return (
    <>
      <div className="check-block" data-testid={props["data-testid"]}>
        <p>Input amount to convert: </p>{" "}
        <div>
          <input type="text" onChange={handleChange} />
        </div>
        <SelectElement cur={currency} handleValue={proceedValue} />
      </div>

      <BasicTable convertedCurrency={currency} count={quantity} />
    </>
  );
};

export default CurrenciesPage;
