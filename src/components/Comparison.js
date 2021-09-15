import { useEffect, useState } from "react";

const Comparison = ({ comparison, fiat }) => {
  const url =
    "https://api.nomics.com/v1/currencies/ticker?key=39d25687b15aef9fcb9189edf6536a096fe3d964";

  const [pairs, setPairs] = useState([]);
  const [others, setOthers] = useState();
  const [colors] = useState([
    "rgb(194, 120, 51)",
    "rgb(50, 103, 139)",
    "rgb(25, 24, 46)",
    "pink",
    "brown",
    "rgb(49, 97, 87)",
    "rgb(196, 171, 30)",
    "rgb(189, 130, 74)",
    "rgb(168, 86, 86)",
    "grey",
  ]);
  const [hover, setHover] = useState(["hover", "to see"]);

  const changeHover = (value) => {
    setHover(value);
  };

  const pureDominance = (dominancePairs) => {
    let dominance = dominancePairs.map((a) => a[1]);
    return dominance;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${url}&ids=BTC,ETH,ADA,DOT,XRP,SOL,BNB,LINK,DOGE,MATIC,LTC,UNI,LUNA,THETA,ATOM,BAT,USDT,BCH,ICP,AVAX,ALGO,AUDIO&convert=${fiat}`
      );
      const jsonResponse = await response.json();
      return jsonResponse;
    };

    const setData = async () => {
      const data = await fetchData();
      console.log(data);
      let arr = [];

      data.forEach((currency) => {
        arr.push([currency["symbol"], currency[comparison]]);
      });

      if (comparison === "circulating_supply" || comparison === "rank") {
        arr.sort((a, b) => a[1] - b[1]);
      } else {
        arr.sort((a, b) => b[1] - a[1]);
      }

      if (comparison === "price") {
        arr.forEach(
          (price, index) =>
            (arr[index][1] = `${Number(price[1]).toFixed(2)} ${fiat}`)
        );
      }

      if (comparison === "circulating_supply") {
        arr.forEach(
          (supply, index) =>
            (arr[index][1] = `${Number(supply[1]).toLocaleString()} coins`)
        );
      }

      if (comparison === "market_cap") {
        arr.forEach(
          (cap, index) =>
            (arr[index][1] = `${Number(Number(cap[1]) / 1000000000).toFixed(
              2
            )} bn ${fiat}`)
        );
      }

      if (comparison === "rank") {
        arr.forEach((rank, index) => (arr[index][1] = `#${rank[1]}`));
      }

      if (comparison === "market_cap_dominance") {
        arr.forEach(
          (percentage, index) =>
            (arr[index][1] = Number(
              (Number(percentage[1]) + "").replace(".", "") / 100
            ))
        );
        arr = arr.slice(0, 9);
      }

      setPairs(arr);

      let othersDominance =
        100 - pureDominance(arr).reduce((total, a) => total + a);

      setOthers(othersDominance);
    };

    setData();
  }, [comparison, fiat]);

  if (comparison === "") {
    return (
      <div className="welcome">
        <a className="link" href="https://nomics.com" rel="dofollow">
          <p className="linkText">
            Crypto Market Cap & Pricing Data Provided By Nomics
          </p>
        </a>
      </div>
    );
  } else if (comparison === "market_cap_dominance") {
    return (
      <div>
        <div id="hoverSection">
          {hover[0]}:{hover[1]}%
        </div>
        <div className="dominance">
          {pairs.map((pair, index) => {
            return (
              <div
                className="dominion"
                key={index}
                style={{
                  backgroundColor: `${colors[index]}`,
                  width: `${pair[1]}%`,
                  height: "100%",
                }}
                onMouseOver={() => changeHover(pair)}
              ></div>
            );
          })}
          <div
            className="dominion"
            style={{
              backgroundColor: "grey",
              width: `${others}%`,
              height: "100%",
            }}
            onMouseOver={() => changeHover(["OTHER", others.toFixed(2)])}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="compList">
      <table>
        <tbody>
          {pairs.map((pair, index) => {
            return (
              <tr key={index}>
                <td className="position">{index + 1}.</td>
                <td className="name">{pair[0]}</td>
                <td className="result">{pair[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Comparison;
