import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { holesky } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Arcalis AI",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    holesky,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [holesky] : []),
  ],
  ssr: true,
});
