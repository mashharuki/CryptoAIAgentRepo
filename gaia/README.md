# Gaia について調査したメモ

## 概要

GaiaNet は分散型のコンピューティング基盤であり、誰でも自分のスタイル、価値観、知識、専門性を反映した AI エージェントを作成、デプロイ、スケール、そして収益化することができます。個人や企業が AI エージェントを作成することが可能です。各 GaiaNet ノードは以下の機能を提供します：

- **ウェブベースのチャットボット UI**  
  GaiaNet ノードとチャットできます。このノードは Rust プログラミング言語の専門家です。

- **OpenAI 互換 API**  
  GaiaNet ノードを OpenAI の代替として、お気に入りの AI エージェントアプリで使用する方法をご覧ください。

現在の AI エージェントの 100%は OpenAI エコシステムのアプリケーションです。

しかし、GaiaNet の API アプローチにより、OpenAI の代替として機能します。各 GaiaNet ノードは、ドメイン知識を補強した微調整モデルを使用してカスタマイズが可能で、従来の一般的な回答を排除します。

例えば、金融アナリスト用の GaiaNet ノードは、SEC 10K ファイリングに対する SQL コードを生成して、ユーザーの質問に答えることができます。

似たような GaiaNet ノードは「GaiaNet ドメイン」として整理され、ノード間で負荷分散を行うことで安定したサービスを提供します。GaiaNet ドメインは公開 URL を持ち、コミュニティにエージェントサービスを宣伝します。ユーザーやエージェントアプリがドメインの API エンドポイント URL にリクエストを送信すると、ドメインが準備が整ったノードにリクエストを振り分けます。

## GaiaNet: GenAI エージェントネットワークとは(詳細)

専門化された、ファインチューニング済み、RAG（Retriever-Augmented Generation）対応のオープンソース大規模言語モデル（LLM）は、新しい AI エージェントアプリケーションの中核的要素です。

しかし、これらのエージェントアプリは、従来のクラウドコンピューティングや SaaS インフラに対して、新しい課題をもたらしています。

これには、アプリケーションの移植性、仮想化、セキュリティの分離、コスト、データプライバシー、所有権といった新たな要件が含まれます。

GaiaNet は分散型のコンピューティングインフラで、誰でも自分自身のスタイル、価値観、知識、専門性を反映した AI エージェントを作成、展開、拡張、そして収益化できるようにします。

GaiaNet ノードは、以下を含む高性能かつクロスプラットフォームのアプリケーションランタイムで構成されています。

- ファインチューニング済み LLM
- 知識埋め込みモデル
- ベクトルデータベース
- プロンプト管理ツール
- オープン API サーバー

### LLM 出力を利用した外部ツールや関数を呼び出すためのプラグインシステム

これらは知識労働者によって「デジタルツイン」として展開され、Web API サービスとして提供されます。また、個別化された知識ベースやコンポーネントを新たな取引可能な資産クラスとして活用するマーケットプレイスが構築される可能性があります。同様の GaiaNet ノードは「GaiaNet ドメイン」として編成され、信頼性の高い AI エージェントサービスを一般に提供します。GaiaNet ノードとドメインは、GaiaNet DAO（分散型自律組織）によって管理されます。さらに、「目的限定型のスマートコントラクト」を活用することで、GaiaNet ネットワークは AI エージェントサービスのための分散型マーケットプレイスとなります。

### はじめに

ChatGPT と大規模言語モデル（LLM）の登場は、人々が知識を生成し、消費する方法を根本的に変革しました。わずか 1 年で、AI ネイティブなアプリケーションはチャットボットからコパイロット、さらにエージェントへと進化しました。

「AI エージェントは、コパイロットのような補助的なツールから、独立してタスクを完了する自律的な存在へと進化していくでしょう。」
— Dr. Andrew Ng（セコイアキャピタル AI Ascent 2024 サミット）

