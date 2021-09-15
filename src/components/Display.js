import CurrencyData from "./CurrencyData.js";
import Comparison from "./Comparison.js";
import SelectCurrency from "./SelectCurrency.js";
import SelectComparison from "./SelectComparison.js";
import ExchangesWallets from "./ExchangesWallets.js";

const Display = ({ fiat, currency, comparison, mode, pickCur, pickComp }) => {
  if (mode === "individual") {
    return (
      <div id="display">
        <SelectCurrency pickCur={pickCur} />
        <CurrencyData fiat={fiat} currency={currency} />
      </div>
    );
  } else if (mode === "comparison") {
    return (
      <div id="display">
        <SelectComparison pickComp={pickComp} />
        <Comparison fiat={fiat} comparison={comparison} />
      </div>
    );
  } else {
    return (
      <div id="display">
        <ExchangesWallets />
      </div>
    );
  }
};

export default Display;
