## 試したプロンプト集

```ts
// const message = "What is the balance of USDC?";
// const message = "What is the balance of GHO?";
// const message = "Please tell me about my DAI balance ."
// const message = "AAVE Lending Poolに接続して、現在のアカウント状況を確認してください。アカウントアドレスは0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072です。";

/*
  const message = `
    アカウントが USDCの残高が 50USDC 以上の場合、50 USDCを貸し出してください。

    結果に以下を含めてください:

      アカウントの新しい担保状況
      トランザクションハッシュ
      トランザクションステータス
  `
  */

/*
  const message = `
    アカウントのAvailable Borrow Amount（借入可能額）が10 GHO以上の場合、それを担保に 10 GHO を借り入れてください。

    結果に以下を含めてください:
      - アカウントの新しい担保状況
      - トランザクションハッシュ
      - トランザクションステータス
  `;
  */

const message = `
    GHO、USDC、DAI、WBTC、USDTのトークンの中で最も価値が上がったトークンはどれですか？

    そのトークンの名前と価格を教えてください。
  `;

const message = `
    アカウントのAvailable Borrow Amount（借入可能額）が10 GHO以上の場合、それを担保に 10 GHO を借り入れてください。

    結果に以下を含めてください:
      - アカウントの新しい担保状況
      - トランザクションハッシュ
      - トランザクションステータス
  `;

const message = `
    アカウントが 50 USDC以上の USDCを保有している場合、 WETHにSwapしてください。

    結果に以下を含めてください:
      - アカウントの新しい担保状況
      - トランザクションハッシュ
      - トランザクションステータス
  `;

const message = `
   アカウントが Holeskyで 10ETH以上保有している場合、 10ETHを使ってステーキングしてください。

   結果に以下を含めてください:
      - アカウントの新しい担保状況
      - トランザクションハッシュ
      - トランザクションステータス
  `;
```
