// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenSwap {
    address public owner;
    IERC20 public token;

    event TokensSwapped(address indexed user, uint256 tokenAmount, uint256 ethAmount);

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function swapTokensForEth(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Token amount must be greater than 0");

        // Calculate ETH amount to be received based on a simple exchange rate (for example, 1 token = 0.01 ETH)
        uint256 ethAmount = tokenAmount * 10**16;

        require(token.balanceOf(msg.sender) >= tokenAmount, "Insufficient token balance");
        require(address(this).balance >= ethAmount, "Insufficient contract balance");

        // Transfer tokens from user to this contract
        require(token.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");

        // Transfer ETH to user
        payable(msg.sender).transfer(ethAmount);

        emit TokensSwapped(msg.sender, tokenAmount, ethAmount);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(token.balanceOf(address(this)) >= amount, "Insufficient contract balance");

        token.transfer(owner, amount);
    }

    function withdrawEth() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
