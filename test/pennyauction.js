var PennyAuction = artifacts.require("./PennyAuction.sol");
var minBid = 2000000000000000000;
var gas = 1200000;
var interval = 60000;

contract('PennyAuction', function(accounts) {
  it("starting bid amount should be 0", function() {
    return PennyAuction.deployed().then(function(instance) {
      return instance.getTotalBidded.call();
    }).then(function(totalBidded) {
      assert.equal(totalBidded.valueOf(), 0, "0 is start amount bidded");
    });
  });
  it("last bid amount should start at 0", function() {
    return PennyAuction.deployed().then(function(instance) {
      return instance.getLastBidAmount.call();
    }).then(function(bidded) {
      assert.equal(bidded.valueOf(), 0, "0 is last bid amount");
    });
  });
  it("bid should not be final if no bids recorded", function() {
    return PennyAuction.deployed().then(function(instance) {
      return instance.isBidFinal.call();
    }).then(function(isFinal) {
      assert.equal(isFinal.valueOf(), false, "false is whether bid is final");
    });
  });
  it("first bid below min amount should not be recorded", function() {
    return PennyAuction.deployed().then(function(instance) {
        return instance.bid.call({from: accounts[0], value: minBid*0.5, gas: gas});
    }).then(function(result) {
      assert.equal(result.valueOf(), false, "true is whether bid is success");
    }).catch(function(result) {

    });
  });
  it("first bid above min amount should be recorded", function() {
    return PennyAuction.deployed().then(function(instance) {
        return instance.bid.call({from: accounts[0], value: minBid, gas: gas});
    }).then(function(result) {
      assert.equal(result.valueOf(), true, "true is whether bid is success");
    });
  });
  it("next bid above previous amount should be recorded", function() {
    return PennyAuction.deployed().then(function(instance) {
        return instance.bid.call({from: accounts[0], value: minBid*2, gas: gas});
    }).then(function(result) {
      assert.equal(result.valueOf(), true, "true is whether bid is success");
    });
  });
  it("next bid below previous amount should not be recorded", function() {
    return PennyAuction.deployed().then(function(instance) {
        return instance.bid.call({from: accounts[0], value: minBid*2, gas: gas});
    }).then(function(result) {
      assert.equal(result.valueOf(), false, "true is whether bid is success");
    }).catch(function(result) {

    });
  });
});
