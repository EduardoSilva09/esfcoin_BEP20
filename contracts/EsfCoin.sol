// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title EsfCoin
 * @dev ERC20 token contract with minting functionality.
 */
contract EsfCoin is ERC20 {
    address private _owner;
    uint private _mintAmount = 0;
    uint64 private _mintDelay = 60 * 60 * 24;

    mapping(address => uint256) private nexMint;
    /**
     * @dev Constructor function
     * @notice initialSupply Initial supply of ESF tokens minted to the contract creator
     */
    constructor() ERC20("EsfCoin", "ESF") {
        _owner = msg.sender;
        _mint(_msgSender(), 1000000 * 10 ** 18);
    }
    /**
     * @dev Mints tokens to a specified address.
     * @param to The address to which tokens will be minted.
     * Requirements:
     * - Minting must be enabled (_mintAmount > 0).
     * - Caller must wait the required delay since the last minting operation.
     *
     */
    function mint(address to) public restricted {
        require(_mintAmount > 0, "Minting is not enabled.");
        require(
            block.timestamp > nexMint[to],
            "You cannot mint twice in a row."
        );
        _mint(to, _mintAmount);
        nexMint[to] = block.timestamp + _mintDelay;
    }

    /**
     * @dev Sets the amount of tokens to mint on each minting operation.
     * @param newAmount New minting amount
     */
    function setMintingAmount(uint newAmount) public restricted {
        _mintAmount = newAmount;
    }
    /**
     * @dev Sets the delay required between consecutive minting operations.
     * @param newDelayInSeconds New minting delay in seconds
     */
    function setMintingDelay(uint64 newDelayInSeconds) public restricted {
        _mintDelay = newDelayInSeconds;
    }
    /**
     * @dev Modifier that allows only the contract owner to execute the function.
     */
    modifier restricted() {
        require(_owner == msg.sender, "You do not have permission.");
        _;
    }
}