エージェントとは、人間のように自律的にタスクを完了できるソフトウェアアプリケーションです。エージェントはタスクを理解し、その手順を計画し、すべてのステップを実行し、エラーや例外を処理し、結果を提供します。強力な LLM がエージェントの「頭脳」として機能する一方で、外部データソース（目や耳）、特定の知識ベースやプロンプト（スキル）、コンテキストストア（記憶）、外部ツール（手）との接続が必要です。

エージェントタスクでは、次の理由で LLM をカスタマイズする必要があります。

- 特定の分野での幻覚（不正確な応答）を減らすため。
- 特定のフォーマット（例：JSON スキーマ）で応答を生成するため。
- 特定のスタイル（例：特定の人物の模倣）で要求に応答するため。
- 特定の分野（例：セキュリティ分野で CVE の脆弱性を分析する）で「政治的に不正確な質問」に答えるため。

### GaiaNet エージェントとは

エージェントは、膨大なエンジニアリングとリソースを必要とする複雑なソフトウェアです。今日、ほとんどのエージェントはクローズドソースで、SaaS ベースの LLM 上にホストされています。例えば、OpenAI LLM を活用した GPT や Microsoft/GitHub のコパイロット、Google Gemini LLM を活用した Duet などが挙げられます。

しかし、エージェントには、基盤となる LLM とソフトウェアスタックを特定のタスクに合わせてカスタマイズし、適応させる必要があります。これは中央集権型 SaaS では非常に困難です。例えば、ChatGPT では、小さなタスクごとに非常に大きなモデルを利用しなければならず、ファインチューニングやモデルの変更には莫大なコストがかかります。さらに、SaaS ホスト型の LLM では、エージェントのプライベートな知識がどのように使用・共有されるかについてのプライバシー管理が欠如しています。

これらの欠点のため、個人が自分の分野やタスクに合わせたエージェントを作成し、それを収益化することは SaaS プラットフォーム（例：OpenAI、Google、Anthropic、Microsoft、AWS）では困難です。

この論文では、すべての人が利用可能な AI エージェントのための分散型ソフトウェアプラットフォームとプロトコルネットワークを提案します。具体的には、次の 2 つの目標を掲げています。

- 目標 1: 個人のプライベートな知識や専門性を取り入れた個人用 LLM エージェントアプリを作成する能力を提供する。これらのアプリは、個人のスタイルや価値観を反映しながら、知識タスクを実行し、ツールを使用します。

- 目標 2: 個人が LLM エージェントをサービスとして提供し、それを拡大し、専門性や労力に見合う報酬を得られるようにする。

```txt
GaiaNetは「知識とスキルのためのYouTube」です。
```

### オープンソースと分散化

2024 年 4 月現在、Hugging Face には 6,000 以上のオープンソース LLM が公開されています。クローズドソースの LLM（例：GPT-4）と比較して、オープンソース LLM はプライバシー、コスト、体系的なバイアスの点で優れた利点を提供します。また、一般的な質問応答性能においても、オープンソース LLM はクローズドソースのモデルとの差を急速に埋めつつあります。

AI エージェントのユースケースにおいて、小型でタスクに特化した LLM が、大型の汎用モデルを上回る性能を発揮することが示されています。

しかし、個人や企業が独自の異種 GPU インフラ上で複数のファインチューニングされた LLM をデプロイし、調整することは困難です。エージェント向けの複雑なソフトウェアスタックや外部ツールとの複雑な相互作用は、脆弱でエラーが発生しやすいです。

さらに、LLM エージェントは、従来のアプリケーションサーバーとは全く異なるスケーリング特性を持っています。LLM は計算負荷が非常に高く、通常、1 回に 1 ユーザーしか対応できず、数秒間ブロックすることもあります。そのため、スケーリングの必要性は、単一サーバーで非同期リクエストを処理することから、多くの離散サーバー間でインターネット規模で負荷を分散することに変わっています。

## GaiaNet プロジェクト

GaiaNet プロジェクトは、以下の機能を備えたオープンソースの LLM をファインチューニングするためのクロスプラットフォームかつ高効率な SDK とランタイムを提供します。

