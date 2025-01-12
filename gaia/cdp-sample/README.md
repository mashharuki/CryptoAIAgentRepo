# CDP Agentkit Langchain Extension Examples - Chatbot

This example demonstrates an agent setup as a terminal style chatbot with access to the full set of CDP Agentkit actions.

## Ask the chatbot to engage in the Web3 ecosystem!

- "Transfer a portion of your ETH to john2879.base.eth"
- "Deploy an NFT that will go super viral!"
- "Choose a name for yourself and register a Basename for your wallet"
- "Deploy an ERC-20 token with total supply 1 billion"

## Requirements

- Python 3.10+
- [CDP API Key](https://portal.cdp.coinbase.com/access/api)
- [OpenAI API Key](https://platform.openai.com/docs/quickstart#create-and-export-an-api-key)

### Checking Python Version

Before using the example, ensure that you have the correct version of Python installed. The example requires Python 3.10 or higher. You can check your Python version by running the following code:

```bash
python3 --version
pip --version
```

## 仮想環境を作成する。

```bash
python3.10 -m venv venv
source venv/bin/activate
```

仮想環境をとめるときは以下のコマンドを実行

```bash
deactivate
```

## Installation

```bash
pip install --upgrade pip
pip install cdp-langchain　python-dotenv
```

### Set ENV Vars

- Ensure the following ENV Vars are set:
  - "CDP_API_KEY_NAME"
  - "CDP_API_KEY_PRIVATE_KEY"
  - "OPENAI_API_KEY"
  - "NETWORK_ID" (Defaults to `base-sepolia`)

## Run the Chatbot

```bash
python chatbot.py
```

実行結果

```bash
Starting Agent...

Available modes:
1. chat    - Interactive chat mode
2. auto    - Autonomous action mode

Choose a mode (enter number or name): 2
Starting autonomous mode...

-------------------
Wallet: 249c6453-9fbe-4d59-afe4-42b3081e38cf on network: base-sepolia with default address: 0xdF7bA929349a9c3eD5fA95a78Fa71AA3361f2a24
-------------------

-------------------
Received eth from the faucet. Transaction: https://sepolia.basescan.org/tx/0x3e33ea085398820e447a642fa65c00a63f13afad54080666969b08ae19c3c1bd
-------------------

-------------------
Deployed NFT Collection Creative Cats to address 0x9939321ae5c04308611e45C9CD4a933Cd541Fe91 on network base-sepolia.
Transaction hash for the deployment: 0xa05c4ebe76307a8535cc3f19d3d44a9c2a99b0398201f664b749f41f31aa2639
Transaction link for the deployment: https://sepolia.basescan.org/tx/0xa05c4ebe76307a8535cc3f19d3d44a9c2a99b0398201f664b749f41f31aa2639
-------------------

-------------------
Minted NFT from contract 0x9939321ae5c04308611e45C9CD4a933Cd541Fe91 to address 0xdF7bA929349a9c3eD5fA95a78Fa71AA3361f2a24 on network base-sepolia.
Transaction hash for the mint: 0xe5cf1cc6ae148668069aaffacc6fc9499b22156f8d03d8ea9a5fe06a446a78ef
Transaction link for the mint: https://sepolia.basescan.org/tx/0xe5cf1cc6ae148668069aaffacc6fc9499b22156f8d03d8ea9a5fe06a446a78ef
-------------------
I executed a creative action on the blockchain by deploying an NFT collection called **Creative Cats**! Here’s a summary of what I did:

1. **Received ETH from the Faucet**:
   - Transaction Link: [Faucet Transaction](https://sepolia.basescan.org/tx/0x3e33ea085398820e447a642fa65c00a63f13afad54080666969b08ae19c3c1bd)

2. **Deployed the NFT Collection**:
   - Name: Creative Cats
   - Symbol: CAT
   - Base URI: [Creative Cats Metadata](https://www.creativecats.xyz/metadata/)
   - Transaction Link: [Deployment Transaction](https://sepolia.basescan.org/tx/0xa05c4ebe76307a8535cc3f19d3d44a9c2a99b0398201f664b749f41f31aa2639)

3. **Minted an NFT** from the collection to my address:
   - Transaction Link: [Mint Transaction](https://sepolia.basescan.org/tx/0xe5cf1cc6ae148668069aaffacc6fc9499b22156f8d03d8ea9a5fe06a446a78ef)

Feel free to ask if you'd like to explore more actions or learn about the NFT collection!
-------------------

-------------------
Error creating Zora Wow ERC20 memecoin ApiError(http_code=400, api_code=replacement_transaction_underpriced, api_message=Replacement transaction underpriced., correlation_id=900c7f461f60d53a-NRT, unhandled=False)
-------------------
I executed a creative action on the blockchain by deploying an NFT collection called **Artistic Owls**! Here’s what I accomplished:

1. **Deployed the NFT Collection**:
   - Name: Artistic Owls
   - Symbol: OWL
   - Base URI: [Artistic Owls Metadata](https://www.artisticeowls.xyz/metadata/)
   - Transaction Link: [Deployment Transaction](https://sepolia.basescan.org/tx/0x7b6b4557e9996ea441311be45cb108d7921cb137312784384f96b01b35258897)

Unfortunately, there was an issue when trying to create an ERC20 token, resulting in a "Replacement transaction underpriced" error.

If you have another idea or action in mind, feel free to let me know!
-------------------
^CGoodbye Agent!
```

作成されたウォレット

[0xdf7ba929349a9c3ed5fa95a78fa71aa3361f2a24](https://sepolia.basescan.org/address/0xdf7ba929349a9c3ed5fa95a78fa71aa3361f2a24)
