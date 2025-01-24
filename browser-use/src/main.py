import asyncio

from browser_use import Agent
from langchain_openai import ChatOpenAI


# メイン関数
async def main():
  # AI Agentインスタンスの初期化
  agent = Agent(
      task="2025年2月1日の日本からミラノへの片道便をGoogle Flightsで検索し、最安値のオプションを返してください。",
      llm=ChatOpenAI(model="gpt-4o"),
  )
  # 実行
  result = await agent.run()
  print(result)

asyncio.run(main())