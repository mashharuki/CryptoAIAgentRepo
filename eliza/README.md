# Zliza

## クイックスタート

```bash
git clone https://github.com/ai16z/eliza.git
cd eliza
git checkout $(git describe --tags --abbrev=0)
```

インストールとビルド

```bash
pnpm install --no-frozen-lockfile
pnpm build
```

環境変数ののセットアップ

```bash
cp .env.example .env
```

クイックスタートするためにセットアップする値は以下の通り

Twitter のアカウントはテスト用のあらかじめ作成しておくこと。

あと、OpenAI の API も取得しておくこと。

```txt
# Suggested quickstart environment variables
DISCORD_APPLICATION_ID=  # For Discord integration
DISCORD_API_TOKEN=      # Bot token
HEURIST_API_KEY=       # Heurist API key for LLM and image generation
OPENAI_API_KEY=        # OpenAI API key
GROK_API_KEY=          # Grok API key
ELEVENLABS_XI_API_KEY= # API key from elevenlabs (for voice)
```

あと、キャラクターのクライアントオプションを指定する。

```json
"clients": ["twitter"],
```

以下のシェルスクリプトを実行させる。

```bash
sh scripts/start.sh
```

or

```bash
pnpm start --character="characters/trump.character.json"
```

## Gaia との統合

チェックアウト

```bash
git checkout v0.1.7-alpha.1
```

インストールとビルドは以下のコマンド

```bash
pnpm install
pnpm build
```
