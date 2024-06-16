// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface CASP {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract VEP {
    CASP public token;

    constructor(address tokenAddress) {
        token = CASP(tokenAddress);
    }

    function distribute(address from, address tou, address toc, uint256 aet, uint256 ucr) external {
        require(ucr >= 0 && ucr <= 100, "UCR should be between 0 and 100");

        uint256 User = aet * ucr / 100;
        uint256 Creator = aet * (100 - ucr) / 100;

        require(token.allowance(from, address(this)) >= aet, "Insufficient allowance");
        
        require(token.transferFrom(from, tou, User), "Transfer to first address failed");
        require(token.transferFrom(from, toc, Creator), "Transfer to second address failed");
    }
}
