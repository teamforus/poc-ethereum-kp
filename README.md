# API Hello World service

This service implements the Hello World example of Forus.io sprint 9, and will soon implement the Kindpakket functionality. 

## Running this image on docker

Building: `docker build --rm -f api\Dockerfile -t ethereum-api:latest api`

Running: `docker run --name <NAME> --rm -p <PORT>:80 -d ethereum-api` (e.g. `docker run --name ethereum-api --rm -p 3000:80 -d ethereum-api`)

### Configuration

The app requires a `config.json`. An example is found in `config.json.example`, although it misses certain data. 

### `coinbaseAddress`

The address of the coinbase (which has the Ether to make transactions)

### `coinbasePassword`

Used to unlock the coinbase account.

### `connectionString`

The string with URL and port number to connect to an Ethereum node

### `helloWorldAddress` 

The address of the Hello World contract.

## Usage

This PoC uses a HTTP connection to interact.

### `message/get` (GET)

Get the current message

Expected results: JSON response with `"name"` and `"message"` values

### `message/set` (POST)

Set the message. Requires a JSON body with `"name"` string and `"message"` string.

Expected results: JSON result with `"success"` with a value of `true` or `false` and an optional `"message"` response with human-readable response.