- 独自のナレッジベース
- カスタマイズされたプロンプト
- 構造化された応答
- 関数呼び出し用の外部ツール

GaiaNet ノードは、個人用、クラウド、エッジデバイス上で数分で起動可能です。その後、インセンティブ付きの Web3 ネットワークを介してサービスを提供できます。

# GaiaNet ノードの構成要素

GaiaNet ネットワークの基本運用単位はノードです。GaiaNet ノードは、自身の AI エージェントを運用するための簡素化されたソフトウェアスタックです。ノードは以下の 7 つの主要コンポーネントで構成されています。

## 1. アプリケーションランタイム

GaiaNet アプリケーションは、WasmEdge と呼ばれる軽量で安全かつ高性能なサンドボックス内で実行されます。WasmEdge は、Linux Foundation と CNCF が管理するオープンソースプロジェクトであり、Docker や Kubernetes などのクラウドネイティブツールとシームレスに連携します。また、ブロックチェーン上でスマートコントラクトを安全かつ効率的に実行するための仮想マシンとしても利用されています。

WasmEdge は高性能でクロスプラットフォームのランタイムであり、ほぼすべての CPU、GPU、AI アクセラレーター上で AI モデルをネイティブスピードで実行できるため、分散型 AI エージェントに最適です。

## 2. ファインチューニングされた LLM

GaiaNet ノードは、ほぼすべてのオープンソース LLM、マルチモーダルモデル（例：Large Vision Models）、および Stable Diffusion やテキストからビデオを生成するモデルをサポートします。

ノード所有者は、多様なツールを使用してオープンソースモデルをファインチューニングできます。たとえば、個人のチャット履歴を使って LLM をファインチューニングし、独自の話し方を模倣させることが可能です。また、特定の知識分野に焦点を当てることで、幻覚（誤情報）の削減や回答品質の向上が図れます。さらに、出力形式を事前定義された JSON スキーマに一致させることが保証されます。

## 3. 埋め込みモデル

GaiaNet ノードは、AI エージェントが使用する公開または独自の知識ベースを管理するために埋め込みモデルを使用します。このモデルは入力文章をベクトル表現に変換し、意味的に類似する文章を高次元空間で近くに配置します。これにより、ユーザー質問や会話を迅速に処理し、知識ベース内の関連する内容を特定できます。

## 4. ベクトルデータベース

生成された埋め込みベクトルは、最適なパフォーマンスと最大のプライバシーを確保するため、ノード自体に保存されます。GaiaNet ノードには Qdrant ベクトルデータベースが含まれています。

## 5. カスタムプロンプト

新しいアプリケーションに LLM を簡単にカスタマイズする最も簡単な方法は、プロンプトを提供することです。プロンプトエンジニアリングは、この分野の実用的な研究と開発の対象となっています。GaiaNet ノードは、システムプロンプトや RAG プロンプトなど、さまざまなプロンプトをサポートしています。

## 6. 関数呼び出しとツール利用

LLM は、自然言語生成だけでなく、機械命令の生成にも優れています。GaiaNet ノードは、生成される出力形式を事前定義された JSON スキーマに準拠させることが可能で、外部ツールと連携してタスクを実行できます。

## 7. API サーバー

すべての GaiaNet ノードは同じ質問応答 API を備えています。これにより、フロントエンドアプリケーションが任意の GaiaNet ノードと連携可能です。API サーバーは WasmEdge 上で安全に動作し、ノード内のすべてのコンポーネントを統合します。また、RAG を強化したファインチューニング済み LLM とのチャットを可能にする Web ベースのチャットボット UI も提供します。

# GaiaNet ネットワーク

個々の GaiaNet ノードは強力な AI エージェントですが、単独で公共サービスを提供するには適していません。これには以下の理由があります。

- 公共利用者にとって、個々のノードの信頼性を判断することは困難です。
- ノード所有者にとって、コストが高いため公共サービスを提供する経済的インセンティブがありません。
- エージェントサーバーは従来のアプリケーションサーバーと異なるスケーリング特性を持っています。

## GaiaNet ドメイン

