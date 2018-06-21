// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import fundcoin_artifacts from '../../build/contracts/FundCoin.json'
import fund_artifacts from '../../build/contracts/Fund.json'
import fundraise_artifacts from '../../build/contracts/fundraise.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var FundCoin = contract(fundcoin_artifacts);
var Fund = contract(fund_artifacts);
var Fundraise = contract(fundraise_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var account1;


window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    FundCoin.setProvider(web3.currentProvider);
    Fund.setProvider(web3.currentProvider);
    Fundraise.setProvider(web3.currentProvider);

    var identifiedNetwork;

    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          identifiedNetwork = "Mainnet";
          console.log('This is mainnet');
          break;
        case "2":
          identifiedNetwork = "Morden";
          console.log('This is the deprecated Morden test network.');
          break;
        case "3":
          identifiedNetwork = "Ropsten";
          console.log('This is the ropsten test network.');
          break;
        case "4":
          identifiedNetwork = "Rinkeby";
          console.log('This is the Rinkeby test network.');
          break;
        case "42":
          identifiedNetwork = "Kovan";
          console.log('This is the Kovan test network.');
          break;
        default:
          identifiedNetwork = "Unknown";
          console.log('This is an unknown network.');
      }
    document.getElementById("identifiedNet").innerHTML = identifiedNetwork;
    });

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      // account1 = accounts[1];

      var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== account) {
          account = web3.eth.accounts[0];
          self.updateInterface();
        }
      }, 5000);

      document.getElementById("youraddress0").innerHTML = account;
      $("#youraddress0link").attr("href", "https://ropsten.etherscan.io/address/" + account);
      // document.getElementById("youraddress1").innerHTML = account1;

      web3.eth.getBalance(account, function(err,result){
        if(err){
          console.log(err);
          console.log("Error getting balance");
        } else{
          document.getElementById("youretherbalance0").innerHTML = web3.fromWei(result,'ether');
        }
      });

      // web3.eth.getBalance(account1, function(err,result){
      //   if(err){
      //     console.log(err);
      //     console.log("Error getting balance");
      //   } else{
      //     document.getElementById("youretherbalance1").innerHTML = web3.fromWei(result,'ether');
      //   }

      // });

      self.updateInterface();

    });
  },

  updateInterface: function() {
    var self = this;

    self.getTokenAddress();
    self.getFundraiseAddress();
    self.getFundAddress();
    self.getTokenName();
    self.getFundName();
    self.getTokenTotalSupply();
    self.getTokenSymbol();
    self.getTokenDecimals();
    self.getPercentageOwned();
    self.getFundEtherBalance();
    self.getFundraiseEtherBalance();
    self.getFundraiseStatus();
    self.getFundraiseTarget();
    self.getFundraiseisStarted();
    self.getFundraiseisTargetReached();
    self.getFundraiseDeadline();
    self.refreshTokenBalanceAccounts();
    self.refreshTokenBalanceFundraise();

  },

  refreshTokenBalanceAccounts: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      return token.balanceOf.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("yourtokenbalance0");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting balance; see log 1.");
    });

    // MassiToken.deployed().then(function(instance) {
    //   token = instance;
    //   return token.balanceOf.call(account1, {from: account1});
    // }).then(function(value) {
    //   var balance_element1 = document.getElementById("yourtokenbalance1");
    //   balance_element1.innerHTML = value.valueOf();
    // }).catch(function(e) {
    //   console.log(e);
    //   console.log("Error getting balance; see log 2.");
    // });

  },

  refreshTokenBalanceFundraise: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      var fundraiseaddress = document.getElementById("fundraiseaddress").innerHTML;
      return token.balanceOf(fundraiseaddress);
    }).then(function(tokenbalancefundraise) {
      var balance_element2 = document.getElementById("fundraisetokenbalance");
      balance_element2.innerHTML = tokenbalancefundraise.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting balance; see log 3.");
    });

  },

  getTokenAddress: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      return token.address;
    }).then(function(address) {
      var address_element = document.getElementById("tokenaddress");
      address_element.innerHTML = address.valueOf();
      var contribution_element = document.getElementById("OpenFundraiseFormTokenReward");
      contribution_element.value = address.valueOf();
      $("#tokenaddresslink").attr("href", "https://ropsten.etherscan.io/address/" + address.valueOf());
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting address; see log.");
    });
  },

  getFundraiseAddress: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      return fundraise.address;
    }).then(function(address) {
      var fundraise_address_element = document.getElementById("fundraiseaddress");
      fundraise_address_element.innerHTML = address.valueOf();
      $("#fundraiseaddresslink").attr("href", "https://ropsten.etherscan.io/address/" + address.valueOf());
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting address; see log.");
    });
  },

  getFundraiseTarget: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      return fundraise.minimumTargetInWei.call();
    }).then(function(mintarget) {
      var fundraise_target_element = document.getElementById("fundraisetarget");
      fundraise_target_element.innerHTML = web3.fromWei(mintarget.valueOf());
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting fundraising target; see log.");
    });
  },

  getFundraiseStatus: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      return fundraise.fundraiserOpen.call();
    }).then(function(fundraisestatus) {
      var status_element = document.getElementById('isfundraiseopen');
      status_element.innerHTML = fundraisestatus.toString();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting fundraise status; see log.");
    });
  },

  getFundraiseisStarted: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      return fundraise.fundraiserCommenced.call();
    }).then(function(started) {
      var started_element = document.getElementById('hasfundraisestarted');
      started_element.innerHTML = started.toString();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting whether fundraise was started; see log.");
    });
  },

  getFundraiseisTargetReached: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      return fundraise.targetReached.call();
    }).then(function(targetreach) {
      var target_reach_element = document.getElementById('isfundraisetargetreached');
      target_reach_element.innerHTML = targetreach.toString();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting whether fundraise target was reached; see log.");
    });
  },

  getFundAddress: function() {
    var self = this;

    var fund;
    Fund.deployed().then(function(instance) {
      fund = instance;
      return fund.address;
    }).then(function(address) {
      var fund_address_element = document.getElementById("fundaddress");
      fund_address_element.innerHTML = address.valueOf();
      var contribution_element = document.getElementById("OpenFundraiseFormBeneficiary");
      contribution_element.value = address.valueOf();
      $("#fundaddresslink").attr("href", "https://ropsten.etherscan.io/address/" + address.valueOf());
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting address; see log.");
    });
  },

  getFundName: function() {
    var self = this;

    var fund;
    Fund.deployed().then(function(instance) {
      fund = instance;
      return fund.fundName.call();
    }).then(function(ilnome) {
      var fund_name_element = document.getElementById("fundname");
      fund_name_element.innerHTML = ilnome.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting fund name; see log.");
    });
  },

  getFundraiseDeadline: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      return fundraise.deadline.call();
    }).then(function(deadline) {
      var newDate = new Date();
      newDate.setTime(parseInt(deadline)*1000);
      var dateString = newDate.toUTCString();
      var deadline_element = document.getElementById('fundraisedeadline');
      deadline_element.innerHTML = dateString;
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting fundraise deadline; see log.");
    });
  },

  getTokenTotalSupply: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      return token.totalSupply.call();
    }).then(function(supply) {
      var totalsupply_element = document.getElementById("tokentotalsupply");
      totalsupply_element.innerHTML = supply.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting token total supply; see log.");
    });
  },

  getTokenName: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      return token.name.call();
    }).then(function(name) {
      var name_element = document.getElementById("tokenname");
      name_element.innerHTML = name.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting token name; see log.");
    });
  },

  getTokenSymbol: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      return token.symbol.call();
    }).then(function(symbol) {
      var symbol_element = document.getElementById("tokensymbol");
      symbol_element.innerHTML = symbol.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting token symbol; see log.");
    });
  },

  getTokenDecimals: function() {
    var self = this;

    var token;
    FundCoin.deployed().then(function(instance) {
      token = instance;
      return token.decimals.call();
    }).then(function(decimals) {
      var decimals_element = document.getElementById("tokendecimals");
      decimals_element.innerHTML = decimals.valueOf();
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting token decimals; see log.");
    });
  },

  getFundEtherBalance: function() {
    var self = this;

    var fund;
    Fund.deployed().then(function(instance) {
      fund = instance;
      web3.eth.getBalance(fund.address, function(error,result){
        if(error){
          console.log(error);
        } else {
          var balance_element = document.getElementById("fundetherbalance");
          var balanceinEther = web3.fromWei(result, 'ether');
          balance_element.innerHTML = balanceinEther.valueOf();
        }
      });
    });
  },

  getFundraiseEtherBalance: function() {
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function(instance) {
      fundraise = instance;
      web3.eth.getBalance(fundraise.address, function(error,result){
        if(error){
          console.log(error);
        } else {
          var balance_element = document.getElementById("fundraiseetherbalance");
          var balanceinEther = web3.fromWei(result, 'ether');
          balance_element.innerHTML = balanceinEther.valueOf();
        }
      });
    });
  },

  getPercentageOwned: function() {
    var self = this;

    let balanceofcurrentaddress0;
    let balanceofcurrentaddress1;

    var token;
    Fundraise.deployed().then(function(instance) {
      token = instance;
      return token.balanceOf.call(account, {from: account});
    }).then(function(value) {
      balanceofcurrentaddress0 = value.valueOf();
      return token.totalSupply.call();
    }).then(function(supply) {
      var totalSupply = supply.valueOf();
      var percentage = balanceofcurrentaddress0/totalSupply * 100;
      document.getElementById("tokenpercentage0").innerHTML = percentage;
    }).catch(function(e) {
      console.log(e);
      console.log("Error getting percentage; see log.");
    });
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    console.log("Initiating transaction... (please wait)");

    var coin;
    FundCoin.deployed().then(function(instance) {
      coin = instance;
      return coin.sendCoin(receiver, amount, {from: account});
    }).then(function() {
      console.log("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      console.log("Error sending coin; see log.");
    });
  },

  launchFundraise: function(){
    var self = this;

    var target = parseInt(document.getElementById('OpenFundraiseFormMinimumTarget').value);
    var timeopeninminutes = parseInt(document.getElementById('OpenFundraiseFormDeadline').value);
    var priceoftokeninether = parseInt(document.getElementById('OpenFundraiseFormPriceOfToken').value);
    var tokentobeusedasreward = document.getElementById('OpenFundraiseFormTokenReward').value;
    var fundraisebeneficiary = document.getElementById('OpenFundraiseFormBeneficiary').value;

    var fundraise;
    Fundraise.deployed().then(function (instance) {
      fundraise = instance;
      return fundraise.launchCampaign(timeopeninminutes,
        target, tokentobeusedasreward, priceoftokeninether,
        fundraisebeneficiary, {from: account, gas: 1000000});
    }).then(function() {
      console.log("Fundraise Launch successful");
      self.getFundraiseStatus();
      self.getFundraiseisStarted();
      self.getFundraiseTarget();
      self.getFundraiseDeadline();
      self.getFundraiseisTargetReached();
    }).catch(function(e) {
      console.log(e);
      console.log("Error launching Fundraise; see log.");
    });
  },

  contributeToFundraiseApp: function(){
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function (instance) {
      fundraise = instance;
      return web3.toWei(parseInt(document.getElementById('ContributeDropdownFormAmount').value),'ether');
    }).then(function(contrib){
      return fundraise.contributeToCampaign({from: web3.eth.accounts[0], value: contrib, gas: 1000000});
    }).then(function() {
      console.log("Contribution Successful");
      self.refreshTokenBalanceAccounts();
      self.refreshTokenBalanceFundraise();
      self.getFundraiseEtherBalance();
    }).catch(function(e) {
      console.log(e);
      console.log("Error contributing to Fundraise; see log.");
    });
  },

  withdrawAmountsApp: function(){
    var self = this;

    var fundraiseaddress = document.getElementById("fundraiseaddress").innerHTML;

    var fund;
    Fund.deployed().then(function (instance) {
      fund = instance;
      return fund.callWithdraw(fundraiseaddress, {from: account});
    }).then(function() {
      console.log("Success in withdrawing amount");
      self.getFundEtherBalance();
      self.getFundraiseEtherBalance();
      self.refreshTokenBalanceFundraise();
    }).catch(function(e) {
      console.log(e);
      console.log("Error withdrawing amounts; see log.");
    });
  },

  checkFundraiseStatus: function(){
    var self = this;

    var fundraise;
    Fundraise.deployed().then(function (instance) {
      fundraise = instance;
      return fundraise.checkCampaignStatus({from: account});
    }).then(function() {
      console.log("Success in checking fundraise status");
      self.getFundraiseisTargetReached();
      self.getFundraiseStatus();
    }).catch(function(e) {
      console.log(e);
      console.log("Error checking Fundraise status; see log.");
    });
  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  App.start();
});
