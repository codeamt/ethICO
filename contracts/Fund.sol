pragma solidity ^0.4.24;

interface fundraise {
  function withdraw();
}

contract Fund {

  uint256 public balanceInWei;
  string public fundName;
  address public fundOwner;

  constructor(string _name) public {
    fundName = _name;
    fundOwner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == fundOwner);
    _;
  }

  function() public payable {

  }

  //Getters
  function fundName() public constant returns (string) {
    return fundName;
  }


  //Utility Functions
  function callWithdraw(address _currentFundraise) onlyOwner payable {
    fundraise(_currentFundraise).withdraw();
  }

  function getBalance() public returns (uint256) {
    balanceInWei = address(this).balance;
    return balanceInWei;
  }
}

