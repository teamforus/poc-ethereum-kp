pragma solidity ^0.4.23;

contract KindpakketToken {

    event NewToken(address token, address owner, uint fundSize);
    event Transfer(address token, address from, address to, uint amount, uint requester);

    //      (token => owner)
    mapping (address => address) tokenOwners;
    //      (token ( account => amount ))
    mapping (address => mapping (address => uint)) wallets;

    modifier requiresOwner(address token, address sender) {
        require(sender == tokenOwners[token]);
        _;
    }

    function createToken(address token, address owner, uint fundSize) public {
        require (!tokenExists(token));
        tokenOwners[token] = owner;
        wallets[token][owner] = fundSize;
        emit NewToken(token, owner, fundSize);
    }

    function getBalance(address token, address account) public view returns (uint balance) {
        return wallets[token][account];
    }

    function tokenExists(address token) private view returns (bool exists) {
        return tokenOwners[token] != 0x0;
    }

    function transfer(address token, address from, address to, uint amount, uint requester) public requiresOwner(token, msg.sender) {
        require (wallets[token][from] >= amount);
        wallets[token][from] -= amount;
        wallets[token][to] += amount;
        emit Transfer(token, from, to, amount, requester);
    }
    
}