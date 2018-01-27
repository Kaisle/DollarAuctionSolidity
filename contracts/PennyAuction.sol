pragma solidity ^0.4.17;

contract PennyAuction {

  struct Bid {
    address sender;
    uint amount;
    uint time;
  }

  Bid[] bids;
  uint interval = 60;
  uint profit = 1000;

  event LogBidMade(address accountAddress, uint amount, uint time);
  event LogBidFailed(address accountAddress, uint amount, uint time);
  event LogBidFinal(address accountAddress, uint amount, uint time, uint profit);
  event LogBidReturned(address accountAddress, uint amount, uint time);

  function bid() public payable returns (bool success) {
      uint amount = msg.value;
      uint lastBidAmount = getLastBidAmount();
      address sender = msg.sender;
      uint time = now;
      if (amount <= lastBidAmount) {
        LogBidFailed(sender, amount, time);
        sender.transfer(amount);
        LogBidReturned(sender, amount, time);
        return false;
      }
      Bid memory submitted_bid = Bid({time: now, sender: sender, amount: amount});
      bids.push(submitted_bid);
      LogBidMade(sender, amount, time);
      if (isBidFinal()) {
        sender.transfer(this.balance);
        LogBidFinal(sender, amount, time, profit);
        delete bids;
        return true;
      }
      else return true;
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

  function () public payable {
    revert();
  }

}
