var auction = artifacts.require("./PennyAuction.sol")

module.exports = function(deployer) {
  deployer.deploy(auction)
};
