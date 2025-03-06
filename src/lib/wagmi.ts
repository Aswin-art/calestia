import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantaTestnet as originalMantaTestnetWagmi } from "wagmi/chains";
import {
  createPublicClient,
  createWalletClient,
  defineChain,
  http,
} from "viem";

const customMantaTestnetWagmi = {
  ...originalMantaTestnetWagmi,
  id: 3441006,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};

const mantaSepolia = defineChain({
  id: 3441006,
  name: "Manta Pacific Sepolia",
  network: "manta-sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL!],
    },
  },
});

const bitfinityTestnet = defineChain({
  id: 355113,
  name: "Bitfinity Network Testnet",
  network: "bitfinity-testnet",
  nativeCurrency: {
    name: "Bitfinity Token",
    symbol: "BTF",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.bitfinity.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Bitfinity Testnet Explorer",
      url: "https://explorer.testnet.bitfinity.network",
    },
  },
});

export const config = getDefaultConfig({
  appName: "Calestia",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    customMantaTestnetWagmi,
    bitfinityTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [customMantaTestnetWagmi, bitfinityTestnet]
      : []),
  ],
  ssr: true,
});

export const publicClient = createPublicClient({
  chain: mantaSepolia,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: mantaSepolia,
  transport: http(),
});
