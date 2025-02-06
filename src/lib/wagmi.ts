import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { manta } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Arcalis AI",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    manta,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [manta] : []),
  ],
  ssr: true,
});
