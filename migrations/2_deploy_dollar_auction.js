var auction = artifacts.require("./DollarAuction.sol")

module.exports = function(deployer) {
  deployer.deploy(auction)
};
