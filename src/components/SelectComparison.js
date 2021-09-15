const SelectComparison = ({ pickComp }) => {
  return (
    <div>
      <form>
        <label className="picker">Compare by:</label>
        <select
          name="comparison"
          id="comparison"
          onChange={({ target }) => pickComp(target.value)}
        >
          <option value="">.......</option>
          <option value="price">Coin Price</option>
          <option value="circulating_supply">Scarcity</option>
          <option value="market_cap">Market-Cap</option>
          <option value="market_cap_dominance">Dominance</option>
          <option value="rank">Ranking</option>
          <option value="num_exchanges">Availability on Exchanges</option>
          {/* <option value={['1d']['volume']}>Daily volume</option> */}
        </select>
      </form>
    </div>
  );
};

export default SelectComparison;
