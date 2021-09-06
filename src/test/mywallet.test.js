import 'chai';
import 'chai-as-promised';
import 'chai-bignumber'
import Web3 from 'web3';
// import DaiToken from "../abis/DaiToken.json"

const DaiToken = artifacts.require('./DaiToken')

const mywallet_test = () => {



    describe("test for token transfer", () =>  {


        it("value must be greater than 1" , async() = {
        
            await DaiToken.send("10").call()

        })
    }

}