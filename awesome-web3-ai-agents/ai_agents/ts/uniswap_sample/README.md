# Uniswap V3 の機能をスクリプトから呼び出すサンプルコード

## テストネット

sepolia

## 動かした記録

```bash
pnpm run dev
```

```bash
-------------------------------
Sending Approval Transaction...
-------------------------------
Transaction Sent: 0xb272109ada31c593fc23476058279f340abdbafe78aa956c0903e029c0f6d5a1
-------------------------------
Approval Transaction Confirmed! https://sepolia.etherscan.io/txn/0xb272109ada31c593fc23476058279f340abdbafe78aa956c0903e029c0f6d5a1
-------------------------------
Fetching Quote for: WETH to USDC
-------------------------------
Swap Amount: 0.001
-------------------------------
Token Swap will result in: 83.119853 USDC for 0.001 WETH
-------------------------------
Receipt: https://sepolia.etherscan.io/tx/0x58056d8bc72c9fdea5887e495752364a6ba230f3155b3950f0c23bfd6e0c5377
-------------------------------
```

## ethers を使ったバージョン

```ts
import * as dotenv from "dotenv";
import "dotenv/config";
import { ethers, Signer } from "ethers";
import {
  FACTORY_ABI,
  POOL_ABI,
  QUOTER_ABI,
  SWAP_ROUTER_ABI,
  TOKEN_IN_ABI,
} from "./abis";

dotenv.config();

const { RPC_URL, PRIVATE_KEY } = process.env;

// Deployment Addresses
const POOL_FACTORY_CONTRACT_ADDRESS =
  "0x0227628f3F023bb0B980b67D528571c95c6DaC1c";
const QUOTER_CONTRACT_ADDRESS = "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3";
const SWAP_ROUTER_CONTRACT_ADDRESS =
  "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";

// コントラクトとSingerインスタンスを作成
const provider = new ethers.JsonRpcProvider(RPC_URL);
const factoryContract = new ethers.Contract(
  POOL_FACTORY_CONTRACT_ADDRESS,
  FACTORY_ABI,
  provider
);
const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  QUOTER_ABI,
  provider
);
// signerインスタンスを作成
const signer = new ethers.Wallet(PRIVATE_KEY!, provider);

// Token Configuration
const WETH = {
  chainId: 11155111,
  address: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
  decimals: 18,
  symbol: "WETH",
  name: "Wrapped Ether",
  isToken: true,
  isNative: true,
  wrapped: true,
};

const USDC = {
  chainId: 11155111,
  address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  decimals: 6,
  symbol: "USDC",
  name: "USD//C",
  isToken: true,
  isNative: true,
  wrapped: false,
};

/**
 * トークンをApproveするメソッド
 * @param tokenAddress
 * @param tokenABI
 * @param amount
 * @param wallet
 */
async function approveToken(
  tokenAddress: string,
  tokenABI: any,
  amount: bigint,
  wallet: ethers.Wallet
) {
  try {
    // トークンのコントラクトインスタンスを生成
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

    // approveのトランザクションを生成
    const approveTransaction = await tokenContract.approve.populateTransaction(
      SWAP_ROUTER_CONTRACT_ADDRESS,
      ethers.parseEther(amount.toString())
    );
    // トランザクションを送信
    const transactionResponse = await wallet.sendTransaction(
      approveTransaction
    );
    console.log(`-------------------------------`);
    console.log(`Sending Approval Transaction...`);
    console.log(`-------------------------------`);
    console.log(`Transaction Sent: ${transactionResponse.hash}`);
    console.log(`-------------------------------`);
    const receipt = await transactionResponse.wait();
    console.log(
      `Approval Transaction Confirmed! https://sepolia.etherscan.io/txn/${receipt.hash}`
    );
  } catch (error) {
    console.error("An error occurred during token approval:", error);
    throw new Error("Token approval failed");
  }
}

/**
 * Pool情報を取得するメソッド
 * @param factoryContract
 * @param tokenIn
 * @param tokenOut
 * @returns
 */
async function getPoolInfo(
  factoryContract: ethers.Contract,
  tokenIn: string,
  tokenOut: string
) {
  const poolAddress = await factoryContract.getPool(tokenIn, tokenOut, 3000);
  if (!poolAddress) {
    throw new Error("Failed to get pool address");
  }
  const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
  return { poolContract, token0, token1, fee };
}

