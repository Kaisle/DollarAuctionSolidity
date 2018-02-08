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

### Installation: ###

1. Clone: `git clone https://github.com/Kaisle/DollarAuctionSolidity && cd DollarAuctionSolidity`
2. Install node: `sudo apt-get install nodejs`
3. Install npm: `sudo apt-get install npm`
4. Install Trufle: `sudo npm install -g truffle`
5. Install Truffle HD Wallet: `sudo npm install truffle-hdwallet-provider --unsafe-perm=true --allow-root`
6. Install Truffle Contract: `sudo npm install truffle-contract --unsafe-perm=true --allow-root`
7. Install Web3 JS: `sudo npm install web3 --unsafe-perm=true --allow-root`
8. Install Ganache: `sudo npm install -g ganache-cli`
9. Set up a local blockchain: `ganache-cli`
 
### Running: ###

1. Run `sudo truffle migrate --reset` in root

You can now interact with the smart contract on your local blockchain.

### Using TruffleContract to make calls in JS: ###

1. Run `node interact.js` in root
2. Modify the code in `interact.js` to make your own calls

### Testing ###

1. Run `truffle test` in root

### Default parameters ###

1. Timer interval = 60 seconds
2. Minimum bid = 0.01 ETH
