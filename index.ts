const Web3ProviderEngine = require("web3-provider-engine");
const FiltersSubProvider = require('web3-provider-engine/subproviders/filters.js');
const Web3SubProvider = require("web3-provider-engine/subproviders/web3.js");
const Web3 = require("web3");
import {LedgerSubprovider} from '@0xproject/subproviders';
import Eth from "@ledgerhq/hw-app-eth";
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

async function createLedgerNodeJs() {
    const transport = await TransportNodeHid.create();
    return new Eth(transport);
}


export default function walletProviderEngineFactory(providerUri, networkId, derivationPath) {
    // Create a Web3 Provider Engine
    const providerEngine = new Web3ProviderEngine();

    const ledgerSubProvider = new LedgerSubprovider({
        networkId: networkId,
        derivationPath: derivationPath,
        ledgerEthereumClientFactoryAsync: createLedgerNodeJs
    });

    providerEngine.addProvider(ledgerSubProvider);
    providerEngine.addProvider(new FiltersSubProvider());
    providerEngine.addProvider(new Web3SubProvider(new Web3.providers.HttpProvider(providerUri)));
    providerEngine.start();

    return providerEngine;
}
