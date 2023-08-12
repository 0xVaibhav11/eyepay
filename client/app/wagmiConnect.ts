'use client';

import { configureChains, createConfig } from "wagmi";
import {
  optimismGoerli,
  polygonMumbai,
  goerli,
  baseGoerli,
  avalancheFuji,
  bscTestnet,
  zoraTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    optimismGoerli,
    polygonMumbai,
    goerli,
    baseGoerli,
    avalancheFuji,
    bscTestnet,
    zoraTestnet,
  ],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [new MetaMaskConnector({chains})],
});