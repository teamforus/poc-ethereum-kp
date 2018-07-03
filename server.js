
const config = require('./config.json');

const PORT = config['web']['port']
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config['ethereum']['connectionString']));
const kindPakketHelper = require('./kindpakket-token-contract');
kindPakketHelper.init(web3, config);
const helloWorldHelper = require('./hello-world-contract');
helloWorldHelper.init(web3, config);
const express = require('express');
var app = express();
app.use(express.json());

app.get('/v1/api/balance', (request, response) => {
    const address = false; // TODO get from URL
    if (!!address) {
        kindPakketHelper.getBalance(address).then((balance) => {
            console.log("balance: " + balance);
            response.send({balance: balance});
        });
    } else {
        response.send({success: false, message: 'Missing or invalid value `address`'});
    }
});

app.post('/v1/api/transfer', (request, response) => {
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
app.listen(PORT);
//app.listen(80);
console.log('App ready at ' + PORT);