var FundCoin = artifacts.require("./FundCoin.sol");
var Fund = artifacts.require("./Fund.sol");
var Fundraise = artifacts.require("./Fundraise.sol")

module.exports = function(deployer) {
  deployer.deploy(FundCoin, "FundCoin", "FDC", 0, 1000);
  deployer.deploy(Fund, "FundCoinFund");
  deployer.deploy(Fundraise);

};