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

export const config = getDefaultConfig({
  appName: "Arcalis",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    customMantaTestnetWagmi,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [customMantaTestnetWagmi]
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
