
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
            [{"inputs":[{"name":"_fundsize","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"requester","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"getBalance","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"},{"name":"requester","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
            // address
            address,
            // something null
            null
        );
    },

    'getBalance': (ofAddress) => {
        const method = contract.methods.getBalance(ofAddress);
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
        web3.eth.personal.unlockAccount(sender, senderPassword, 750).then((unlocked) => {
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