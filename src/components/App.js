import React from 'react';
import Wallet from './Wallet';
import Appcoin from './Appcoin';
import {Route, Switch , Link} from 'react-router-dom';
import Home from './Home';
import CryptoWallet from './CryptoWallet';


const App = () => {

    

    return(
        <> 
        <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/wallet" component={Wallet} />
                <Route path="/coinchanger" component={Appcoin} />
                <Route path="/cryptowallet" component={CryptoWallet} />
        </Switch>
        </>

        


    )


}

export default App;