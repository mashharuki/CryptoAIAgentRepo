import { ChatGroq } from '@langchain/groq';
import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent, ToolNode } from '@langchain/langgraph/prebuilt';
import * as dotenv from 'dotenv';
import { privateKeyToAccount } from 'viem/accounts';
import { borrowCrypto, getTokenBalance, getUserAccountData, lendCrypto } from './utils/aaveTool';
import { getTrendingTokens, search } from './utils/coinGeckoTool';
import { getEthAndStEthBalances, stakeWithLido } from './utils/lidoTool';
import { swapTokens } from './utils/uniswapTool';

dotenv.config();

const {
  PRIVATE_KEY,
  Groq_API_Key
} = process.env;

/**
 * セットアップメソッド
 */
const setUp = async () => {
  // 秘密鍵からアカウントを作成
  const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
  // システムプロンプト
  const SYSTEM_PROMPT = `
    You are an AAVE & Uniswap DeFi assistant that helps users interact with the AAVE & Uniswap protocol on Ethereum.
    You are connected to the wallet address: ${account.address}

    You have access to the following tokens and their addresses:

    - USDC (USD Coin): 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8
    - DAI (Dai Stablecoin): 0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357 
    - WBTC (Wrapped Bitcoin): 0x29f2D40B0605204364af54EC677bD022dA425d03 
    - USDT (Tether USD): 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
    - GHO (GHO Token): 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60
    - WETH (Wrapped Ether): 0xfff9976782d46cc05630d1f6ebab18b2324d6b14
    - stETH (Staking ETH): 0x3F1c547b21f65e10480dE3ad8E19fAAC46C95034 

    You can help users:
    1. Check their token balances of ONLY the above contracts. Let the user know what tokens are available.
    2. Lend their tokens to earn interest
    3. Borrow tokens against their collateral
    4. Swap tokens using Uniswap protocol
    5. Search for trending tokens on CoinGecko
    6. Staking ETH using Lido contract (Holesky)
  `;

  // 外部ツールを設定
  const tools = [
    getTokenBalance, 
    getUserAccountData, 
    lendCrypto, 
    borrowCrypto, 
    search, 
    getTrendingTokens, 
    swapTokens,
    getEthAndStEthBalances,
    stakeWithLido
  ];

  const toolNode = new ToolNode(tools);
  // LLM インスタンスを生成
  const llm = new ChatGroq({ model: 'llama3-70b-8192', apiKey: Groq_API_Key });
  // MemoryServerインスタンスを生成
  const agentCheckpointer = new MemorySaver();

  // AI Agent用のインスタンスをs
  const agent = createReactAgent({
    llm: llm,
    tools: toolNode,
    // checkpointSaver: agentCheckpointer,
    messageModifier: SYSTEM_PROMPT
  });

  return agent;
}

/**
 * main関数
 */
const main = async() => {
  console.log('=========================== [START] ===========================');
  console.log("🏦💬 AAVE & Uniswap DeFi Assistant");

  // セットアップする。
  const agent = await setUp();

  const message = `
   アカウントが Holeskyで 10ETH以上保有している場合、 10ETHを使ってステーキングしてください。

   結果に以下を含めてください:
      - アカウントの新しい担保状況
      - トランザクションハッシュ
      - トランザクションステータス
  `;

  const result = await agent.invoke({ messages: [message] });

  console.log('Result:', result.messages[3].content);

  console.log('=========================== [END] ===========================');
}

main();