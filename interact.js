var tc = require('truffle-contract');
var web3 = require('web3');
var simple_bank_abi = require('./build/contracts/SimpleBank.json');
var penny_auction_abi = require('./build/contracts/PennyAuction.json');
var addr1 = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544";

var SimpleBank = tc(simple_bank_abi);
var PennyAuction = tc(penny_auction_abi);

var contracts = [];
contracts.push(SimpleBank);
contracts.push(PennyAuction);

for (i = 0; i < contracts.length; i++) {
  contract = contracts[i];
  contract.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider, arguments
      );
    };
  }
}

/*console.log(web3);
web3.modules.Eth.defaultAccount = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
console.log("balance ", web3.modules.Eth.getBalance());*/


var deployed;
PennyAuction.deployed().then(function(instance) {
  var deployed = instance;
  var contract = PennyAuction.at("0x8cdaf0cd259887258bc13a92c0a6da92698644c0");
  deployed.bid({from: addr1, value: web3.utils.toWei('5', 'ether'), gas: 1200000}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });
  /*deployed.bid({from: addr1, value: 80, gas: 120000}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });*/
  deployed.getLastBidAmount.call({from: addr1}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });
  deployed.getTotalBidded.call({from: addr1}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });
  deployed.isBidFinal.call({from: addr1}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });
  deployed.getTimeOfLastBid.call({from: addr1}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });
  //console.log(deployed.contract._eth);
  /*deployed.contract._eth.getBalance({from: addr1}).then(function(result){
    console.log(result);
  }).catch(function(error){
    console.log(error)
  });*/
}).then(function(result) {
  console.log(result);
}).catch(function(error){
  console.log(error)
});
