pragma solidity ^0.4.23;

contract KindpakketToken {

    event Transfer(address from, address to, uint amount, uint requester);

    address owner = msg.sender;
    uint fundsize;
    mapping (address => uint) wallets;

    modifier requiresOwner(address sender) {
        require(sender == owner);
        _;
    }

    constructor (uint _fundsize) public {
        fundsize = _fundsize;
        wallets[msg.sender] = _fundsize;
    }

    function getBalance(address account) public view returns (uint balance) {
        return wallets[account];
    }

    function transfer(address from, address to, uint amount, uint requester) public requiresOwner(msg.sender) {
        require (wallets[from] >= amount);
        wallets[from] -= amount;
        wallets[to] += amount;
        emit Transfer(from, to, amount, requester);
    }
    
}