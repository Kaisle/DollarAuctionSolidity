pragma solidity ^0.4.17;

contract DollarAuction {

  struct Bid {
    address sender;
    uint amount;
    uint time;
  }

  Bid[] bids;
  uint interval = 60;
  uint step = 1;
  uint minBid = 1000000000000000000;

  event LogBidMade(address accountAddress, uint amount, uint time);
  event LogBidFailed(address accountAddress, uint amount, uint time);
  event LogBidFinal(address accountAddress, uint amount, uint time, uint profit);
  event LogBidReturned(address accountAddress, uint amount, uint time);

  function bid() public payable returns (bool success) {
      uint amount = msg.value;
      uint lastBidAmount = getLastBidAmount();
      address sender = msg.sender;
      uint time = now;
      require(amount > minBid);
      require(amount > (lastBidAmount + step));
      Bid memory submitted_bid = Bid({time: now, sender: sender, amount: amount});
      bids.push(submitted_bid);
      LogBidMade(sender, amount, time);
      if (isBidFinal()) payout(sender, amount, time);
      return true;
  }

  function payout(address sender, uint amount, uint time) private returns (uint payout) {
    uint balance = this.balance;
    sender.transfer(balance);
    LogBidFinal(sender, amount, time, this.balance);
    delete bids;
    return balance;
  }

  function getLastBidAmount() constant public returns (uint lastBidAmount) {
    if (bids.length == 0) return 0;
    else return bids[bids.length-1].amount;
  }

  function getTotalBidded() constant public returns (uint totalBidded) {
    uint total = 0;
    for (uint i = 0; i < bids.length; i++) {
      total += bids[i].amount;
    }
    return total;
  }

  function isBidFinal() constant public returns (bool isFinal) {
    if (bids.length <= 1) return false;
    return ((bids[bids.length-1].time - bids[bids.length-2].time) > interval);
  }

  function getTimeOfLastBid() constant public returns (uint time) {
    if (bids.length == 0) return now;
    return bids[bids.length-1].time;
  }

  function getMinBid() constant public returns (uint minBid) {
    return minBid;
  }

  function () public payable {
    revert();
  }

}
