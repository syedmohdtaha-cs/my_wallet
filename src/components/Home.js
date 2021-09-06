import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {

    return(
    <div className="div">

        <button class="butn bt striped-shadow blue"><span><Link className="lnk span" to='/wallet'>Wallet</Link></span></button>
        <button class="butn bt bt1 striped-shadow dark"><span><Link className="lnk span" to='/coinchanger'>Coin Changer</Link></span></button>
        <button class="butn bt bt1 striped-shadow grey"><span><Link className="lnk span" to='/cryptowallet'>Crypto Wallet</Link></span></button>

    </div>

    )


}

export default Home;