これらの課題を解決するため、GaiaNet ネットワークでは「ドメイン」という概念が導入されました。GaiaNet ドメインは単一のインターネットドメイン名の下で利用可能なノードの集合体です。ドメイン運営者は、ノードを登録し、API サービスを提供し、収益を分配する責任を持ちます。

## GaiaNet トークン

GaiaNet トークンは、トランザクションを促進し、ガバナンスを支え、ネットワーク内での信頼を促進するために設計されたユーティリティトークンです。

### 主な役割

1. **DAO ガバナンストークン**として、ネットワークのルール設定に参加可能です。
2. **ステーキングトークン**として、ドメイン運営者の信頼性を担保します。
3. **支払いトークン**として、サービス料金の支払いに使用されます。

## 公開 GaiaNet ノード

各 GaiaNet ノードは、ウェブベースのチャットボット UI と OpenAI 互換のウェブサービスを提供します。以下に人気のあるノードを紹介します。お気に入りのエージェントフレームワークやアプリで GaiaNet API を利用する方法は、エージェントアプリのセクションをご参照ください。

Gaia ノードは「Gaia ドメイン」として整理され、公開サービスを提供します。各ドメインには単一の API エンドポイントがあり、複数のノード間で負荷分散を行うことでサービスの可用性を確保します。以下に、一般公開されている無料の Gaia ドメインをいくつか紹介します。

---

## 公開 Gaia ドメイン

### **LLM: Llama 8b**

このドメインは、追加知識なしの Llama 3.1 8b エージェントノードを実行します。ツールや関数呼び出しが可能です。ツール呼び出しモデルの使用方法については、エージェントアプリの利用方法をご覧ください。チャットしたり、他のアプリで利用することができます。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目                      | 値                                |
| ----------------------------- | --------------------------------- |
| API エンドポイント URL        | `https://llama8b.gaia.domains/v1` |
| モデル名 (LLM 用)             | `llama`                           |
| モデル名 (テキスト埋め込み用) | `nomic-embed`                     |
| API キー                      | 空欄または任意の値                |

---

### **音声からテキスト: Whisper v2 Large**

このドメインは、音声からテキストへの転写と翻訳を行う Whisper v2 Large エージェントノードを実行します。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目               | 値                                |
| ---------------------- | --------------------------------- |
| API エンドポイント URL | `https://whisper.gaia.domains/v1` |
| モデル名               | `whisper`                         |
| API キー               | 空欄または任意の値                |

---

### **テキストから画像: Realistic Vision**

このドメインは、リアルなポートレートを生成するように微調整された安定拡散エージェントノードを実行します。モデルは Realistic Vision V6.0 B1 です。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目               | 値                                 |
| ---------------------- | ---------------------------------- |
| API エンドポイント URL | `https://portrait.gaia.domains/v1` |
| モデル名               | `portrait`                         |
| API キー               | 空欄または任意の値                 |

---

### **テキストから音声: GPT-SoVITS**

**近日公開！**

---

## コーディングアシスタントエージェント

### **Coder**

汎用コーディングエージェントで、STOA Coder LLM を実行します。非常に高性能ですが、動作が遅い場合があります。チャットしたり、Cursor AI や Zed などの IDE ツールから利用可能です。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目                      | 値                              |
| ----------------------------- | ------------------------------- |
| API エンドポイント URL        | `https://coder.gaia.domains/v1` |
| モデル名 (LLM 用)             | `coder`                         |
| モデル名 (テキスト埋め込み用) | `nomic-embed`                   |
| API キー                      | 空欄または任意の値              |

---

### **Rust Coder**

Rust Foundation のオープンソースコンテンツや書籍の知識で補強されたコーディングエージェントです。チャットしたり、Cursor AI や Zed などの IDE ツールから利用可能です。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目                      | 値                                  |
| ----------------------------- | ----------------------------------- |
| API エンドポイント URL        | `https://rustcoder.gaia.domains/v1` |
| モデル名 (LLM 用)             | `rustcoder`                         |
| モデル名 (テキスト埋め込み用) | `nomic-embed`                       |
| API キー                      | 空欄または任意の値                  |

