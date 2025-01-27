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

ちなみにコンソール上は以下のようなログが出る。

```bash
2025-01-27 23:21:08,062 - INFO - Health Factor: 115792089237316195423570985008687907853269984665640564039457584007913129639935
2025-01-27 23:21:08,062 - ERROR - No collateral supplied. Please supply collateral before borrowing.
2025-01-27 23:21:09,083 - INFO - HTTP Request: POST https://api.groq.com/openai/v1/chat/completions "HTTP/1.1 200 OK"
2025-01-27 23:24:36,837 - INFO - Private key has been set
2025-01-27 23:24:37,688 - INFO - HTTP Request: POST https://api.groq.com/openai/v1/chat/completions "HTTP/1.1 200 OK"
2025-01-27 23:24:37,693 - INFO - Attempting to borrow 50.0 of asset at 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8 with interest rate mode 2
2025-01-27 23:24:37,980 - INFO - Connected to Ethereum
2025-01-27 23:24:37,988 - INFO - Contracts initialized successfully
2025-01-27 23:24:38,761 - INFO - Account Data:
2025-01-27 23:24:38,761 - INFO - Total Collateral: 10000005000 (base units)
2025-01-27 23:24:38,761 - INFO - Total Debt: 0 (base units)
2025-01-27 23:24:38,761 - INFO - Available Borrows: 8000004000 (base units)
2025-01-27 23:24:38,761 - INFO - Current LTV: 8000
2025-01-27 23:24:38,761 - INFO - Health Factor: 115792089237316195423570985008687907853269984665640564039457584007913129639935
2025-01-27 23:24:39,561 - INFO - Token decimals: 6
2025-01-27 23:24:40,233 - INFO - Account address: 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072
2025-01-27 23:24:40,234 - INFO - Current nonce: 363
2025-01-27 23:24:40,519 - INFO - Current gas price: 30354197899
2025-01-27 23:24:40,519 - INFO - Amount in token base units: 50000000
2025-01-27 23:24:41,060 - INFO - Borrow transaction built successfully
2025-01-27 23:24:41,060 - INFO - Attempting to sign borrow transaction...
2025-01-27 23:24:41,074 - INFO - Borrow transaction signed successfully
2025-01-27 23:24:41,074 - INFO - SignedTransaction attributes:
2025-01-27 23:24:41,074 - INFO - Hash: d15de3068ead65ff5c429eb30fe27e918d721baf851be2ebf3cf810c968b9ce5
2025-01-27 23:24:41,074 - INFO - r: 4678458501098985912880214543629465285550938569048870929203206024567094222426
2025-01-27 23:24:41,074 - INFO - s: 19320622101349849529993410264088029683624413888470714296817675415581856212407
2025-01-27 23:24:41,074 - INFO - v: 1
2025-01-27 23:24:41,363 - INFO - Borrow Transaction Hash: d15de3068ead65ff5c429eb30fe27e918d721baf851be2ebf3cf810c968b9ce5
2025-01-27 23:24:49,246 - INFO - Borrow transaction mined in block: 7582132
2025-01-27 23:24:49,246 - INFO - Borrow transaction status: Success
2025-01-27 23:24:54,880 - INFO - HTTP Request: POST https://api.groq.com/openai/v1/chat/completions "HTTP/1.1 200 OK"
2025-01-27 23:27:23,364 - INFO - Private key has been set
2025-01-27 23:27:24,109 - INFO - HTTP Request: POST https://api.groq.com/openai/v1/chat/completions "HTTP/1.1 200 OK"
```

```bash
アカウントが100 USDC以上の場合、50 USDCを貸し出してください。

結果に以下を含めてください:

アカウントの新しい担保状況
トランザクションハッシュ
トランザクションステータス
```

```bash
アカウントのAvailable Borrow Amount（借入可能額）が50 USDC以上の場合、それを担保に 50 DAI を借り入れてください。

結果に以下を含めてください:
   - アカウントの新しい担保状況
   - トランザクションハッシュ
   - トランザクションステータス
```

```bash
アカウントのAvailable Borrow Amount（借入可能額）が50 DAI以上の場合、それを担保に 50 WBTC を借り入れてください。

結果に以下を含めてください:
   - アカウントの新しい担保状況
   - トランザクションハッシュ
   - トランザクションステータス
```

```bash
アカウントが WBTCの残高が 1WBTC 以上の場合、1 WBTCを貸し出してください。

結果に以下を含めてください:

アカウントの新しい担保状況
トランザクションハッシュ
トランザクションステータス
```

### 参考文献

1. [GrogCloud](https://console.groq.com/keys)
2. [Aave テストネット faucet](https://bridge-testnet.aave.com/faucet/)
