import { tool } from "@langchain/core/tools";
import * as dotenv from 'dotenv';
import { createPublicClient, createWalletClient, http, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { z } from "zod";
import { AAVE_LENDING_POOL_ABI_TESTNET } from './abis/aave_lending_pool_abi_testnet';
import { ERC20_ABI } from './abis/erc20_abi';

dotenv.config();

const {
  RPC_URL,
  PRIVATE_KEY
} = process.env;

// コントラクトのアドレス(sepolia)
const AAVE_LENDING_POOL_ADDRESS = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951';

// public Clientとwallet Clientを作成
const client = createPublicClient({ 
  chain: sepolia,
  transport: http(RPC_URL) 
});
const walletClient = createWalletClient({
  transport: http(RPC_URL),
  chain: sepolia,
  account: privateKeyToAccount(PRIVATE_KEY as `0x${string}`),
});

/**
 * 暗号通貨を借り入れる
 * @param amount 借りる暗号通貨の量
 * @param assetAddress 借りる資産のコントラクトアドレス
 * @param interestRateMode 利率モード（1: 固定金利、2: 変動金利）
 * @returns トランザクションハッシュまたは null
 */
async function borrowCrypto(
  amount: number,
  assetAddress: `0x${string}`,
  interestRateMode: number = 2
): Promise<string | null> {
  try {
    // Fetch token decimals
    const decimals = await client.readContract({
      abi: ERC20_ABI,
      address: assetAddress,
      functionName: 'decimals',
    });

    console.log(`Decimals: ${decimals}`);

    // Convert amount to token units (wei)
    const amountInWei = parseUnits(amount.toString(), decimals as number);

    // Check borrowing power and user account data (if required by your logic)

    // Execute the borrow transaction
    const borrowHash = await walletClient.writeContract({
      abi: AAVE_LENDING_POOL_ABI_TESTNET,
      address: AAVE_LENDING_POOL_ADDRESS,
      functionName: 'borrow',
      args: [assetAddress, amountInWei, interestRateMode, 0, walletClient.account!.address],
    });
    console.log(`Borrow transaction hash: ${borrowHash}`);

    // Wait for the transaction to be mined
    await client.waitForTransactionReceipt({ hash: borrowHash });

    return borrowHash;
  } catch (error) {
    console.error(`Error in borrowCrypto: ${error}`);
    return null;
  }
}

/**
 * 暗号通貨を貸し出す
 * @param amount 
 * @param assetAddress 
 * @returns 
 */
async function lendCrypto(amount: number, assetAddress: `0x${string}`): Promise<string | null> {
  try {
    // Fetch token decimals
    const decimals = await client.readContract({
      abi: ERC20_ABI,
      address: assetAddress,
      functionName: 'decimals',
    });

    console.log(`Decimals: ${decimals}`);

    const amountInWei = parseUnits(amount.toString(), decimals as number);

    // Approve the lending pool to spend tokens
    const approveHash = await walletClient.writeContract({
      abi: ERC20_ABI,
      address: assetAddress,
      functionName: 'approve',
      args: [AAVE_LENDING_POOL_ADDRESS, amountInWei],
    });
    console.log(`Approval transaction hash: ${approveHash}`);

    // Wait for the transaction to be mined
    await client.waitForTransactionReceipt({ hash: approveHash });

    // Supply tokens to AAVE Lending Pool
    const supplyHash = await walletClient.writeContract({
      abi: AAVE_LENDING_POOL_ABI_TESTNET,
      address: AAVE_LENDING_POOL_ADDRESS,
      functionName: 'supply',
      args: [assetAddress, amountInWei, walletClient.account!.address, 0],
    });
    console.log(`Supply transaction hash: ${supplyHash}`);

    // Wait for the transaction to be mined
    await client.waitForTransactionReceipt({ hash: supplyHash });

    return supplyHash;
  } catch (error) {
    console.error(`Error in lendCrypto: ${error}`);
    return null;
  }
}

/**
 * ユーザーの資産情報を取得するメソッド
 * @param userAddress 
 * @returns 
 */
async function getUserAccountData(userAddress: `0x${string}`): Promise<Record<string, bigint> | null> {
  try {
    // 呼び出し
    const accountData = await client.readContract({
      abi: AAVE_LENDING_POOL_ABI_TESTNET,
      address: AAVE_LENDING_POOL_ADDRESS,
      functionName: 'getUserAccountData',
      args: [userAddress],
    });
    
    console.log(`Account data: ${accountData}`);

    return {
      totalCollateralBase: accountData[0],
      totalDebtBase: accountData[1],
      availableBorrowsBase: accountData[2],
      currentLiquidationThreshold: accountData[3],
      ltv: accountData[4],
      healthFactor: accountData[5],
    };
  } catch (error) {
    console.error(`Error in getUserAccountData: ${error}`);
    return null;
  }
}

/**
 * ユーザーのトークンの残高を取得するメソッド
 * @param tokenAddress 
 * @param userAddress 
 * @returns 
 */
const getTokenBalance = tool(
  async (input: { tokenAddress: `0x${string}`; userAddress?: `0x${string}` }) => {
    try {
      const { tokenAddress, userAddress } = input;
      let finalUserAddress = userAddress;

      // ユーザーアドレスが指定されていない場合、デフォルトで walletClient のアドレスを使用
      if (!finalUserAddress) {
        finalUserAddress = walletClient.account!.address;
      }

      // トークンの残高を取得
      const balance = await client.readContract({
        abi: ERC20_ABI,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [finalUserAddress],
      });

      // トークンのデシマル数を取得
      const decimals = await client.readContract({
        abi: ERC20_ABI,
        address: tokenAddress,
        functionName: 'decimals',
        args: [],
      });

      // Decimalに合わせて残高を調整（balanceを割る）
      const balanceInDecimal = Number(balance) / Math.pow(10, decimals as number);

      return balanceInDecimal;
    } catch (error) {
      console.error(`Error in getTokenBalanceTool: ${error}`);
      return null;
    }
  },
  {
    name: "get_token_balance",
    description: "Get the token balance of the user for the given token address.",
    schema: z.object({
      tokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address").transform((val) => val as `0x${string}`).describe("The token contract address."),
      userAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address").optional().transform((val) => val as `0x${string}`).describe("The user's wallet address (optional). If not provided, defaults to the walletClient address."),
    }),
  }
);

export { borrowCrypto, getTokenBalance, getUserAccountData, lendCrypto };

