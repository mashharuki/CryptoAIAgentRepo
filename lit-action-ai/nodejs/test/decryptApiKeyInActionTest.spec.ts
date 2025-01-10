import { expect, use } from "chai";
import chaiJsonSchema from "chai-json-schema";

use(chaiJsonSchema);

import { solanaOpenAI } from "../src/index.js";

describe("decryptApiKey", () => {
  it("should run the function successfully", async () => {
    // solanaOpenAI関数を実行する
    const result = await solanaOpenAI();
    // 期待するオブジェクトの構造
    const expectedSchema = {
      type: "object",
      required: [
        "success",
        "signedData",
        "decryptedData",
        "claimData",
        "response",
      ],
      properties: {
        success: { type: "boolean" },
        signedData: { type: "object" },
        decryptedData: { type: "object" },
        claimData: { type: "object" },
        response: {
          type: "string",
          pattern: "Signed message. Is signature valid: true$",
        },
        logs: { type: "string" },
      },
    };
    // 想定した通りのデータ構造でオブジェクトが得られるかチェックする。
    expect(result).to.be.jsonSchema(expectedSchema);
  }).timeout(100_000);
});
