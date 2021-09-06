import React, { Component } from 'react';
import dailogo from '../dai-logo.png';
import ethlogo from '../eth2.png';

import'./Wallet.css';
import Web3 from 'web3';
import DaiToken from "../abis/DaiToken.json"
import axios from 'axios' 
import Appcoin from './Appcoin'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from './Navbar';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({
      account : accounts[0]
    })
    const networkId = await web3.eth.net.getId() 
    const networkData = DaiToken.networks[networkId]

    //Getting daiToken contract instance

    const daiToken = new web3.eth.Contract(DaiToken.abi, networkData.address)
    this.setState({ daiTokenMock: daiToken })
    const balance = await daiToken.methods.balanceOf(this.state.account).call();
      
   this.setState({ balance : web3.utils.fromWei(balance.toString(),'Ether') })

    const transactions = await daiToken.getPastEvents('Transfer',{fromBlock:0,toBlock:'latest',filter: {from:this.state.account}})
    console.log("Transaction",transactions)
    this.setState({transactions : transactions})
    const balance2 = await web3.eth.getBalance(this.state.account)
    this.setState({ balance2 : web3.utils.fromWei(balance2.toString(),'Ether') })
    console.log("Transactions", await web3.eth.getBlock())
    
  //fetching current value of DAI using API

    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eth&ids=dai&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        this.setState({
          eth:res.data[0].current_price
        })
         
         console.log("data",res.data,this.state.eth)
      })
      .catch((error) => console.log(error))

      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dai&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        this.setState({
          usddai:res.data[0].current_price
        })
         
         console.log("newdata",res.data[0],this.state.eth)
      })
      .catch((error) => console.log(error))

      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        this.setState({
          usdeth:res.data[0].current_price
        })
         
         console.log("newdata2",res.data)
      })
      .catch((error) => console.log(error))
      const coinremitter = require('coinremitter-api');
      console.log('coinremitter',coinremitter)
      const obj = new coinremitter('$2y$10$wS7pv5bAL/E26n20Tq10peesXroufwAc0xDOVLIIKca/xg55dPSB2','567765567','TCN');
      this.setState({
        obj:obj
      })
      // console.log("object",obj.getBalance())
      await obj.getBalance((err,data) => {
        console.log("Wallet balance",JSON.parse(data).data.balance);
        this.setState({
          wallet:JSON.parse(data).data.balance
        }
      )   
      }) 

      await this.state.obj.getCoinRate((err,data) => {
        console.log("Wallet rate",JSON.parse(data));
       
         
      });
    }

    
// Transferring tokens

  transfer(rec,amt) {

    this.state.daiTokenMock.methods.transfer(rec,amt).send({from:this.state.account}).on('confirmation',(receipt) => {
      window.location.reload();
    })
    
  }
// Transferring ether

  sendEther(recepient,amount) {

    this.state.daiTokenMock.methods.send(recepient).send({from:this.state.account,value:amount}).on('confirmation',(rec,tx) => {
      window.location.reload()
    })

  }


//Defining state and their initial values

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenMock: null,
      balance: 0,
      balance2: 0,
      transactions: [],
      transactions2: [],
      eth:null,
      usdeth:null,
      usddai:null,
      
      wallet:null,
      obj:null,
    }

    this.transfer = this.transfer.bind(this)
  }

  render() {

    return (
      
      <div className="nee">

        <Navbar />
      
        <div className="container-fluid pt-5 mt-3">                                                                                                                                                                                                                                      
          <div style = {{maxHeight:"50%"}} className="row pb-3">          
          <div className="row-md-6 m-auto  border-left border-warning border-top rounded-left p-2">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{ width: "500px" }}>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="dai logo"src={dailogo} width="150" />
                </a>
                <h1 className="pt-3 text-white">{this.state.balance} DAI</h1>
                <h2 className="text-secondary">({(this.state.balance * this.state.eth).toFixed(5)} Ether)</h2>
                <h4 className="text-secondary">(USD value of a DAI is {this.state.usddai} US Dollar)</h4>    
                <form onSubmit = {(event) => {
                  event.preventDefault();
                  const amt = window.web3.utils.toWei(this.amt.value,'Ether');
                  const rec = this.rec.value;
                  this.transfer(rec,amt);
                  console.log(rec,amt)
                }}>
                  <div className="form-group mr-sm-2 pt-3">
                    <input
                    id="rec"
                    type="text"
                    ref = {(input) => this.rec = input}
                    className="form-control"
                    placeholder="Recipient Address"
                    required >
                    </input>
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                    id="amt"
                    type="text"
                    ref = {(input) => this.amt = input}
                    className="form-control"
                    placeholder="Enter Amount of Coins"
                    required >
                    </input>
                  </div>

                <button className="btn btn-warning mb-2 w-25">Send DAI</button>
                </form>
                <h2 className=" text-white border-secondary rounded bg-dark mt-2">Transaction History</h2>

                <table className="table mt-2 bg-secondary text-white rounded">
                  <thead>
                    <tr>
                      <th scope="col">Recipient</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                   { this.state.transactions.map((tx,index) => {

                    return(

                      <tr key={index}>
                          <td>{tx.returnValues.to} </td>
                          <td>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</td>
                      </tr>

                    )   
                   })
                   }
                  </tbody>
                </table>

                

                </div>
            </main>
                </div>
                <div className="row-md-6 m-auto border-right border-white border-bottom rounded-right p-2">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{ width: "500px" }}>
                <a
                  href="/"
                  target="_blank"

                  rel="noopener noreferrer"
                >
                  <img alt="eth logo" className="rounded-circle" src={ethlogo} width="150" />
                </a>
                <h1 className="pt-3 text-white">{this.state.balance2} Ether</h1>
                <h2 className="text-secondary">({(this.state.balance2 / this.state.eth).toFixed(2)} DAI)</h2>
                <h4 className="text-secondary">(USD value of a ETH is {this.state.usdeth} US Dollar)</h4>
                
                <form onSubmit = {(event) => {

                  event.preventDefault();
                  const amount = window.web3.utils.toWei(this.amount.value,'Ether');
                  const recepient = this.recepient.value;
                  this.sendEther(recepient,amount);
                  console.log(recepient,amount)
                  
                }}>
                  <div className="form-group mr-sm-2 pt-3">
                    <input
                    id="recipient"
                    type="text"
                    ref = {(input) => this.recepient = input}
                    className="form-control"
                    placeholder="Recipient Address"
                    required >
                    </input>
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                    id="amount"
                    type="text"
                    ref = {(input) => this.amount = input}
                    className="form-control"
                    placeholder="Enter Amount of Ether"
                    required >
                    </input>
                  </div>

                <button className="btn btn-dark mb-2 w-25"> Send Ether </button>
                </form>
                 <h2 className=" text-white border-secondary rounded bg-dark mt-2">Transaction History</h2>

                <table className="table mt-2 bg-secondary text-white rounded">
                  <thead>
                    <tr>  
                      <th scope="col">Latest Transaction Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td style={{overflowWrap: "anywhere"}} >{this.state.transactions2}</td>
                      </tr>
                  </tbody>
                </table> 
                </div>
            </main>
                </div>
                </div>
              
                
                </div>
                
                
      </div>
    );
  }
}

export default App;
