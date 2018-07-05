
const config = require('./config.json');

const PORT = config['web']['port']
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config['ethereum']['connectionString']));
const kindPakketHelper = require('./kindpakket-token-contract');
kindPakketHelper.init(web3, config);
const express = require('express');
var app = express();
app.use(express.json());

app.get('/api/v1/balance/:token/:address', (request, response) => {
    const token = request.params.token;
    const address = request.params.address;
    if (!!token && !!address) {
        kindPakketHelper.getBalance(token, address).then((balance) => {
            console.log("balance: " + balance);
            response.send({balance: balance});
        });
    } else {
        response.send({success: false, message: 'Missing or invalid value `address`'});
    }
});

app.post('/api/v1/transfer', (request, response) => {
    const to = request.body['to'];
    const from = request.body['from'];
    const amount = request.body['amount'];
    const requester = request.body['requester'];
    var message = null;
    if (!to) message = 'Missing or invalid value `to`';
    else if (!from) message = 'Missing or invalid value `from`';
    else if (!requester) message = 'Missing or invalid value `requester`';
    else if (!amount || amount <= 0) message = 'Missing or invalid value `amount`';
    if (message === null) {
        kindPakketHelper.transfer(from, to, amount, requester);
        response.send({body: 'Transaction handled, me thinks.', success: true});
    } else {
        response.send({success: false, message: message});
    }
});

app.put('/api/v1/token', (request, response) => {
    const owner = request.body['owner'];
    const fundSize = request.body['fundSize'];
    var error = null;
    if (!owner) error = 'Missing or invalid value `owner`';
    else if (!fundSize || fundSize <= 0) error = 'Missing or invalid value `fundSize`';
    if (error === null) {
        kindPakketHelper.createToken(owner, fundSize).then((address) => {
            response.send({address: address, success: true});
        }).catch((error) => {
            response.send({success: false, message: error});
        });
    } else {
        response.send({success: false, message: error});
    }
});

app.put('/api/v1/user', (request, response) => {
    response.send({address: kindPakketHelper.createKey()});
});

app.listen(PORT);
console.log('App ready at ' + PORT);