/**
 *
 * @param quoterContract
 * @param fee
 * @param signer
 * @param amountIn
 * @returns
 */
async function quoteAndLogSwap(
  quoterContract: ethers.Contract,
  fee: bigint,
  signer: ethers.Wallet,
  amountIn: bigint
) {
  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    {
      tokenIn: WETH.address,
      tokenOut: USDC.address,
      fee: fee,
      recipient: signer.address,
      deadline: Math.floor(new Date().getTime() / 1000 + 60 * 10),
      amountIn: amountIn,
      sqrtPriceLimitX96: 0,
    }
  );
  console.log(`-------------------------------`);
  console.log(
    `Token Swap will result in: ${ethers.formatUnits(
      quotedAmountOut[0].toString(),
      USDC.decimals
    )} ${USDC.symbol} for ${ethers.formatEther(amountIn)} ${WETH.symbol}`
  );
  const amountOut = ethers.formatUnits(quotedAmountOut[0], USDC.decimals);
  return amountOut;
}

/**
 *
 * @param poolContract
 * @param signer
 * @param amountIn
 * @param amountOut
 * @returns
 */
async function prepareSwapParams(
  poolContract: ethers.Contract,
  signer: ethers.Wallet,
  amountIn: bigint,
  amountOut: string
) {
  return {
    tokenIn: WETH.address,
    tokenOut: USDC.address,
    fee: await poolContract.fee(),
    recipient: signer.address,
    amountIn: amountIn,
    amountOutMinimum: amountOut,
    sqrtPriceLimitX96: 0,
  };
}

/**
 * Swapを実行するメソッド
 * @param swapRouter
 * @param params
 * @param signer
 */
async function executeSwap(
  swapRouter: ethers.Contract,
  params: any,
  signer: Signer
) {
  const transaction = await swapRouter.exactInputSingle.populateTransaction(
    params
  );
  const receipt = await signer.sendTransaction(transaction);
  console.log(`-------------------------------`);
  console.log(`Receipt: https://sepolia.etherscan.io/tx/${receipt.hash}`);
  console.log(`-------------------------------`);
}

async function main() {
  const inputAmount = "0.001";
  const amountIn = ethers.parseUnits(inputAmount.toString(), 18);

  try {
    await approveToken(WETH.address, TOKEN_IN_ABI, amountIn, signer);
    const { poolContract, token0, token1, fee } = await getPoolInfo(
      factoryContract,
      WETH.address,
      USDC.address
    );
    console.log(`-------------------------------`);
    console.log(`Fetching Quote for: ${token0} to ${token1}`);
    console.log(`-------------------------------`);
    console.log(`Swap Amount: ${ethers.formatEther(amountIn)}`);

    const quotedAmountOut = await quoteAndLogSwap(
      quoterContract,
      fee,
      signer,
      amountIn
    );

    const params = await prepareSwapParams(
      poolContract,
      signer,
      amountIn,
      quotedAmountOut[0].toString()
    );
    const swapRouter = new ethers.Contract(
      SWAP_ROUTER_CONTRACT_ADDRESS,
      SWAP_ROUTER_ABI,
      signer
    );
    await executeSwap(swapRouter, params, signer);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
}

main(); // Change amount as needed
```

### 参考文献

1. [GitHub - TechGeorgii uniswap-v3-sdk-tutorial-ts](https://github.com/TechGeorgii/uniswap-v3-sdk-tutorial-ts/blob/main/tutorial.ts)
2. [The Uniswap v3 Smart Contracts](https://docs.uniswap.org/contracts/v3/overview)
3. [swap メソッド](https://github.com/Uniswap/v3-core/blob/main/test/shared/utilities.ts#L132)
4. [Executing a Trades](https://docs.uniswap.org/sdk/v3/guides/swaps/trading)
5. [QuickNode Uniswap swap sample Code](https://github.com/quiknode-labs/qn-guide-examples/blob/main/defi/uniswap-v3-swaps)
6. [Uniswap SDK V3 trading](https://github.com/Uniswap/examples/tree/main/v3-sdk/trading)
7. [GitHub - Uniswap V3-SDK](https://github.com/Uniswap/v3-sdk)
8. [How to Swap Tokens on Uniswap V3](https://www.quicknode.com/guides/defi/dexs/how-to-swap-tokens-on-uniswap-v3)
