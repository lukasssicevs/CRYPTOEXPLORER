import { useState, useEffect } from "react";

const CurrencyData = ({ currency, fiat }) => {
  const url = "https://api.nomics.com/v1/currencies";
  const key = "?key=39d25687b15aef9fcb9189edf6536a096fe3d964";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rank, setRank] = useState("");
  const [cap, setCap] = useState("");
  const [volume, setVolume] = useState("");
  const [limits, setLimits] = useState("");
  const [logo, setLogo] = useState("");
  const [pairs] = useState([]);
  const [link, setLink] = useState([""]);

  const fetchData = async () => {
    const response = await fetch(
      `${url}/ticker${key}&ids=${currency}&convert=${fiat}`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const fetchMetadata = async () => {
    const response = await fetch(
      `${url}${key}&ids=BTC,ETH,ADA,DOT,XRP,SOL,BNB,LINK,DOGE,MATIC,LTC,UNI,LUNA,THETA,ATOM,BAT,USDT,BCH,ICP,ALGO,AVAX,AUDIO&attributes=id,website_url`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  const setData = async () => {
    const data = await fetchData();
    setRank(() => {
      if (data[0]["rank"] === "1") {
        return `${data[0]["rank"]}st`;
      } else if (data[0]["rank"] === "2") {
        return `${data[0]["rank"]}nd`;
      } else if (data[0]["rank"] === "3") {
        return `${data[0]["rank"]}rd`;
      } else {
        return `${data[0]["rank"]}th`;
      }
    });

    setPrice(`${Number(data[0]["price"]).toFixed(2)} ${fiat}`);
    setName(`${data[0].id}`);
    setCap(`${Number(data[0]["market_cap"]).toLocaleString()} ${fiat}`);
    setVolume(
      `${Number(
        Number(data[0]["1d"]["volume"]).toFixed(0)
      ).toLocaleString()} coins`
    );
    setLimits(() => {
      if (data[0].hasOwnProperty("max_supply")) {
        return `${Number(data[0]["max_supply"]).toLocaleString()} coins`;
      } else {
        return `no limit`;
      }
    });
    setLogo(data[0]["logo_url"]);
  };

  const changeLink = () => {
    console.log(currency);
    console.log(pairs);
    pairs.forEach((pair) => {
      if (pair[0] === currency) {
        setLink(pair[1]);
      }
    });
  };

  const getPairs = async () => {
    const data = await fetchMetadata();
    data.forEach((pair) => {
      pairs.push([pair["id"], pair["website_url"]]);
    });
  };

  useEffect(() => {
    getPairs();
  }, []);

  useEffect(() => {
    setData();
    changeLink();
  }, [currency, fiat]);

  if (currency === "") {
    return (
      <div className="welcome">
        <a className="link" href="https://nomics.com" rel="dofollow">
          <p className="linkText">
            Crypto Market Cap & Pricing Data Provided By Nomics
          </p>
        </a>
        <a id="logo" style={{ visibility: "hidden" }}></a>
      </div>
    );
  }

  return (
    <div id="currencyData">
      <div id="data">
        <h3 id="indvData">Ranking: {rank}</h3>
        <h3 id="indvData">Symbol: {name}</h3>
        <h3 id="indvData">Price: {price}</h3>
        <h3 id="indvData">MarketCap: {cap}</h3>
        <h3 id="indvData">Daily Volume: {volume}</h3>
        <h3 id="indvData">Token limit: {limits}</h3>
      </div>
      <a id="website" href={link}>
        <img id="logo" src={logo} />
      </a>
    </div>
  );
};

export default CurrencyData;
