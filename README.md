#A simple dollar auction#

## Implemented in Solidity using Truffle. ##   

### Rules: ###

1. Player 1 places his bid
2. Player 2 places his bid (has to match the previous bid)
3. If no other player places a bid within the next 10 minutes, Player 2 receives the full reward
4. If Player 1 (or some other player) places a matching bid, the timer is reset
5. Players keep bidding until the timer runs out
6. Game Theory and the Sunk Cost Fallacy dictates that the timer will never run out and the pool of bids will grow infinitely large until all money has been spent
7. The only globally optimal solution for all players is to not play the game unless one can be sure that he will be the only player

[Dollar Auction on Wikipedia](https://en.wikipedia.org/wiki/Dollar_auction)

### Running: ###

1. Install node and truffle
2. Set up a local blockchain using Ganache (or similar) and modify truffle.js to point to it
3. Run `truffle migrate --reset` in root
4. You can now interact with the smart contract on your local blockchain

### Using TruffleContract to make calls in JS: ###

1. Modify `chain_address` in `interact.js` to point to the ip of your own blockchain
2. Modify `addr1` in `interact.js` to point to an address registered on that blockchain
3. Run `node interact.js` in root
4. Modify the code in `interact.js` to make your own calls

### Testing ###

1. Run `truffle test` in root
