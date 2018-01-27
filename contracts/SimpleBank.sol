pragma solidity ^0.4.17;


contract SimpleBank {

  mapping (address => uint) private balances;

  address public owner;

  event LogDepositMade(address accountAddress, uint amount);

  function SimpleBank() public {
    owner = msg.sender;
  }

  function deposit() public payable returns (uint) {
      uint amount = msg.value;
      balances[owner] += amount;
      LogDepositMade(owner, amount);
      return balances[owner];
  }

  function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
    if(balances[owner] >= withdrawAmount) {
      balances[owner] -= withdrawAmount;
      if (!owner.send(withdrawAmount)) balances[owner] += withdrawAmount;
    }
    return balances[owner];
  }

  function balance() public constant returns (uint) {
    return balances[owner];
  }

  function () payable {
    revert();
  }








}
