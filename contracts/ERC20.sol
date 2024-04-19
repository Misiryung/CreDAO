// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract ERC20 {
    string public name = "ZHENGold"; // 代币名称
    string public symbol = "ZHEN";    // 代币符号
    uint8 public decimals = 8;        // 代币小数位
    uint256 public totalSupply = 999 * 10**uint256(decimals); // 总供应量

    mapping(address => uint256) public balanceOf;
    address[] public allAccounts; // 存储所有有余额的账户地址

    address public owner; // Genesis 文件中预置的地址

    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = 0x27F66C1DAEB33B6a1670c221938B12D579372a9C; // 设置合约创建者为 Genesis 文件中预置的地址
        balanceOf[owner] = totalSupply;
        allAccounts.push(owner); // 添加合约拥有者地址到 allAccounts 数组
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= value, "Insufficient balance");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        // 如果接收者地址不在 allAccounts 数组中，则添加到数组中
        if (balanceOf[to] == value) {
            allAccounts.push(to);
        }

        emit Transfer(msg.sender, to, value);
        return true;
    }

    // 仅合约所有者（Genesis 文件中预置的地址）可以调用的铸造函数
    function mint(address account, uint256 amount) external onlyOwner {
        require(account != address(0), "Invalid address");

        totalSupply += amount;
        balanceOf[account] += amount;

        // 如果账户地址不在 allAccounts 数组中，则添加到数组中
        if (balanceOf[account] == amount) {
            allAccounts.push(account);
        }

        emit Transfer(address(0), account, amount);
    }

    // 仅合约所有者（Genesis 文件中预置的地址）可以调用的销毁函数
    function burn(address account, uint256 amount) external onlyOwner {
        require(account != address(0), "Invalid address");
        require(balanceOf[account] >= amount, "Insufficient balance");

        balanceOf[account] -= amount;
        totalSupply -= amount;

        // 如果账户地址的余额减为 0，则从 allAccounts 数组中移除
        if (balanceOf[account] == 0) {
            removeAccount(account);
        }

        emit Transfer(account, address(0), amount);
    }

    // 从 allAccounts 数组中移除指定地址
    function removeAccount(address account) private {
        for (uint256 i = 0; i < allAccounts.length; i++) {
            if (allAccounts[i] == account) {
                allAccounts[i] = allAccounts[allAccounts.length - 1];
                allAccounts.pop();
                return;
            }
        }
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