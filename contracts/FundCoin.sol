pragma solidity ^0.4.24;


contract FundCoin {
  //For Storage
  string public name;
  string public symbol;
  uint256 public decimals;
  uint256 public totalSupply;

  mapping (address => uint256) public balances;

  constructor(string _name, string _symbol, uint256 _decimals, uint256 _initialSupply) public {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply = _initialSupply * 10 ** decimals;
    balances[msg.sender] = totalSupply;
  }

  function() public{
    assert(true == false);
  }


  //Getters
  function totalSupply() public constant returns (uint) {
    return totalSupply;
  }

  function name() public constant returns (string) {
    return name;
  }

  function symbol() public constant returns (string) {
    return symbol;
  }

  function decimals() public constant returns (uint256) {
    return decimals;
  }

  //Utility Functions
  function balanceOf(address _owner) public constant returns (uint256) {
    return balances[_owner];
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    //Check basic conditions
    require(balances[msg.sender] >= _value);
    require(_to != 0x0);
    require(_value > 0);

    //Another check for assertion
    uint previousBalances = balances[msg.sender] + balances[_to];

    // Executes the transfer
    balances[msg.sender] -= _value;
    balances[_to] += _value;

    // Assert that the total of before is equal to the total of now
    assert(balances[msg.sender] + balances[_to] == previousBalances);

    return true;
  }
 }