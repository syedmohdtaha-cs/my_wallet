pragma solidity >= 0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DaiToken is ERC20 {

// string public name;
// string public symbol;
uint256 public id;

constructor(uint256 initialSupply) public ERC20("Daitoken","DAI") {
    _mint(msg.sender, initialSupply);
}

function send(address payable _receiver) public payable {
    _receiver.transfer(msg.value);
  }

}