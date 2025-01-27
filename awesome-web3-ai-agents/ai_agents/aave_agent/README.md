# Aave のテストネットを使ったトークン Swap のサンプル AI Agent

## セットアップ

1. 環境変数

   `.env`を作成し、以下の値を埋める。

   ```txt
   RPC_URL=""
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
streamlit run main.py
```

## プロンプト

```bash
Please tell me about my USDC balance .
Please tell me about my DAI balance .
Please tell me about my WBTC balance .
Please tell me about my USDT balance .
```

```bash
AAVE Lending Poolに接続して、現在のアカウント状況を確認してください。アカウントアドレスは0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072です。
```

```bash
アカウントのAvailable Borrow Amount（借入可能額）が50 USDC以上の場合、50 USDCを借り入れてください。

結果に以下を含めてください:
   - アカウントの新しい担保状況
   - トランザクションハッシュ
   - トランザクションステータス
```

```bash

```

### 参考文献

1. [GrogCloud](https://console.groq.com/keys)
2. [Aave テストネット faucet](https://bridge-testnet.aave.com/faucet/)