---

## 代替 LLM ドメイン

### **Llama 3b**

追加知識なしの Llama 3.2 3b エージェントノードを実行します。チャットしたり、他のアプリで利用可能です。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目                      | 値                                |
| ----------------------------- | --------------------------------- |
| API エンドポイント URL        | `https://llama3b.gaia.domains/v1` |
| モデル名 (LLM 用)             | `llama3b`                         |
| モデル名 (テキスト埋め込み用) | `nomic-embed`                     |
| API キー                      | 空欄または任意の値                |

---

### **Qwen 7b**

非英語タスク（例: 翻訳）に優れた Qwen 7b LLM です。チャットしたり、他のアプリで利用可能です。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目                      | 値                               |
| ----------------------------- | -------------------------------- |
| API エンドポイント URL        | `https://qwen7b.gaia.domains/v1` |
| モデル名 (LLM 用)             | `qwen7b`                         |
| モデル名 (テキスト埋め込み用) | `nomic-embed`                    |
| API キー                      | 空欄または任意の値               |

---

### **Qwen 72b**

最高性能のオープンソース LLM である Qwen 72b です。非常に高性能ですが、動作が遅い場合があります。ツールや関数呼び出しが可能です。以下の設定を使って OpenAI の設定を置き換えてください。

| 設定項目                      | 値                                |
| ----------------------------- | --------------------------------- |
| API エンドポイント URL        | `https://qwen72b.gaia.domains/v1` |
| モデル名 (LLM 用)             | `qwen72b`                         |
| モデル名 (テキスト埋め込み用) | `nomic-embed`                     |
| API キー                      | 空欄または任意の値                |

---

## GaiaNet ノードの利用方法

GaiaNet ノードを起動するか、ウェブ上でノードを見つけた場合、それをウェブベースのチャットボット UI や OpenAI 互換のウェブサービスとして使用できます。ノードの公開 URL をブラウザで開くと、ダッシュボードにアクセスできます。  
例えば、以下のような URL です：  
`https://0x1234...xyz.gaianet.network/`

### **ウェブベースのチャットボット**

GaiaNet ノードのダッシュボードでは、「このノードとチャットする」ボタンが表示されます。

### **OpenAI API の代替**

GaiaNet ノードは、エージェントや LLM アプリで OpenAI API をそのまま置き換えられます。ダッシュボードには、これらのアプリで OpenAI のパラメータを置き換える方法を示す表が表示されます。

## チュートリアル

## 外部ツールの呼び出し

ツール呼び出しは、これまで存在しなかった真の「LLM ネイティブ」なインタラクションモードの 1 つです。これにより、「思考する」LLM が「行動する」能力を得ることができ、新しい知識を獲得したり現実世界での行動を実行したりできるようになります。これは、エージェント型アプリケーションにおいて重要な要素です。

オープンソースの LLM はツールを使用する能力がますます向上しています。Llama 3 モデルにより、個人のラップトップ上で稼働する 8b クラスの LLM で信頼性の高いツール呼び出しを実現することが可能になりました！

このチュートリアルでは、ローカル LLM がローカルコンピューター上でコードを実行しデータを操作できるシンプルな Python プログラムを紹介します。

---

## 必要条件

Gaia ノードを準備して、公開 URL を通じて LLM サービスを提供する必要があります。次の方法で実行できます：

- **自身でノードを運用する場合**  
  Gaia ノードを起動し、Llama-3-Groq モデルまたは Mistral-7B-v0.3 Instruct モデルを使用してください。その後、ノードの API URL エンドポイントとモデル名をツール呼び出しアプリで使用できます。
- **パブリックノードを使用する場合**  
  このチュートリアルでは、関数呼び出し対応のパブリック Llama3 ノードを使用します。

| 属性                   | 値                                        |
| ---------------------- | ----------------------------------------- |
| API エンドポイント URL | `https://llamatool.us.gaianet.network/v1` |
| モデル名               | llama                                     |
| API キー               | gaia                                      |

