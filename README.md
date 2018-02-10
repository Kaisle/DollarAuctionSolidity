# A simple dollar auction #

## Implemented in Solidity using Truffle. ##   

### Rules: ###

1. Player 1 places his bid
2. Player 2 places his bid (has to match the previous bid)
3. If no other player places a bid within the next minute, Player 2 receives the full reward
4. If Player 1 (or some other player) places a matching bid, the timer is reset
5. Players keep bidding until the timer runs out
6. Game Theory and the Sunk Cost Fallacy dictates that the timer will never run out and the pool of bids will grow infinitely large until all money has been spent
7. The only globally optimal solution for all players is to not play the game unless one can be sure that he will be the only player

[Dollar Auction on Wikipedia](https://en.wikipedia.org/wiki/Dollar_auction)

### Live contract ###

Ropsten Test Network: https://ropsten.etherscan.io/address/0x60d772Fa8E8B98c50Bb370892B0696f12beD83d5 

### Installation: ###

1. Clone: `git clone https://github.com/Kaisle/DollarAuctionSolidity && cd DollarAuctionSolidity`
2. `npm install`
3. Set up a local blockchain: `ganache-cli`
 
### Running: ###

1. Run `sudo truffle migrate --reset` in root

You might need to configure truffle.js to point to your local blockchain:

`  development: {
       host: "localhost", // IP here
       port: 7545, // Port number here
       network_id: "*" // Match any network id
     },`

You can now interact with the smart contract on your local blockchain.

### Using TruffleContract to make calls in JS: ###

1. Run `node interact.js` in root
2. Modify the code in `interact.js` to make your own calls using the Web3 and Truffle-Contract API's. 

### Testing ###

1. Run `truffle test` in root

### Default parameters ###

1. Timer interval = 60 seconds
2. Minimum bid = 0.01 ETH
