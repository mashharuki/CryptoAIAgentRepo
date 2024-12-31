import * as wardenprotocol from '@wardenprotocol/wardenjs';

const { createRPCQueryClient } = wardenprotocol.warden.ClientFactory; 
const client = await createRPCQueryClient({ rpcEndpoint: "https://evm.chiado.wardenprotocol.org" });

const main = async() => {
    // now you can query the cosmos modules
    const balance = await client.cosmos.bank.v1beta1.allBalances({ address: 'wardenprotocol1addresshere' });

    console.log("balance:", balance)
}

main();
