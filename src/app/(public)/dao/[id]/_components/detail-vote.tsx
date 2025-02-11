/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChartVote } from "./chart-vote";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import config from "@/lib/config";
import { publicClient } from "@/lib/wagmi";

const DetailVote: React.FC<{
  show: boolean;
  id: number;
  result: any;
  refetch: () => void;
  refetchVotes: () => void;
}> = ({ show = true, id, result, refetch, refetchVotes }) => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const [vote, setVote] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleVote = () => {
    if (!address) {
      setVote(null);
      return toast("Failed To Vote", {
        description: "Please connect your wallet before voted!",
      });
    }

    if (vote === null) {
      setVote(null);
      return toast("Failed To Vote", {
        description: "Please make your choice before voted!",
      });
    }

    if (id === null) {
      setVote(null);
      return toast("Failed To Vote", {
        description: "There is no proposal to vote!",
      });
    }

    setLoading(true);

    writeContract(
      {
        abi: config.abi,
        address: config.address as `0x${string}`,
        functionName: "voteOnProposal",
        args: [id, vote],
        account: address,
      },
      {
        onSuccess: async (hash) => {
          try {
            const result = await publicClient.waitForTransactionReceipt({
              hash,
              confirmations: 1,
            });

            if (result.status === "success") {
              refetch();
              refetchVotes();
              setVote(null);
              setLoading(false);
              toast("Success Vote!", {
                description: "Your vote choice is recorded.",
              });
            } else {
              setVote(null);
              setLoading(false);
              toast("Failed Vote!", {
                description: "Your vote choice is not recorded.",
              });
            }
          } catch (err) {
            console.log(err);
            setVote(null);
            setLoading(false);
            toast("Failed!", {
              description: "Transaction confirmation failed.",
            });
          }
        },
        onError: (err) => {
          console.log("failed vote: " + err);
          setLoading(false);
          toast("Failed!", {
            description: "You cannot to vote.",
          });
        },
      },
    );
  };
  return (
    <aside
      className={cn("mt-10 h-full w-full md:col-span-4 md:mt-24", {
        "block md:hidden": !show,
        "hidden md:block": show,
      })}
    >
      <div className="flex w-full gap-x-2.5 space-y-3.5">
        <Button
          onClick={() => setVote((prev) => (prev === true ? null : true))}
          type="button"
          className={`w-full cursor-pointer rounded-full border-2 border-solid bg-[rgba(255,255,255,0.1)] py-6 text-base font-semibold uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)] lg:text-lg ${
            vote === true
              ? "border-green-500 text-green-500"
              : "border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.8)]"
          }`}
        >
          For
        </Button>
        <Button
          onClick={() => setVote((prev) => (prev === false ? null : false))}
          type="button"
          className={`w-full cursor-pointer rounded-full border-2 border-solid bg-[rgba(255,255,255,0.1)] py-6 text-base font-semibold uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)] lg:text-lg ${
            vote === false
              ? "border-red-500 text-red-500"
              : "border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.8)]"
          }`}
        >
          Againts
        </Button>
      </div>

      <Button
        type="button"
        onClick={handleVote}
        disabled={vote == null || loading}
        className="w-full cursor-pointer rounded-full border-2 border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] py-6 text-base font-semibold text-[rgba(255,255,255,0.8)] uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)] lg:text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> Loading...
          </>
        ) : (
          <>Vote</>
        )}
      </Button>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Result</h3>
        <ChartVote result={result} />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Timeline</h3>

        <Timeline>
          <TimelineItem>
            <TimelineHeading>Created</TimelineHeading>
            <TimelineDot status="current" />
            <TimelineLine done />
            <TimelineContent>Jan 29, 2025 - 6:11 PM</TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineHeading>Start</TimelineHeading>
            <TimelineDot status="current" />
            <TimelineLine done />
            <TimelineContent>Jan 29, 2025 - 6:11 PM</TimelineContent>
          </TimelineItem>
          <TimelineItem status="done">
            <TimelineHeading>Test</TimelineHeading>
            <TimelineDot status="done" />
            <TimelineContent>Jan 29, 2025 - 6:11 PM</TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </aside>
  );
};

export default DetailVote;
