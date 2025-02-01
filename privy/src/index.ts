import { PrivyClient } from '@privy-io/server-auth';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  PRIVY_APP_ID,
  PRIVY_APP_SECRET_KEY,
} = process.env;

// PrivyClient インスタンスを生成
const privy = new PrivyClient(PRIVY_APP_ID as string, PRIVY_APP_SECRET_KEY as string);

/**
 * PrivyのServerWalletの動作を確認するサンプルコード
 */
const main = async () => {
  // walletを作成
  // IDは毎回変わるため、作成したwalletのIDを保存しておく必要がある。
  const {id, address, chainType} = await privy.walletApi.create({chainType: 'ethereum'});

  console.log('wallet created:', {id, address, chainType});

  // 署名を行う。
  const {data} = await privy.walletApi.rpc({
    walletId: id,
    method: 'personal_sign',
    params: {
      message: 'Hello server wallets!'
    }
  })
  // @ts-ignore 
  const {signature} = data;

  console.log('signature:', signature);

  // baseSepoliaを指定
  const chainId = 84532;

  // 少額の暗号ETHを送金する。
  const sendData = await privy.walletApi.ethereum.sendTransaction({
    // Your wallet ID (not address), returned during creation
    walletId: "vshl96x85uvrq1f9z1g5r0wn",
    caip2: `eip155:${chainId}`,
    params: {
      transaction: {
        // Be sure to replace this with your recipient address
        to: '0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072',
        value: 0.0001,
        chainId: chainId,
      },
    },
  });
  // @ts-ignore 
  const {hash} = sendData.data;

  console.log('transaction hash:', hash);
};

main();