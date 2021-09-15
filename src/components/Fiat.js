
const Fiat = ({pickFiat}) => {
    return (
        <div id='fiat'>
            <label id='fiatLabel'>Fiat:</label>
                <select name="selectFiat" id="selectFiat" onChange={({target})=>pickFiat(target.value)}>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='GBP'>GBP</option>
                    <option value='RUB'>RUB</option>
                    <option value='JPY'>JPY</option>
                    <option value='KRW'>KRW</option>
                    <option value='CNY'>CNY</option>
                </select>
        </div>
    )
}

export default Fiat
