# EsfCoin Smart Contract

EsfCoin is a simple [BEP20](https://academy.binance.com/en/glossary/bep-20) token smart contract built with Solidity, Hardhat (TypeScript), and OpenZeppelin library.

## Overview

This contract creates a basic [BEP20](https://academy.binance.com/en/glossary/bep-20) token named EsfCoin (symbol: ESF). It utilizes OpenZeppelin's ERC20 implementation for standard token functionality.

## Contract Details

- **Name**: EsfCoin
- **Symbol**: ESF
- **Initial Supply**: 1000 ESF tokens
- **Decimals**: 18

## ERC20 Compliance

The contract extends the ERC20 standard, providing methods to:
- Transfer tokens (`transfer`, `transferFrom`, `approve`)
- Check token balances (`balanceOf`)
- Approve spending (`allowance`)

## Additional Features

### Minting Functionality

The contract includes a minting feature that allows:
- **Minting Amount:** The amount of tokens to mint on each call to `mint()`.
- **Minting Delay:** The time delay in seconds required between consecutive minting operations for each address.

### Owner Controls

The owner of the contract has exclusive rights to:
- Enable or disable minting.
- Adjust the minting amount and delay.

## Functions

- **constructor:** Initializes the contract with an initial supply of 1000 ESF tokens and sets the contract creator as the owner.
  
- **mint:** Allows eligible addresses to mint tokens based on the current `_mintAmount` and `_mintDelay`. Requires that minting is enabled and that the caller has waited the required delay since the last minting operation.

- **setMintingAmount:** Sets a new value for `_mintAmount`. Only accessible to the contract owner.

- **setMintingDelay:** Sets a new value for `_mintDelay`. Only accessible to the contract owner.

## Modifiers

- **restricted:** Ensures that only the contract owner can execute certain functions by checking if `msg.sender` matches `_owner`.

## Security Considerations

- The `restricted` modifier ensures that critical functions (`setMintingAmount` and `setMintingDelay`) can only be accessed by the contract owner, preventing unauthorized changes to minting parameters.

- The `mint` function includes checks to prevent unauthorized minting and enforces a delay between minting operations to control token supply inflation.

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
