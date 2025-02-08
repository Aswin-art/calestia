import { useQuery } from "@tanstack/react-query";
import { getAllData } from "../actions/proposals";

export const GetProposalQuery = () => {
  return useQuery({
    queryKey: ["get-all-data-proposal"],
    queryFn: () => getAllData(),
  });
};