---

## デモエージェントの実行

エージェントアプリは Python で記述されています。このアプリは、LLM がツールを使用して SQL データベースを操作する方法を示します。この場合、インメモリ SQLite データベースを起動し、操作します。このデータベースには ToDo リストが保存されます。

### コードのダウンロードと依存関係のインストール

以下のコマンドを使用して、コードをダウンロードし Python 依存関係をインストールしてください：

```bash
git clone https://github.com/second-state/llm_todo
cd llm_todo
pip install -r requirements.txt
```

### 環境変数の設定

API サーバーとモデル名の環境変数を設定します：

```bash
export OPENAI_MODEL_NAME="llama"
export OPENAI_BASE_URL="https://llamatool.us.gaianet.network/v1"
```

### アプリケーションの起動

以下のコマンドで main.py アプリケーションを実行し、コマンドラインチャットインターフェースを起動します：

```bash
python main.py
```

### エージェントの使用

LLM にタスクを依頼できます。例えば、次のように指示します：

ユーザー：  
マーケティングチームとの会議を予定に追加してください。

LLM は、データベースにレコードを挿入する必要があることを理解し、ツール呼び出しレスポンスを JSON 形式で返します：

アシスタント：

```json
<tool_call>
{"id": 0, "name": "create_task", "arguments": {"task": "have a meeting with the marketing team"}}
</tool_call>
```

エージェントアプリ（main.py）は、この JSON レスポンス内の create_task ツール呼び出しを実行し、結果を「Tool」ロールとして返します。

このプロセスは main.py 内で自動的に実行されるため、ユーザーが手動で操作する必要はありません。エージェントアプリがツール呼び出しを実行すると、SQLite データベースが更新されます。

ツール：

```json
[{ "result": "ok" }]
```

LLM は実行結果を受け取り、以下のように応答します：

アシスタント：
マーケティングチームとの会議をタスクリストに追加しました。他に何か追加しますか？

その後も会話を続けることが可能です。

ツール呼び出しの詳細な仕組みについては、この記事をご覧ください。

### 信頼性を向上させる

LLM アプリケーションにおける主な課題の 1 つは、応答の信頼性が低いことです。例えば：

- 不正確なツール呼び出し  
  ユーザーのクエリに対応しないツール呼び出しが生成される場合、各ツール呼び出し関数の説明を精査して最適化することで対応できます。LLM はこれらの説明に基づいてツールを選択するため、説明をユーザーの典型的なクエリに合致する形で設計することが重要です。

- 幻覚（ハルシネーション)  
  存在しない関数名や不正確なパラメータを伴うツール呼び出しが生成される場合、エージェントアプリは問題を検出し、LLM に新たな応答を生成するよう促すべきです。

ツール呼び出しは、進化するエージェント型 LLM アプリケーションの基本的な機能です。皆さんの革新的なアイデアを楽しみにしています！

## GaiaNet でのエージェンティック翻訳

アンドリュー・ン教授のエージェンティック翻訳は、複数の LLM（大規模言語モデル）「エージェント」を協調させ、1 つのタスクに取り組む方法を示す優れたデモです。これにより、Llama-3 や Gemma-2 のような小規模な LLM を組み合わせて使用することで、ChatGPT のような 1 つの大規模 LLM よりも優れた結果を得ることができます。

GaiaNet は、2000 以上のノードが様々なファインチューニング済み LLM や知識ベースを稼働させており、エージェンティックアプリが自分の LLM バックエンドを選択・利用する大きな可能性を提供します。

### LLM 翻訳エージェントの概要

この LLM 翻訳エージェントは、複数の言語間で正確かつ効率的な翻訳を実現するよう設計されています。オープンソースの LLM を使用し、高品質な翻訳を提供します。ユーザーは独自のファインチューニングモデルや Hugging Face にある Meta の Llama-3 のようなモデルを利用することが可能です。

このエージェントを開始して実行するための詳細なコマンドについては、GitHub - Second State/translation-agent をご覧ください。

