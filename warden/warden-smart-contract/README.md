## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### SetUp

```bash
forge init --no-commit
```

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```bash
source .env
```

```shell
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter --broadcast
forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Verify

```bash
export CONTRACT_ADDRESS=my-contract-address
cast code $CONTRACT_ADDRESS --rpc-url $RPC_URL
```

### Cast

```shell
$ cast <subcommand>
```

### call Contract method

```bash
cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
```

```bash
cast send $CONTRACT_ADDRESS "setNumber(uint256)" 42 \
  --private-key $PRIVATE_KEY \
  --rpc-url $RPC_URL
```

```bash
cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
```

```bash
cast send $CONTRACT_ADDRESS "increment()" \
  --private-key $PRIVATE_KEY \
  --rpc-url $RPC_URL
```

```bash
cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
