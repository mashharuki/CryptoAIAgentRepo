import asyncio

from browser_use import Agent
from langchain_openai import ChatOpenAI


# メイン関数
async def main():
  # AI Agentインスタンスの初期化
  agent = Agent(
      task="Uniswapのアプリにアクセスして、Etheresum Seploia Testnetで ETHを USDTに交換してください。よろしくお願いします。",
      llm=ChatOpenAI(model="gpt-4o"),
  )
  # 実行
  result = await agent.run()
  print(result)

asyncio.run(main())