以下のコマンドで翻訳エージェントをクローンします。

```bash
git clone https://github.com/second-state/translation-agent.git

cd translation-agent
git checkout use_llamaedge
```

以下は、依頼された英語の内容を日本語に翻訳し、マークダウン形式でまとめたものです。

GaiaNet でのエージェンティック翻訳
アンドリュー・ン教授のエージェンティック翻訳は、複数の LLM（大規模言語モデル）「エージェント」を協調させ、1 つのタスクに取り組む方法を示す優れたデモです。これにより、Llama-3 や Gemma-2 のような小規模な LLM を組み合わせて使用することで、ChatGPT のような 1 つの大規模 LLM よりも優れた結果を得ることができます。

GaiaNet は、2000 以上のノードが様々なファインチューニング済み LLM や知識ベースを稼働させており、エージェンティックアプリが自分の LLM バックエンドを選択・利用する大きな可能性を提供します。

LLM 翻訳エージェントの概要
この LLM 翻訳エージェントは、複数の言語間で正確かつ効率的な翻訳を実現するよう設計されています。オープンソースの LLM を使用し、高品質な翻訳を提供します。ユーザーは独自のファインチューニングモデルや Hugging Face にある Meta の Llama-3 のようなモデルを利用することが可能です。

このエージェントを開始して実行するための詳細なコマンドについては、GitHub - Second State/translation-agent をご覧ください。

以下のコマンドで翻訳エージェントをクローンします。

bash
コードをコピーする
git clone https://github.com/second-state/translation-agent.git

cd translation-agent
git checkout use_llamaedge
次に、エージェントに必要なバックエンド API サービスを提供するローカル GaiaNet ノードをインストールします。自身でノードを起動したくない場合は、GaiaNet のコミュニティノードを利用することもできます。

```bash
curl -sSfL 'https://github.com/GaiaNet-AI/gaianet-node/releases/latest/download/install.sh' | bash
```

以下の設定と前提条件も必要です。公開された GaiaNet ノードを使用する場合は、http://localhost:8080 をhttps://node_id.us.gaianet.networkに置き換えてください。

````

```bash
export OPENAI_BASE_URL="http://localhost:8080/v1"
export PYTHONPATH=${PWD}/src
export OPENAI_API_KEY="GAIANET"

pip install python-dotenv
pip install openai tiktoken icecream langchain_text_splitters
````

## デモ 1: Llama-3-8B を使用した翻訳エージェントの実行

Meta AI の人気モデル Llama-3 を使用して翻訳エージェントを実行します。このデモでは、最小サイズの Llama-3 モデル（8B モデル）を選択します。翻訳タスクは中国語から英語への翻訳です。ソーステキストは中国語で書かれた故宮に関する簡単な紹介文です。

ステップ 1.1: Llama-3-8B GaiaNet ノードの起動
モデルを設定してダウンロードします。モデルサイズは 5.73GB で、ダウンロードには時間がかかる場合があります。

```bash
gaianet init --config https://raw.githubusercontent.com/GaiaNet-AI/node-configs/main/llama-3-8b-instruct/config.json
```

以下のコマンドで gaianet を起動

```bash
gaianet start
```

ステップ 1.2: Llama-3-8B 上で翻訳エージェントを実行
クローンしたエージェントリポジトリの examples/example_script.py ファイルを確認します。このスクリプトは、ドキュメントの場所と翻訳方法をエージェントに指示します。使用するモデル名（例: Meta-Llama-3-8B-Instruct-Q5_K_M）および翻訳する言語（例: 中国語から英語）を変更します。

以下にサンプルコードを示します。

```python
import os
import translation_agent as ta

if __name__ == "__main__":
    source_lang, target_lang, country = "Chinese", "English", "Britain"

    relative_path = "sample-texts/forbiddencity.txt"
    script_dir = os.path.dirname(os.path.abspath(__file__))

    full_path = os.path.join(script_dir, relative_path)

    with open(full_path, encoding="utf-8") as file:
        source_text = file.read()

    print(f"Source text:\n\n{source_text}\n------------\n")

    translation = ta.translate(
            source_lang=source_lang,
            target_lang=target_lang,
            source_text=source_text,
            country=country,
            model="Meta-Llama-3-8B-Instruct-Q5_K_M",
    )

    print(f"Translation:\n\n{translation}")

