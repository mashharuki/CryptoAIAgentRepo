#########################################################
# AI Agentで使う外部ツールを定義したファイル
#########################################################

import os
from typing import Any, Dict, List, Union

from dotenv import load_dotenv
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.tools import tool
from pycoingecko import CoinGeckoAPI

load_dotenv()

# CoinGecko APIを使うためのクライアントインスタンスの定義
cg = CoinGeckoAPI(demo_api_key=os.getenv('coingecko_api_key'))
# TavilySearchResultsクラスのインスタンスを作成
os.environ["TAVILY_API_KEY"] = os.getenv('TAVILY_API_KEY')
tavily_client = TavilySearchResults(max_results=2, search_depth="advanced")

# 検索ツール
# ユーザーからの検索クエリを受け取り、Web検索を行い、その結果を辞書形式で返します。
@tool
def search(user_query: str) -> Dict:
    """
    Triggered if the user asks for a web search online. The passed user query should be used to search for content online to provide context.

    Keywords: search for, search, online, web search, fetch information

    Args:
        user_query: str -> The query that should be searched for online.
    
    Returns:
        Dict[str, Any]: Responses to the user quesry which contains multiple web search results.
    """
    return tavily_client.invoke({"query": user_query})

# トレンドトークンを取得するツール
# CoinGecko APIを使って、24時間でトレンドとなっている暗号通貨を取得します。
@tool
def get_trending_tokens() -> Dict[str, Any]:
    """
    This tool should be triggered if the user asks to see the trending coins from CoinGecko. 

    The tool will then output the top 7 trending tokens for the last 24 hours.

    Keywords: trending, top tokens, coingecko

    Args:
        None
    
    Returns:
        Dict[str, Any]: Cleaned dictionary containing the top 3 trending tokens data
        with specified fields removed.
    """

    # データクリーニング関数
    # 再帰的に辞書やリストの中身を処理する。
    def clean_nested_data(data: Union[Dict, List, Any]) -> Union[Dict, List, Any]:
        """
        Recursively cleans nested data structures by removing specified fields.
        
        This function removes:
        - Any field containing 'price_change' in its name
        - The 'market_cap_1h_change' field
        
        Args:
            data: The data structure to clean (can be a dict, list, or simple value)
            
        Returns:
            The cleaned data structure with specified fields removed
        """
        # Create a list of fields we want to exclude
        fields_to_exclude = [
            'price_change',
            'market_cap_1h_change',
            'market_cap_change_percentage_24h'
        ]
        
        # Handle dictionaries
        if isinstance(data, dict):
            return {
                key: clean_nested_data(value)
                for key, value in data.items()
                if not any(excluded in key.lower() for excluded in fields_to_exclude)
            }
        
        # Handle lists
        if isinstance(data, list):
            return [clean_nested_data(item) for item in data]
        
        # Return unchanged data for other types
        return data

    # Get raw data from CoinGecko
    # トレンドデータ取得と整形
    raw_data = cg.get_search_trending()
    
    # Create a new dictionary with only the top 3 coins
    limited_data = raw_data.copy()
    
    # Limit the coins list to the first 3 entries while preserving other data
    if 'coins' in limited_data and isinstance(limited_data['coins'], list):
        limited_data['coins'] = limited_data['coins'][:1] # Only returns the "coins" section of the API
    
    # Clean the limited data and return it
    # データをスクリーニングして返却する。
    return clean_nested_data(limited_data)