import { useState } from "react";
import Header from "./components/Header.js";
import Mode from "./components/Mode.js";
import Fiat from "./components/Fiat.js";
import Select from "./components/Select";
import Display from "./components/Display.js";

function App() {
  const [mode, setMode] = useState("comparison");
  const [currency, setCurrency] = useState("");
  const [fiat, setFiat] = useState("USD");
  const [comparison, setComparison] = useState("");

  const changeMode = (value) => {
    setMode(value);
  };

  const pickCurrency = (value) => {
    if (
      [
        "BTC",
        "ETH",
        "ADA",
        "DOT",
        "XRP",
        "SOL",
        "BNB",
        "LINK",
        "DOGE",
        "MATIC",
        "LTC",
        "UNI",
        "LUNA",
        "THETA",
        "ATOM",
        "BAT",
        "USDT",
        "BCH",
        "ICP",
        "ALGO",
        "AVAX",
        "AUDIO",
      ].includes(value)
    )
      setCurrency(value);
  };

  const pickComparison = (value) => {
    setComparison(value);
  };

  const pickFiat = (value) => {
    setFiat(value);
  };

  return (
    <div className="App">
      <Mode />
      <Fiat pickFiat={pickFiat} />
      <Header />
      <Select changeMode={changeMode} />
      <Display
        fiat={fiat}
        currency={currency}
        comparison={comparison}
        mode={mode}
        pickCur={pickCurrency}
        pickComp={pickComparison}
      />
    </div>
  );
}

export default App;
