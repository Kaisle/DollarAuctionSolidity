var tc = require('truffle-contract');
var web3 = require('web3');
var simple_bank_abi = require('./build/contracts/SimpleBank.json');
var addr1 = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";

var MyContract = tc(simple_bank_abi);
MyContract.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

/* Dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530 */
if (typeof MyContract.currentProvider.sendAsync !== "function") {
  MyContract.currentProvider.sendAsync = function() {
    return MyContract.currentProvider.send.apply(
      MyContract.currentProvider, arguments
    );
  };
}

var deployed;
MyContract.deployed().then(function(instance) {
  var deployed = instance;
  //return instance.deposit({from: addr1, value: 51});
  return instance.balance();
}).then(function(result) {
  console.log(result)
});
