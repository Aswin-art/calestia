/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DaoProposal from "@/components/dao-proposal";
import { BlurIn } from "@/components/ui/blur-in";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import config from "@/lib/config";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { publicClient } from "@/lib/wagmi";
import { toast } from "sonner";
import cuid from "cuid";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must not be null!",
  }),
});

const formSchemaEmergency = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must not be null!",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration minimal 1 hours!",
  }),
});

export const Schedule: React.FC = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const formEmergency = useForm<z.infer<typeof formSchemaEmergency>>({
    resolver: zodResolver(formSchemaEmergency),
    defaultValues: {
      title: "",
      description: "",
      duration: 1,
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEmergency, setOpenEmergency] = useState(false);

  const { writeContract } = useWriteContract();

  const { data, isLoading, refetch } = useReadContract({
    abi: config.abi,
    address: config.address as `0x${string}`,
    functionName: "getAllProposals",
  });

  console.log(data);

  const { address } = useAccount();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) return;

    setLoading(true);

    const id = cuid();

    writeContract(
      {
        abi: config.abi,
        address: config.address as `0x${string}`,
        functionName: "createProposalLevel4",
        args: [values.title, values.description, id],
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
              setLoading(false);
              setOpen(false);
              toast("Success!", {
                description: "Proposal successfully created.",
              });
            } else {
              setLoading(false);
              toast("Failed!", {
                description: "Proposal failed to create.",
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
          console.log("failed create proposal: " + err);
          setOpen(false);
          setLoading(false);
        },
      },
    );
  }

  async function onSubmitEmergency(
    values: z.infer<typeof formSchemaEmergency>,
  ) {
    if (!address) return;

    setLoading(true);

    const id = cuid();

    writeContract(
      {
        abi: config.abi,
        address: config.address as `0x${string}`,
        functionName: "createEmergencyVote",
        args: [values.title, values.description, values.duration, id],
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
              setLoading(false);
              setOpenEmergency(false);
              toast("Success!", {
                description: "Proposal successfully created.",
              });
            } else {
              setLoading(false);
              toast("Failed!", {
                description: "Proposal failed to create.",
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
          console.log("failed create proposal emergency: " + err);
          setOpenEmergency(false);
          setLoading(false);
        },
      },
    );
  }

  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-6xl px-4 py-28 text-white"
    >
      <div>
        <BlurIn
          word="Arcalis Governance"
          className="text-edge-outline font-display z-10 cursor-default bg-white bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text px-0.5 py-3.5 text-center text-4xl font-bold whitespace-nowrap text-transparent lg:text-6xl"
        />

        <div className="space-y-4 lg:space-y-6">
          <p className="text-muted-foreground mx-auto max-w-2xl text-center">
            Al shouldn&apos;t be controlled by a select few. With Arcalis DAO,
            you have the power to vote, propose changes, and influence the
            future of Al. Join a decentralized community that values
            transparency, fairness, and user-driven innovation.
          </p>

          <div className="flex items-center gap-2">
            <Dialog open={open}>
              <button
                disabled={loading}
                onClick={() => setOpen(true)}
                type="button"
                className="animate-shimmer mx-auto ml-auto inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-semibold text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden"
              >
                Create Proposal
              </button>
              <DialogContent className="w-11/12 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Proposal</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to create a proposal. Provide the
                    necessary details to submit your proposal efficiently.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-4 items-center gap-4 space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="title..."
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="proposal description...."
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex w-full gap-2">
                      <Button
                        onClick={() => setOpen(false)}
                        type="button"
                        variant={"outline"}
                        disabled={loading}
                        className="cursor-pointer"
                      >
                        Close
                      </Button>
                      <Button
                        disabled={loading}
                        type="submit"
                        className="cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" /> Loading...
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog open={openEmergency}>
              <button
                disabled={loading}
                onClick={() => setOpenEmergency(true)}
                type="button"
                className="animate-shimmer mx-auto ml-auto inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-semibold text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden"
              >
                Create Emergency Proposal
              </button>
              <DialogContent className="w-11/12 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Emergency</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to create an emergency proposal.
                  </DialogDescription>
                </DialogHeader>

                <Form {...formEmergency}>
                  <form
                    onSubmit={formEmergency.handleSubmit(onSubmitEmergency)}
                    className="grid grid-cols-4 items-center gap-4 space-y-4"
                  >
                    <FormField
                      control={formEmergency.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="title..."
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formEmergency.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="proposal description...."
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formEmergency.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Durasi Jam</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="hours duration..."
                              autoComplete="off"
                              type="number"
                              min={1}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex w-full gap-2">
                      <Button
                        onClick={() => setOpenEmergency(false)}
                        type="button"
                        disabled={loading}
                        variant={"outline"}
                        className="cursor-pointer"
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" /> Loading...
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {isLoading && (
          <div className="mt-20 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 lg:mt-14">
          {Array.isArray(data) &&
            data.map((proposal: any) => (
              <Link href={`/dao/${proposal.dbId}`} key={proposal.dbId}>
                <DaoProposal
                  title={proposal.title}
                  description={proposal.description}
                  creator={proposal.creator}
                />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};
