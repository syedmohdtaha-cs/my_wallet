import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Navbar from './Navbar';

class CryptoWallet extends Component {
    async componentWillMount() {    
        await this.loadBlockchainData()
      }
    
    async loadBlockchainData() {

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
      fetchtransaction = async() => {

        var param = {
          'address':this.state.wallet_addr
      }
    
        await this.state.obj.getTransactionbyAddress(param,(err,data) => {

       
          if(data){

            this.setState({
              transactiondetails : JSON.parse(data).data
            })
            console.log("transaction",JSON.parse(data).data);

          }
          else {
            window.alert("Please fill correct info")
          }
    
          
        }) ;
         
    
      }
      handleChange = (e) => {

        this.setState({
          numCoins : e.target.value
        })
        console.log("ff",this.state.numCoins)
      }
    
      handleC = (e) => {
           
        this.setState({
          wallet_addr : e.target.value
        })
        // transaction = obj.getTransaction(param);
    
      }
    
      newWallet = () => {
       const param = {
          'label': "TCNSMT"
      }
       this.state.obj.getNewAddress(param,(err,data) => {
         console.log("newwa",JSON.parse(data).data.address)
         this.setState({   
          wallet_address:JSON.parse(data).data.address
         })
         window.alert("Your wallet with provided address is created")
       });
      }
    
      newTransaction = () => {
    
       const param = {
        'to_address': this.state.wallet_address,
        'amount':this.state.numCoins
       }
       this.state.obj.withdraw(param,(error,data) => {
         console.log(JSON.parse(data));
    
        if(data){
    
          this.setState({
    
            newTransactionDetails:JSON.parse(data)
      
          })
    
        }
        else {
          
          this.setState({
    
            newTransactionDetails:JSON.parse(error)
      
          })
              
        }
    
       
     
        console.log("Datat",JSON.parse(data))
        console.log("errrr",error)
        
      });
    
    
      }
      constructor(props) {
        super(props)
        this.state = {
          wallet:null,
          obj:null,
          newwa:null,
          wallet_address:null,
          numCoins:null,
          wallet_addr:null,
          transactiondetails:[],
          newTransactionDetails:null
        }
    
      }

render() {
return(
   <div className="bg-dark">
  <Navbar />
                <div className="bg-dark pb-4" style={{margin:"auto",textAlign:"center",maxWidth:"950px"}}>   

                <div>
                
                      <button 
                  className="bg-danger text-white ml-2 border border-dark rounded w-40 mt-4 p-2"
                  onClick= {this.newWallet}
                >
                  <h2>Click here for new Wallet</h2>
                </button>
                <br />
                <h3 className="text-white mt-2">Wallet Address : {this.state.wallet_address}</h3>
                <input className="formField text-dark mt-4" type="number" onChange={this.handleChange}  placeholder="Enter amount of coins"></input>
                <br />

                  
                     
                  <Popup trigger={<button className="btn btn-primary mt-3" onClick={this.newTransaction}>Buy Coins</button>} position="top left"
                      onOpen={this.newTransaction}
                      modal
                  
                  >
                      {close => (
                        <div className="n122 text-center bg-info text-white">
                          { this.state.newTransactionDetails ? 
                          <div>
                          <h1>{this.state.newTransactionDetails.msg}</h1>
                          { this.state.newTransactionDetails.data.amount ?
                          <h2>{(this.state.newTransactionDetails.data.amount).slice(0,1) + ' ' + this.state.newTransactionDetails.data.coin_short_name}</h2> 
                           :
                           null }
                          </div>
                          :
                          <div class="loader">Loading</div>
                          }
                          <button className="close btn btn-danger p-1 m-auto" onClick={close}>
                            &times;
                          </button>
                        </div>
                      )}
                    </Popup>

                  

                </div>
                <div>
                  <h2 className="mt-2">Get your transactions : </h2>
                  
                  <input className="formField text-dark mt-4" type="text" onChange={this.handleC}  placeholder="Enter wallet address"></input>
                  <button className="btn btn-primary mw-4 ml-3" onClick={this.fetchtransaction}>Submit</button>
                </div>
               
                <table className="table mt-5 bg-dark text-white rounded mb-5">
                  <thead>
                    <tr>
                      <th scope="col">Address</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Coin</th>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Wallet Name</th>
                    </tr>
                  </thead>
                  <tbody>
                   { this.state.transactiondetails.map((tx,index) => {

                    return(

                      <tr key={index}>
                          <td>{tx.address }</td>
                          <td>{(tx.amount).slice(0,1)}</td>
                          <td>{tx.coin_short_name}</td>
                          <td>{tx.type}</td>
                          <td>{(tx.date).slice(0,10)}</td>
                          <td>{(tx.date).slice(10)}</td>
                          <td>{tx.wallet_name}</td>
                      </tr>

                    )   
                   })
                   }
                  </tbody>
                </table>                 
             
                </div>
                </div>

)
                } }

export default CryptoWallet;

