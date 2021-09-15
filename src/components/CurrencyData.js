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

  useEffect(() => {
    document.getElementById("logo").style.backgroundImage = `url('${logo}')`;
    document.getElementById("logo").style.backgroundSize = `50%`;
    document.getElementById("logo").style.backgroundRepeat = `no-repeat`;
    document.getElementById("logo").style.backgroundPosition = `center`;
  }, [logo]);

  if (currency === "") {
    return (
      <div className="welcome">
        <p>Please select individual currency for analysis!</p>
        <a id="logo"></a>
      </div>
    );
  }

  return (
    <div id="currencyData">
      <div id="data">
        <h3>Ranking- {rank}</h3>
        <h3>Symbol- {name}</h3>
        <h3>Price- {price}</h3>
        <h3>MarketCap- {cap}</h3>
        <h3>Daily Volume- {volume}</h3>
        <h3>Token limit- {limits}</h3>
      </div>
      <a id="logo" href={link}></a>
    </div>
  );
};

export default CurrencyData;
