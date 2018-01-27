var bank = artifacts.require("./SimpleBank.sol")

module.exports = function(deployer) {
  deployer.deploy(bank)
  console.log("hey")
};
