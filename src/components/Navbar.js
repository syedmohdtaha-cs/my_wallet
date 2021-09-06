import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
// import {nav} from 'react-bootstrap';
 
const Navbar = () => {

    return (
            <nav  className="navbar navbar-expand-lg navbar-light bg-none mb-3">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul style={{fontSize:"180%"}} className="navbar-nav m-auto bg-dark pl-3 pr-3">
                <li style={{backgroundColor: "#343a40"}} className="nav-item active mr-3 border border-light rounded mt-1 mb-1">
                   <NavLink  activeClassName="active" className=" nav-link text-info pl-2 pr-2" to='/' exact={true} >Home</NavLink>
                </li>
                <li className="nav-item mr-3 border border-light rounded mt-1 mb-1">
                <NavLink activeClassName="active" className=" nav-link text-info pl-2 pr-2" to='/wallet'>Wallet</NavLink>
                </li>
                <li className="nav-item mr-3 border border-light rounded mt-1 mb-1">
                <NavLink activeClassName="active" className="nav-link text-info pl-2 pr-2" to='/coinchanger'>Coin Changer</NavLink>
                </li>
                <li className="nav-item border border-light rounded mt-1 mb-1">
                <NavLink activeClassName="active" className="nav-link text-info pl-2 pr-2" to='/cryptowallet'>Crypto Wallet</NavLink>
                </li>
                </ul>
               
            </div>
                </nav>
        
           

    )

}

export default Navbar;