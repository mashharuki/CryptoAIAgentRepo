# Streamlit + LangGraph + CoinGeko によるサンプル AI Agent

## セットアップ

1. 環境変数

   `.env`を作成し、以下の値を埋める。

   ```txt
   coingecko_api_key=""
   TAVILY_API_KEY=""
   ```

   また、GroqCloud から API Key を作成する。

2. 仮想環境のセットアップ

   ```bash
   python3 -m venv venv
   ```

3. 仮想環境の立ち上げ

   ```bash
   source ./venv/bin/activate
   ```

   やめる時は以下のコマンド

   ```bash
   deactivate
   ```

4. インストール

   ```bash
   pip install -r requirements.txt
   ```

## 動かし方

```bash
streamlit run coin_gecko_agent.py
```

## サンプルプロンプト

```bash
イーサリアム上で過去24時間で最もトレンドになっているトークンはなんですか？
```

```bash
「暗号通貨のトレンドトークンと、それに関連するニュースを教えてください。」
「トレンドになっているトークンを調べ、そのトークンに関する最新情報を検索してください。」
「CoinGeckoで人気の暗号通貨と、それについての詳しい情報を探してください。」
```

### 参考文献

1. [GrogCloud](https://console.groq.com/keys)
