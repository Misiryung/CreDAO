// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface CASP {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract VEP {
    CASP public ZHENGold;

    constructor(address CASPAddress) {
        ZHENGold = CASP(CASPAddress);
    }

    function adpay(
        address creator,
        address user,
        uint256 ucr,
        uint256 cpv
    ) external {
        require(ucr >= 0 && ucr <= 100, "UCR should be between 0 and 100");

        uint256 userShare = cpv * ucr / 100;
        uint256 creatorShare = cpv * (100 - ucr) / 100;

        require(ZHENGold.balanceOf(msg.sender) >= cpv, "Insufficient balance");

        require(ZHENGold.transferFrom(msg.sender, user, userShare), "Transfer to user failed");
        require(ZHENGold.transferFrom(msg.sender, creator, creatorShare), "Transfer to creator failed");
    }
}
