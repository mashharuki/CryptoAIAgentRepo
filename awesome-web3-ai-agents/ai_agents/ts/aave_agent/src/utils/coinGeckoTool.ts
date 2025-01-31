import { tool } from "@langchain/core/tools";
import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config();

const {
  COINGECKO_API_KEY,
  TAVILY_API_KEY
} = process.env;

// CoinGecko APIクライアント
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
// Tavily Search クライアントの定義
const tavilyClientUrl = "https://api.tavily.io/search";

/**
 * Web検索ツール
 * ユーザーのクエリをWeb検索し、結果を辞書形式で返します。
 */
const search = tool(
  async (input: { user_query: string }) => {
    try {
      const response = await axios.post(
        tavilyClientUrl,
        { query: input.user_query },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TAVILY_API_KEY}`,
          },
        }
      );

      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      console.error("Error in searchTool:", error);
      return { error: "Failed to fetch search results." };
    }
  },
  {
    name: "search",
    description:
      "Perform a web search based on the user's query and return the search results.",
    schema: {
      user_query: "string",
    },
  }
);

/**
 * トレンドトークンを取得するツール
 * CoinGecko APIから24時間のトレンド暗号通貨を取得します。
 */
const getTrendingTokens = tool(
  async () => {
    try {
      const response = await axios.get(
        `${COINGECKO_BASE_URL}/search/trending`,
        {
          headers: {
            "X-Api-Key": COINGECKO_API_KEY,
          },
        }
      );

      const rawData = response.data;

      // データクリーニング関数
      // 
      const cleanNestedData = (data): any => {
        const fieldsToExclude = [
          "price_change",
          "market_cap_1h_change",
          "market_cap_change_percentage_24h",
        ];

        if (Array.isArray(data)) {
          return data.map(cleanNestedData);
        }

        if (typeof data === "object" && data !== null) {
          return Object.fromEntries(
            Object.entries(data).filter(
              ([key]) =>
                !fieldsToExclude.some((excluded) =>
                  key.toLowerCase().includes(excluded)
                )
            ).map(([key, value]) => [key, cleanNestedData(value)])
          );
        }

        return data;
      };

      // トレンドデータ整形
      const limitedData = { ...rawData };

      if (Array.isArray(limitedData.coins)) {
        limitedData.coins = limitedData.coins.slice(0, 1); // 上位1件に限定
      }

      return cleanNestedData(limitedData);
    } catch (error) {
      console.error("Error in getTrendingTokensTool:", error);
      return { error: "Failed to fetch trending tokens." };
    }
  },
  {
    name: "get_trending_tokens",
    description: "Fetch the top trending cryptocurrency tokens from CoinGecko.",
    schema: {},
  }
);

export { getTrendingTokens, search };

