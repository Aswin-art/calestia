/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeCheck, Loader2, Minus, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import config from "@/lib/config";
import { toast } from "sonner";
import { publicClient } from "@/lib/wagmi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

function PricingFeature() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [planName, setPlanName] = useState("");
  const [userLevel, setUserLevel] = useState(0);

  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const checkUserLevel = async () => {
    const level: any = await publicClient.readContract({
      address: config.address as `0x${string}`,
      abi: config.abi,
      functionName: "userLevel",
      args: [address],
    });

    return setUserLevel(Number(level));
  };

  const checkSubscription = async () => {
    if (!address) return false;

    try {
      const data = await publicClient.readContract({
        address: config.address as `0x${string}`,
        abi: config.abi,
        functionName: "isSubscriptionActiveForUser",
        args: [address],
      });
      return data;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  };

  const confirmPurchase = async (name: string) => {
    setPlanName(name);
    try {
      const hasSubs = await checkSubscription();
      if (hasSubs) {
        setOpenDialog(true);
      } else {
        await handleBuyPackage(name);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error checking subscription status");
    }
  };

  const getPackagePrice = (name: string): bigint => {
    const priceMapping: Record<string, bigint> = {
      Scholar: BigInt(200000000000000),
      Innovator: BigInt(300000000000000),
      Visionary: BigInt(400000000000000),
    };
    return priceMapping[name] || BigInt(0);
  };

  const getPackageLevel = (name: string): number => {
    const levelMapping: Record<string, number> = {
      Scholar: 2,
      Innovator: 3,
      Visionary: 4,
    };
    return levelMapping[name] || 0;
  };

  const handleBuyPackage = async (name: string) => {
    return toast("Failed To Buy", {
      description: "Our bitfinity server is currently down!",
    });

    if (!address) {
      toast.error("Wallet client not initialized");
      return;
    }

    setLoading(true);
    try {
      if (!address) {
        toast.error("Please connect your wallet first");
        throw new Error("No connected wallet");
      }

      const level = getPackageLevel(name);
      const price = getPackagePrice(name);

      writeContract(
        {
          abi: config.abi,
          address: config.address as `0x${string}`,
          functionName: "purchasePackage",
          args: [level],
          account: address,
          value: price,
        },
        {
          onSuccess: async (hash) => {
            try {
              const result = await publicClient.waitForTransactionReceipt({
                hash,
                confirmations: 1,
              });

              if (result.status === "success") {
                setLoading(false);
                toast.success("🎉 Subscription purchased successfully!");
              } else {
                setLoading(false);
                toast("Failed!", {
                  description: "Subscription failed to buy.",
                });
              }
            } catch (err) {
              console.log(err);
              setLoading(false);
              toast("Failed!", {
                description: "Transaction confirmation failed.",
              });
            }
          },
          onError: (err) => {
            console.log(err);
            setLoading(false);
          },
        },
      );
    } catch (error: any) {
      if (error?.message?.includes("User rejected request")) {
        toast.warning("Transaction canceled by user");
      } else {
        console.error("Transaction error:", error);
        toast.error("❌ Failed to purchase subscription");
      }
    }
  };

  useEffect(() => {
    if (address) {
      checkUserLevel();
    }
  }, [address]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Badge>Beta Price</Badge>

          <div className="flex flex-col gap-2">
            <h2 className="font-regular max-w-2xl text-center text-3xl tracking-tighter md:text-5xl">
              Evolve with AI, Governed by You
            </h2>
            <p className="text-muted-foreground max-w-xl text-center text-lg leading-relaxed tracking-tight">
              Scalable Plans for Every Stage of Your AI Journey
            </p>
          </div>
          <div className="overflow-x-auto md:overflow-visible">
            <div className="grid w-full grid-cols-4 divide-x pt-20 text-left lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-1"></div>
              <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
                <p className="text-2xl">Explorer</p>
                <p className="text-muted-foreground text-sm">
                  Basic chatbot functionality with no customization or DAO
                  interaction. Have 0 voting power.
                </p>
                <br />
                <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
                  <span className="text-2xl">Free</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / month
                  </span>
                </p>
                <Link
                  href={"/chat"}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "mt-8 gap-4",
                    }),
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Loading...
                    </>
                  ) : (
                    <>
                      Try it <MoveRight className="h-4 w-4" />
                    </>
                  )}
                </Link>
              </div>
              <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
                <p className="text-2xl">Scholar</p>
                <p className="text-muted-foreground text-sm">
                  Advanced chatbot responses and DAO voting rights for community
                  proposals.
                </p>
                <br />
                <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
                  <span className="text-2xl">0.0002 ETH</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / month
                  </span>
                </p>
                <Button
                  disabled={loading || userLevel === 2}
                  onClick={() => confirmPurchase("Scholar")}
                  className="mt-8 cursor-pointer gap-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Loading...
                    </>
                  ) : userLevel === 2 ? (
                    <>
                      <BadgeCheck /> Current Level
                    </>
                  ) : (
                    <>
                      Try it <MoveRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
                <p className="text-2xl">Innovator</p>
                <p className="text-muted-foreground text-sm">
                  Personalized AI recommendations, extended conversation
                  history, and the ability to create governance proposals.
                </p>
                <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
                  <span className="text-2xl">0.0003 ETH</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / month
                  </span>
                </p>
                <Button
                  disabled={loading || userLevel === 3}
                  onClick={() => confirmPurchase("Innovator")}
                  className="mt-8 cursor-pointer gap-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Loading...
                    </>
                  ) : userLevel === 3 ? (
                    <>
                      <BadgeCheck /> Current Level
                    </>
                  ) : (
                    <>
                      Try it <MoveRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
                <p className="text-2xl">Visionary</p>
                <p className="text-muted-foreground text-sm">
                  The most powerful AI model, premium support, highly
                  personalized interactions, and the highest voting power in
                  governance.
                </p>
                <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
                  <span className="text-2xl">0.0004 ETH</span>
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / month
                  </span>
                </p>
                <Button
                  disabled={loading || userLevel === 4}
                  onClick={() => confirmPurchase("Visionary")}
                  className="mt-8 cursor-pointer gap-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Loading...
                    </>
                  ) : userLevel === 4 ? (
                    <>
                      <BadgeCheck className="h-4 w-4" /> Current Level
                    </>
                  ) : (
                    <>
                      Try it <MoveRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                <b>Features</b>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Deepseek R1
              </div>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Minimax 01
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    20/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    100/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    500/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Qwen Turbo
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    10/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    100/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    500/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Liquid LFM 7B
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <Minus className="text-muted-foreground h-4 w-4" />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    20/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    500/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Gemini 2.0
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <Minus className="text-muted-foreground h-4 w-4" />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    20/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    500/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Microsoft Phi 4
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <Minus className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <Minus className="text-muted-foreground h-4 w-4" />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                    30/daily
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Daily Response</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-muted-foreground flex justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                Unlimited
              </div>
              <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
                Voting Power
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <p className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                  0 Power
                </p>
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <p className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                  1 Power
                </p>
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <p className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                  2 Power
                </p>
              </div>
              <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
                <p className="text-muted-foreground flex cursor-pointer justify-center px-3 py-1 text-sm md:px-6 md:py-4">
                  3 Power
                </p>
              </div>
            </div>
          </div>
          <AlertDialog open={openDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current subscription and remove your subscription data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="cursor-pointer"
                  onClick={() => {
                    setLoading(false);
                    setOpenDialog(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenDialog(false);
                    handleBuyPackage(planName);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export { PricingFeature };
