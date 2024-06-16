// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract CASP {
    string public name = "ZHENGold";
    string public symbol = "ZHEN";
    uint8 public decimals = 8;
    uint256 public totalSupply = 1000000 * 10**uint256(decimals);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    address[] public allAccounts;

    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = 0x27F66C1DAEB33B6a1670c221938B12D579372a9C;
        balanceOf[owner] = totalSupply;
        allAccounts.push(owner);
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= value, "Insufficient balance");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        if (balanceOf[to] == value) {
            allAccounts.push(to);
        }

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(from != address(0), "Invalid sender address");
        require(to != address(0), "Invalid recipient address");
        require(value <= allowance[from][msg.sender], "Insufficient allowance");
        require(value <= balanceOf[from], "Insufficient balance");

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;

        if (balanceOf[to] == value) {
            allAccounts.push(to);
        }

        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // 仅合约所有者可以调用的铸造函数
    function mint(uint256 amount) external onlyOwner {
        totalSupply += amount;
        balanceOf[owner] += amount;

        emit Transfer(address(0), owner, amount);
    }

    // 仅合约所有者（Genesis 文件中预置的地址）可以调用的销毁函数
    function burn(uint256 amount) external onlyOwner {
        require(balanceOf[owner] >= amount, "Insufficient balance");

        balanceOf[owner] -= amount;
        totalSupply -= amount;

        emit Transfer(owner, address(0), amount);
    }

    // 获取所有有余额的账户地址和对应余额
    function getAccountsWithBalance() external view returns (address[] memory, uint256[] memory) {
        uint256 count = allAccounts.length;
        
        address[] memory accounts = new address[](count);
        uint256[] memory balances = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            accounts[i] = allAccounts[i];
            balances[i] = balanceOf[allAccounts[i]];
        }
        
        return (accounts, balances);
    }
}
