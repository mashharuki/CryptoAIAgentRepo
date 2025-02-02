import { Agent, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import * as dotenv from "dotenv";

dotenv.config(); 

const {
  OPENAI_API_KEY,
  GEMINI_API_KEY,
  GOLDRUSH_API_KEY
} = process.env;

/**
 * クイックスタート用のサンプルスクリプト
 */
const main = async () => {
  // Agentを作成(OpenAIで作成)
  const agent1 = new Agent({
    name: "Agent1",
    model: {
      provider: "OPEN_AI",
      name: "gpt-4o-mini",
      apiKey: OPENAI_API_KEY,
    },
    description: "A helpful AI assistant that can engage in conversation.",
    instructions: [
      "You are a DeFi expert with extensive knowledge of lending. Please explain in simple terms to beginners which token they should invest in next."
    ],
    /*
    tools: {
      tokenBalances: new TokenBalancesTool(GOLDRUSH_API_KEY),
      nftBalances: new NFTBalancesTool(GOLDRUSH_API_KEY),
      transactions: new TransactionsTool(GOLDRUSH_API_KEY),
    },
    */
  });

  // Agentを作成(Geminiで作成)
  const agent2 = new Agent({
    name: "Agent2",
    model: {
      provider: "GEMINI",
      name: "gemini-1.5-flash",
      apiKey: GEMINI_API_KEY,
    },
    description: "A helpful AI assistant that can engage in conversation.",
    instructions: [
      "You are a beginner in DeFi. Ask professional investors various questions to figure out which token you should invest in next."
    ]
  });

  // ワークフローを作成
  const zee = new ZeeWorkflow({
    description: "A workflow of agents that do stuff together",
    output: "Just bunch of stuff",
    agents: { agent2 },
  });

  // ワークフローを実行
  const result = await ZeeWorkflow.run(zee);
  console.log(result);

};

main().catch(console.error);