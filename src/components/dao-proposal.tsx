"use client";
import { motion } from "framer-motion";
import { Check, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { votesProposal } from "../../actions/proposals";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import config from "@/lib/config";
import { GetProposalQuery } from "../../queries/queryProposal";

export default function DaoProposal({
  userWalletAddress,
  proposalId,
  totalUpVote,
  totalDownVote,
  title,
  description,
  token,
}: {
  userWalletAddress: string;
  proposalId: string;
  title: string;
  description: string;
  totalUpVote: number;
  totalDownVote: number;
  token: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const { writeContract } = useWriteContract();

  const { refetch } = GetProposalQuery();

  const { data } = useReadContract({
    abi: config.abi,
    address: config.address as `0x${string}`,
    functionName: "getProposalByDbId",
    args: [proposalId],
  });

  const { address } = useAccount();

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  }

  const handleVotes = async (vote: boolean) => {
    if (!address || !data) return;
    setLoading(true);
    const req = await votesProposal(proposalId, userWalletAddress, vote);

    if (req) {
      writeContract(
        {
          abi: config.abi,
          address: config.address as `0x${string}`,
          functionName: "voteOnProposal",
          args: [(data as { id: string }).id, vote],
          account: address,
        },
        {
          onSuccess: () => {
            setLoading(false);
            console.log("Success");
            refetch();
            return;
          },
          onError: (err) => {
            console.log("failed create proposal: " + err);
            setLoading(false);
            return;
          },
        },
      );
    } else {
      setLoading(false);
      console.log("already vote");
      return;
    }
  };

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative h-52 w-full overflow-hidden rounded-2xl border border-zinc-600 duration-700 hover:border-zinc-400/50 hover:bg-zinc-800/10"
      >
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
            pointerEvents: "none",
          }}
        />

        <article className="p-4 md:p-8">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display z-20 text-xl font-medium text-zinc-200 duration-1000 group-hover:text-white">
              {title}
            </h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Check className="h-4 w-4" /> {totalUpVote}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <X className="h-4 w-4" /> {totalDownVote}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="z-20 mt-4 text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
              {description}
            </p>

            <div className="flex gap-2">
              <Button
                onClick={() => handleVotes(true)}
                type="button"
                disabled={loading}
                className="cursor-pointer bg-green-500 hover:bg-green-800"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Up Votes</>}
              </Button>
              <Button
                onClick={() => handleVotes(false)}
                type="button"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>Down Votes</>
                )}
              </Button>
            </div>
          </div>
        </article>
        <article className="h-full p-4">
          {/* <div className="flex items-center justify-between gap-2">
            <span className="drop-shadow-orange text-xs text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:text-white">
              <span>SOON</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Eye className="h-4 w-4" /> 12312132
            </span>
          </div> */}
          <h2 className="font-display z-20 truncate text-xl font-semibold text-zinc-200 duration-1000 group-hover:text-white">
            {title}
          </h2>

          <div className="flex items-center gap-x-2">
            <div className="size-2 rounded-full bg-green-600"></div>
            <p className="truncate text-sm">{token}</p>
          </div>

          <p className="mt-4 line-clamp-6 text-sm text-zinc-400 group-hover:text-zinc-200">
            {description} Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Quasi ea optio sint alias aut illo dolorum at quae natus
            perferendis iure fugiat itaque laborum voluptas corrupti, sequi quo
            voluptates magnam! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Neque fugiat obcaecati doloribus, officiis dicta
            dolor numquam ab voluptates adipisci consequatur quisquam ducimus
            debitis expedita officia sapiente veniam earum natus? Repellat.
          </p>
        </article>
      </motion.div>
    </motion.div>
  );
}
