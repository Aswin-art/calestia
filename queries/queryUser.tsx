import { useQuery } from "@tanstack/react-query";
import { check } from "../actions/users";

export const CheckQuery = (wallet_address: string) => {
  return useQuery({
    queryKey: ["check-users-" + wallet_address],
    queryFn: () => check(wallet_address),
    enabled: !!wallet_address,
  });
};
