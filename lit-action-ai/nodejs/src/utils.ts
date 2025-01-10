import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LitNetwork } from "@lit-protocol/constants";
import { LIT_NETWORKS_KEYS } from "@lit-protocol/types";
import * as ethers from "ethers";

const LIT_NETWORK = process.env["LIT_NETWORK"] as LIT_NETWORKS_KEYS || LitNetwork.DatilDev;

/**
 * 環境変数を取得するメソッド
 * @param name 
 * @returns 
 */
export const getEnv = (name: string): string => {
  const env = process.env[name];
  if (env === undefined || env === "")
    throw new Error(
      `${name} ENV is not defined, please define it in the .env file`
    );
  return env;
};

/**
 * PKPをミントするメソッド
 * @param ethersSigner 
 * @returns 
 */
export const mintPkp = async (ethersSigner: ethers.Wallet) => {
  try {
    console.log("🔄 Connecting LitContracts client to network...");
    const litContracts = new LitContracts({
      signer: ethersSigner,
      network: LIT_NETWORK,
    });
    await litContracts.connect();
    console.log("✅ Connected LitContracts client to network");

    console.log("🔄 Minting new PKP...");
    // PKPをミントする。
    const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
    console.log(
      `✅ Minted new PKP with public key: ${pkp.publicKey} and ETH address: ${pkp.ethAddress}`
    );
    return pkp;
  } catch (error) {
    console.error(error);
  }
};
