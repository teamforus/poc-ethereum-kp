
var contract = null;
var web3 = null;
var sender = null;
var senderPassword = null;
module.exports = {
    'init': (_web3, config) => {
        const address = config['ethereum']['kindpakketAddress'];
        sender = config['ethereum']['coinbaseAddress'];
        senderPassword = config['ethereum']['coinbasePassword'];
        web3 = _web3;
        contract = new web3.eth.Contract(
            // ABI
            [{ "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "fundSize", "type": "uint256" }], "name": "NewToken", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "requester", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "owner", "type": "address" }, { "name": "fundSize", "type": "uint256" }], "name": "createToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "token", "type": "address" }, { "name": "account", "type": "address" }], "name": "getBalance", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "requester", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            // address
            address,
            // something null
            null
        );
    },

    'createKey': () => {
        return web3.eth.accounts.create()['address'];
    },

    'createToken': (owner, fundSize) => {
        return web3.eth.personal.unlockAccount(sender, senderPassword, 30).then((unlocked) => {
            const account = web3.eth.accounts.create();
            const address = account['address'];
            const method = contract.methods.createToken(address, owner, fundSize);
            const transaction = {
                from: sender,
                to: contract._address,
                value: 0,
                gas: 91000,
                gasPrice: 0,
                chainId: 1492,
                data: method.encodeABI()
            };
            return web3.eth.sendTransaction(transaction).then(() => {
                return address;
            }).catch((error) => {
                throw error;
            });
        });
    },

    'getBalance': (token, ofAddress) => {
        const method = contract.methods.getBalance(token, ofAddress);
        const address = contract._address;
        return web3.eth.call({
            to: address,
            data: method.encodeABI()
        }).then((result) => {
            const balance = web3.utils.hexToNumberString(result);
            return balance;
        }).catch((error) => {
            console.error(error);
            return -1;
        });
    },

    'transfer': (from, to, amount, requester) => {
        web3.eth.personal.unlockAccount(sender, senderPassword, 30).then((unlocked) => {
            const method = contract.methods.transfer(from, to, amount, requester);
            const transaction = {
                from: sender,
                to: contract._address,
                value: 0,
                gas: 91000,
                gasPrice: 0,
                chainId: 1492,
                data: method.encodeABI()
            };
            web3.eth.sendTransaction(transaction).catch((error) => {
                throw error;
            });
        }).catch((error) => {
            console.error(error);
        });
    }
}