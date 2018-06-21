pragma solidity ^0.4.24;

interface fundcoin {
  function transfer(address _to, uint256 value);
}

contract Fundraise {

  bool public fundraiserCommenced = false;
  bool public fundraiserOpen = false;
  uint256 public deadline;

  uint256 public minimumTargetInWei;
  bool public targetReached = false;

  uint256 public currentRaisedAmountInWei = 0;

  fundcoin public tokenToBeUsedAsReward;
  uint256 public tokenPriceInWei;

  address public fundraiserBeneficiary;
  address public fundraiserOwner;

  mapping(address => uint256) public balances;

  //Constructor
  constructor() public {
    fundraiserOwner = msg.sender;
  }

  //Modifiers
  modifier onlyOwner {
    require(msg.sender == fundraiserOwner);
    _;
  }

  modifier ifCampaignHasStarted() {
    require(fundraiserCommenced == true);
    _;
  }

  modifier ifCampaignHasConcluded() {
    require(fundraiserOpen == false && fundraiserCommenced == true);
    _;
  }

  modifier ifCampaignInProgress() {
    require(fundraiserOpen == true && fundraiserCommenced == true);
    _;
  }

  modifier ifCampaignStartedNull() {
    require(fundraiserOpen == false && fundraiserCommenced == false);
    _;
  }


  //Helpers
  function launchCampaign(uint256 _timeOpenInMinutes, uint256 _minimumTargetEth, address _campaignToken, uint256 _tokenPriceEth, address _fundraiseBeneficiary) public onlyOwner ifCampaignStartedNull {
    fundraiserOpen = true;
    fundraiserCommenced = true;
    deadline = now + (_timeOpenInMinutes * 1 minutes);
    minimumTargetInWei = _minimumTargetEth * 1 ether;
    tokenToBeUsedAsReward = fundcoin(_campaignToken);
    tokenPriceInWei = _tokenPriceEth;
    fundraiserBeneficiary = _fundraiseBeneficiary;
  }

  function checkCampaignStatus() public ifCampaignHasStarted {
    if(now >= deadline) {
      fundraiserOpen = false;
    }

    if(currentRaisedAmountInWei >= currentRaisedAmountInWei) {
      targetReached = true;
    }
  }

  function contributeToCampaign() public payable ifCampaignInProgress{
    uint amount = msg.value;
    balances[msg.sender] += amount;
    currentRaisedAmountInWei += amount;
    tokenToBeUsedAsReward.transfer(msg.sender, amount / tokenPriceInWei);
  }

  function withdraw() public payable ifCampaignHasConcluded {
    if(targetReached == false) {
      uint amount = balances[msg.sender];
      balances[msg.sender] = 0;
      if(msg.sender.send(amount)) {
        tokenToBeUsedAsReward.transfer(fundraiserOwner, amount / tokenPriceInWei);
      }
    } else if (targetReached == true && fundraiserBeneficiary == msg.sender) {
      if(fundraiserBeneficiary.send(currentRaisedAmountInWei)) {

      } else {
        targetReached = false;
      }
    }
  }
}