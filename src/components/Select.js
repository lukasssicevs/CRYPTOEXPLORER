const Select = ({ changeMode }) => {
  return (
    <div id="selectContainer">
      <div id="select">
        <input
          type="radio"
          id="individual"
          name="select"
          value="individual"
          onClick={({ target }) => changeMode(target.value)}
        ></input>
        <label className="label" id="ind" htmlFor="individual">
          <span id="first">Individual analysis</span>
        </label>
        <input
          type="radio"
          id="comparison"
          name="select"
          value="comparison"
          onClick={({ target }) => changeMode(target.value)}
        ></input>
        <label className="label" id="comp" htmlFor="comparison">
          <span id="second">Currency comparison</span>
        </label>
        <input
          type="radio"
          id="exchangesWallets"
          name="select"
          value="exchangesWallets"
          onClick={({ target }) => changeMode(target.value)}
        ></input>
        <label className="label" id="exwa" htmlFor="exchangesWallets">
          <span id="third">Exchanges/ Wallets</span>
        </label>
      </div>
    </div>
  );
};

export default Select;
