import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantaTestnet as originalMantaTestnetWagmi } from "wagmi/chains";
import { createPublicClient, http } from "viem";
import { mantaTestnet as originalMantaTestnetViem } from "viem/chains";

const customMantaTestnetWagmi = {
  ...originalMantaTestnetWagmi,
  id: 3441006,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};

const customMantaTestnetViem = {
  ...originalMantaTestnetViem,
  id: 3441006,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};

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
  chain: customMantaTestnetViem,
  transport: http(
    "https://endpoints.omniatech.io/v1/manta-pacific/sepolia/public",
  ),
});
