import './Appcoin.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './Coin'
import React  from 'react';
import Navbar from './Navbar';

function App() {

  //Defining states for functional components

  const [coins,setCoin] = useState([]);
  const [search,setSearch] = useState('');

  //fetching data from coingecko API 

  useEffect(
    () => {
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
         setCoin(res.data)
         console.log("data",res.data[1])
      })
      .catch((error) => console.log(error))
    }, []);
  
 const handleChange = (e) => {
   console.log("e",e.target.value)
      
    setSearch(e.target.value)
    
  }

  //Sorting out the searched data

  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div className="bg-dark">
     <Navbar />
     
      <div className="header">
        <h1 className="brand text-white"><i className="fas fa-coins"></i> CoinChange</h1>
        <form>
        <i className="fas fa-magnifying-glass-dollar"></i>
        <input className="formField text-dark" type="text" onChange={handleChange} placeholder="💱 Enter Coin Name"></input>
        </form>
      </div>
      <div className="coinsContainer bg-dark">
        {filteredCoins.map((coin) => {
          return(
            //passing the data to coin component as prop
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}  />
          )
        })}
        
      </div>
      {/* <div style={{maxWidth:"100px",marginTop:"100px",display:"flex"}}>
    <coingecko-coin-ticker-widget  coin-id="bitcoin" currency="usd" locale="en" background-color="#ffffff"></coingecko-coin-ticker-widget>
    </div>
    <div style={{maxWidth:"100px",marginTop:"100px",display:"flex"}}>
    <coingecko-coin-ticker-widget  coin-id="ethereum" currency="usd" locale="en" background-color="#ffffff"></coingecko-coin-ticker-widget>
    </div> */}
     
    </div>
  );
}

export default App;