```

examples/sample-texts フォルダに翻訳するファイルを配置し、そのパスを指定します。この例では、forbiddencity.txt という名前のソーステキストを使用しています。

以下のコマンドを実行して、テキストファイルを翻訳します。

```bash
cd examples
python example_script.py
```

数分後、ターミナル画面に完全に翻訳されたバージョンが表示されます。

以下の手順は「デモ 2: Gemma-2-27b を使用した翻訳エージェントの実行」「デモ 3: Phi-3-Medium 長文モデルの利用」にも適用可能です。それぞれのモデルに対応する設定とコマンドを使用してください。

## Coinbase AgentKit の使用方法

## Coinbase AgentKit と Gaia ノードの連携

Coinbase AgentKit を利用するには、Gaia ノードを使用することができます。この Gaia ノードには、ツール呼び出しに最適化された LLM（大規模言語モデル）が必要です。または、単純に弊社のパブリックノードを利用することも可能です。

| 属性                   | 値                                      |
| ---------------------- | --------------------------------------- |
| API エンドポイント URL | https://llamatool.us.gaianet.network/v1 |
| モデル名               | llama                                   |
| API キー               | gaia                                    |

## クイックスタート

1. まず、Coinbase Developer Platform のアカウントを作成し、API キーを取得してください。

2. 次に、AgentKit のサンプルコードを確認します。

```bash
git clone https://github.com/coinbase/cdp-agentkit
cd cdp-agentkit/cdp-langchain/examples/chatbot
```

3. 環境変数をセットアップする。

```bash
export CDP_API_KEY_NAME='organizations/.../apiKeys/...'
export CDP_API_KEY_PRIVATE_KEY='-----BEGIN EC...END EC PRIVATE KEY-----\n'
```

4. chatbot.py ファイルを編集して、上記の Gaia ノードを使用するようエージェントを設定します。

```python
llm = ChatOpenAI(model="llama", api_key="GAIA", base_url="https://llamatool.us.gaianet.network/v1")
```

5. 最後に、Python でエージェントを実行します。

```bash
python chatbot.py
```

## AgentKit 用 Telegram ボット

Telegram ボットも用意しており、テキストや音声メッセージを介して、自身のウォレットと対話できます。このボットを操作するには、自身の Coinbase 認証情報とウォレットが必要です。

### Telegram ボットにアクセス

Telegram で以下のリンクからボットにアクセスしてください。
https://t.me/agentkit_bot

ボットはウォレット認証情報を設定するためのスラッシュコマンドを要求します。以下の形式で入力します。

```plaintext
/name organizations/.../apiKeys/...

/pk -----BEGIN EC...END EC PRIVATE KEY-----\n

/wallet {"wallet_id": "...
```

その後、Telegram ボットに対してオンチェーンで実行したい内容を伝えるだけで、エージェントが自動的に処理します。

### 参考文献

1. [Gaia 公式サイト](https://www.gaianet.ai/)
2. [Gaia 公式ドキュメント](https://www.gaianet.ai/docs)
3. [Gaia 開発者ドキュメント](https://docs.gaianet.ai/category/user-guide/?_gl=1*kpfgwo*_ga*MTg3MzYzOTg4MC4xNzM1MDQxOTU5*_ga_V3W2HJ72V0*MTczNTA0MTk1OC4xLjEuMTczNTA0MjAyNC4wLjAuMA..)
4. [GitHub - ワークショップ用のリポジトリ](https://github.com/GaiaNet-AI/workshops)
5. [GitHub - GaiaNet](https://github.com/GaiaNet-AI)
6. [cdp Agent キットの実装例](https://github.com/coinbase/cdp-agentkit/tree/master)
7. [eliza との統合](https://docs.gaianet.ai/tutorial/eliza)
