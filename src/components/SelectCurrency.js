const SelectCurrency = ({ pickCur }) => {
  return (
    <div>
      <form>
        <label className="picker">Choose cryptocurrency:</label>
        <input
          type="text"
          name="crypto"
          id="cryptoInput"
          list="crypto"
          onChange={({ target }) => pickCur(target.value)}
        />
        <datalist id="crypto">
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Etheruem</option>
          <option value="ADA">Cardano</option>
          <option value="DOT">Polkadot</option>
          <option value="XRP">Ripple</option>
          <option value="SOL">Solana</option>
          <option value="BNB">Binance</option>
          <option value="LINK">Chainlink</option>
          <option value="LUNA">Terra</option>
          <option value="DOGE">Dogecoin</option>
          <option value="LTC">Litecoin</option>
          <option value="UNI">Uniswap</option>
          <option value="MATIC">Polygon</option>
          <option value="THETA">Theta</option>
          <option value="BCH">Bitcoin Cash</option>
          <option value="USDT">Tether</option>
          <option value="ATOM">Cosmos</option>
          <option value="BAT">Basic Attention Token</option>
          <option value="ICP">Internet Computer</option>
          <option value="ALGO">Algorand</option>
          <option value="AVAX">Avalanche</option>
          <option value="AUDIO">Audius</option>
        </datalist>
      </form>
    </div>
  );
};

export default SelectCurrency;
