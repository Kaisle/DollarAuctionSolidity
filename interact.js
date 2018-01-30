var tc = require('truffle-contract');
var web3 = require('web3');
var penny_auction_abi = require('./build/contracts/DollarAuction.json');
var addr1 = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544";
var chain_address = "http://localhost:7545";
var ethToBid = '12';
var PennyAuction = tc(penny_auction_abi);
var contracts = [];
var deployed;

contracts.push(PennyAuction);
assignProviders(contracts);

PennyAuction.deployed().then(function(instance) {
  var deployed = instance;
  deployed.bid({from: addr1, value: web3.utils.toWei(ethToBid, 'ether'), gas: 1200000}).then(done).catch(done);
  deployed.getLastBidAmount.call({from: addr1}).then(done).catch(done);
  deployed.getTotalBidded.call({from: addr1}).then(done).catch(done);
  deployed.isBidFinal.call({from: addr1}).then(done).catch(done);
  deployed.getTimeOfLastBid.call({from: addr1}).then(done).catch(done);
  deployed.getArray.call({from: addr1}).then(done).catch(done);
}).then(done).catch(done);

function done(result) {
  console.log(result);
}

function assignProviders(contracts) {
  for (i = 0; i < contracts.length; i++) {
    contract = contracts[i];
    contract.setProvider(new web3.providers.HttpProvider(chain_address));
    if (typeof contract.currentProvider.sendAsync !== "function") {
      contract.currentProvider.sendAsync = function() {
        return contract.currentProvider.send.apply(
          contract.currentProvider, arguments
        );
      };
    }
  }
}
