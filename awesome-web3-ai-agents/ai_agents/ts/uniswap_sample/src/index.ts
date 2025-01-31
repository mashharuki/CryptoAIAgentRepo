import * as dotenv from 'dotenv';
import 'dotenv/config';
import { createPublicClient, createWalletClient, formatEther, formatUnits, http, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { FACTORY_ABI, QUOTER_ABI, SWAP_ROUTER_ABI, TOKEN_IN_ABI } from './abis';

dotenv.config();

const {
  RPC_URL,
  PRIVATE_KEY
} = process.env;

// Deployment Addresses
const POOL_FACTORY_CONTRACT_ADDRESS = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c';
const QUOTER_CONTRACT_ADDRESS = '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3';
const SWAP_ROUTER_CONTRACT_ADDRESS = '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E';

// Set up clients
const publicClient = createPublicClient({ 
  chain: sepolia, 
  transport: http(RPC_URL!) 
});

const walletClient = createWalletClient({ 
  chain: sepolia, 
  transport: http(RPC_URL!), 
  account: privateKeyToAccount(PRIVATE_KEY as `0x${string}`) 
});

// Token Configuration
const WETH = {
  chainId: 11155111,
  address: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
  decimals: 18,
  symbol: 'WETH',
  name: 'Wrapped Ether',
  isToken: true,
  isNative: true,
  wrapped: true
};

const USDC = {
  chainId: 11155111,
  address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  decimals: 6,
  symbol: 'USDC',
  name: 'USD//C',
  isToken: true,
  isNative: true,
  wrapped: false
};

/**
 * トークンをApproveするメソッド
 */
async function approveToken(
  tokenAddress: `0x${string}`,
  amount: bigint
) {
  try {
    const approveTx = await walletClient.writeContract({
      abi: TOKEN_IN_ABI,
      address: tokenAddress,
      functionName: 'approve',
      args: [SWAP_ROUTER_CONTRACT_ADDRESS, amount]
    });
    console.log(`-------------------------------`);
    console.log(`Sending Approval Transaction...`);
    console.log(`Transaction Sent: ${approveTx}`);
    console.log(`-------------------------------`);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: approveTx });
    console.log(`Approval Transaction Confirmed! https://sepolia.etherscan.io/txn/${receipt.transactionHash}`);
  } catch (error) {
    console.error("An error occurred during token approval:", error);
    throw new Error("Token approval failed");
  }
}

/**
 * Pool情報を取得するメソッド
 */
async function getPoolInfo(
  tokenIn: `0x${string}`,
  tokenOut: `0x${string}`
) {
  const poolAddress = await publicClient.readContract({
    address: POOL_FACTORY_CONTRACT_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getPool',
    args: [tokenIn, tokenOut, 3000]
  });
  if (!poolAddress) {
    throw new Error("Failed to get pool address");
  }
  return poolAddress;
}

/**
 * Swapクオートを取得するメソッド
 */
async function quoteAndLogSwap(
  tokenIn: `0x${string}`,
  tokenOut: `0x${string}`,
  amountIn: bigint
) {
  const quotedAmountOut = await publicClient.readContract({
    address: QUOTER_CONTRACT_ADDRESS,
    abi: QUOTER_ABI,
    functionName: 'quoteExactInputSingle',
    args: [{
      tokenIn: tokenIn, 
      tokenOut: tokenOut,
      fee: 3000, 
      recipient: walletClient.account.address,
      deadline: Math.floor(new Date().getTime() / 1000 + 60 * 10),
      amountIn: amountIn,
      sqrtPriceLimitX96: 0,
    }]
  });
  console.log(`-------------------------------`);
  // Clean up output if necessary
  console.log(`Token Swap will result in: ${formatUnits(quotedAmountOut[0].toString(), USDC.decimals)} ${USDC.symbol} for ${formatEther(amountIn)} ${WETH.symbol}`);
  return formatUnits(quotedAmountOut[0].toString(), USDC.decimals);
}

/**
 * Swapを実行するメソッド
 */
async function executeSwap(
  tokenIn: `0x${string}`,
  tokenOut: `0x${string}`,
  amountIn: bigint,
  amountOutMinimum: bigint
) {
  // swapを実行
  const swapTx = await walletClient.writeContract({
    address: SWAP_ROUTER_CONTRACT_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    functionName: 'exactInputSingle',
    args: [{
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      fee: 3000,
      recipient: walletClient.account.address,
      amountIn: amountIn,
      amountOutMinimum: amountOutMinimum,
      sqrtPriceLimitX96: 0
    }]
  });
  console.log(`-------------------------------`);
  console.log(`Swap Transaction Sent: ${swapTx}`);
  console.log(`-------------------------------`);
  const receipt = await publicClient.waitForTransactionReceipt({ hash: swapTx });
  console.log(`Swap Transaction Confirmed! https://sepolia.etherscan.io/txn/${receipt.transactionHash}`);
}

/**
 * メイン関数
 */
async function main() {
  const inputAmount = "0.001";
  
  //@todo トークンごとにDecimalsを取得する処理を入れる。

  const amountIn = parseUnits(inputAmount, WETH.decimals);

  // fromTokenAddress
  const fromTokenAddress = WETH.address as `0x${string}`;
  // toTokenAddress
  const toTokenAddress = USDC.address as `0x${string}`;

  try {
    // トークンをApproveする
    await approveToken(fromTokenAddress, amountIn);
    // Pool情報を取得する
    const poolAddress = await getPoolInfo(fromTokenAddress, toTokenAddress);
    console.log(`Pool Address: ${poolAddress}`);
    // Swapクオートを取得する
    const quotedAmountOut = await quoteAndLogSwap(fromTokenAddress, toTokenAddress, amountIn);

    // 小数から整数に変換
    const minAmountOutBigInt = BigInt(Math.floor(Number(quotedAmountOut) * 10 ** USDC.decimals));

    // swapを実行する。
    await executeSwap(fromTokenAddress, toTokenAddress, amountIn, minAmountOutBigInt);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
}

main(); // 実行
