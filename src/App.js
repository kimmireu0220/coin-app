import { useEffect, useState } from  "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoeny] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);
  const onChange = (event) => setMoeny(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);
  const onChange2 = (event) => setCoinPrice(event.target.value);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length}) Coins`}</h1>
      {loading ? <strong>Loading...</strong> : null}
      {loading ? "" : <input onChange={onChange} value={money} type="number" min="0"/>}
      <hr/>
      <select onChange={onChange2}>
        {coins.map((coin) => 
        <option key={coin.id} value={coin.quotes.USD.price.toFixed(4)}>
          {coin.name} ({coin.symbol}) : ${(coin.quotes.USD.price).toFixed(4)}
        </option>
        )}
      </select>
      <hr/>
      <label>{Number(money / coinPrice)}개 구입 가능</label>
    </div>
  );  
}

export default App;
