# EsfCoin Smart Contract

EsfCoin is a simple [BEP20](https://academy.binance.com/en/glossary/bep-20) token smart contract built with Solidity, Hardhat (TypeScript), and OpenZeppelin library.

## Overview

This contract creates a basic [BEP20](https://academy.binance.com/en/glossary/bep-20) token named EsfCoin (symbol: ESF). It utilizes OpenZeppelin's ERC20 implementation for standard token functionality.

## Features

- **Name**: EsfCoin
- **Symbol**: ESF
- **Initial Supply**: 1000 ESF tokens
- **Decimals**: 18

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- Hardhat

### Installation

1. Clone the repo
   
   ```sh
   https://github.com/EduardoSilva09/esfcoin_BEP20.git
   ```
   
2. Install NPM packages

   ```sh
   npm install
   ```
   
### Usage

1. Compile the smart contracts

   ```sh
   npm run compile
   ```

2. Run tests

   ```sh
   npm run test
   ```
   
3. Deploy the contract (if needed)

   ```sh
   npm run deploy:dev
   ```

### Contract Address
If deployed, the contract address will be on the local machine


## Development

### Libraries Used
  - [OpenZeppelin](https://www.openzeppelin.com/): Provides secure and community-vetted implementations of ERC20 and other standard contracts.


### Disclaimer
This contract is provided as-is with no warranties or guarantees. Use it at your own risk.
