/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Fragment, useEffect, useState } from "react";
import { DetailProposal } from "@/app/(public)/dao/[id]/_components/detail-proposal";
import { Button } from "@/components/ui/button";
import { ChartPie, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DetailVote from "@/app/(public)/dao/[id]/_components/detail-vote";
import { useParams } from "next/navigation";
import config from "@/lib/config";
import { publicClient } from "@/lib/wagmi";

export default function PageDetailDao() {
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [proposals, setProposals] = useState<any>([]);
  const [votesData, setVotesData] = useState<any>([]);

  const params = useParams();

  const fetchDetailProposal = async () => {
    try {
      const result: any = await publicClient.readContract({
        address: config.address as `0x${string}`,
        abi: config.abi,
        functionName: "getProposalByDbId",
        args: [params.id],
      });

      setProposals(result);
      setLoadingFetch(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVotesData = async () => {
    try {
      const result: any = await publicClient.readContract({
        abi: config.abi,
        address: config.address as `0x${string}`,
        functionName: "getVoterDetails",
        args: [proposals?.id],
      });

      setVotesData(result);
      setLoadingFetch(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVotesData();
    fetchDetailProposal();
  }, []);

  return loadingFetch ? (
    <div className="flex h-[300px] items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <Fragment>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="submit"
            className="animate-shimmer fixed right-5 bottom-4 inline-flex size-14 cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden md:hidden"
          >
            <ChartPie className="stroke-green-200" size="25px" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[350px] sm:w-[700px]">
          <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>

          <DetailVote
            show={false}
            id={proposals?.id}
            result={proposals}
            refetch={fetchDetailProposal}
            refetchVotes={fetchVotesData}
          />
        </SheetContent>
      </Sheet>

      <section className="py-28">
        <div className="container mx-auto">
          <div className="block w-full grid-cols-12 gap-x-10 sm:grid">
            <DetailProposal result={proposals} votesData={votesData} />
            <DetailVote
              show
              id={proposals?.id}
              result={proposals}
              refetch={fetchDetailProposal}
              refetchVotes={fetchVotesData}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
