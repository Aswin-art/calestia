import ABI from "@/constants/ABI.json";

const contract_address = process.env.NEXT_PUBLIC_WEB3_CONTRACT_ADDRESS;

const config = {
  abi: ABI,
  address: contract_address ?? "",
};

export default config;
