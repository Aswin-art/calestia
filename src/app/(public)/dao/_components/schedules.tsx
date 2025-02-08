/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AnimatedItem from "@/components/animate-item";
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
import { useAccount, useWriteContract } from "wagmi";
import config from "@/lib/config";
import { useState } from "react";
import { insert } from "../../../../../actions/proposals";
import { Loader2 } from "lucide-react";
import { GetProposalQuery } from "../../../../../queries/queryProposal";

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
      duration: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEmergency, setOpenEmergency] = useState(false);

  const { writeContract } = useWriteContract();

  const { data, isLoading, refetch } = GetProposalQuery();

  const { address } = useAccount();

  const handleCreateProposal = async (
    title: string,
    description: string,
    is_emergency: boolean,
  ) => {
    const req = await insert(
      title,
      description,
      address as string,
      is_emergency,
    );

    if (req) {
      setOpen(false);
      setLoading(false);
      return req;
    } else {
      setOpen(false);
      setLoading(false);
      return null;
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) return;

    setLoading(true);

    const proposal = await handleCreateProposal(
      values.title,
      values.description,
      false,
    );

    if (proposal) {
      writeContract(
        {
          abi: config.abi,
          address: config.address as `0x${string}`,
          functionName: "createProposalLevel4",
          args: [values.title, values.description, proposal.id],
          account: address,
        },
        {
          onSuccess: () => {
            setLoading(false);
            setOpen(false);
            console.log("Success");
            refetch();
            return;
          },
          onError: (err) => {
            console.log("failed create proposal: " + err);
            setOpen(false);
            setLoading(false);
          },
        },
      );
    } else {
      console.log("gagal");
    }
  }

  async function onSubmitEmergency(values: z.infer<typeof formSchema>) {
    if (!address) return;

    setLoading(true);

    const proposal = await handleCreateProposal(
      values.title,
      values.description,
      true,
    );

    const durationHours = 10;

    if (proposal) {
      writeContract(
        {
          abi: config.abi,
          address: config.address as `0x${string}`,
          functionName: "createEmergencyVote",
          args: [values.title, values.description, durationHours, proposal.id],
          account: address,
        },
        {
          onSuccess: () => {
            setLoading(false);
            setOpenEmergency(false);
            console.log("Success Emergency");
            refetch();
            return;
          },
          onError: (err) => {
            console.log("failed create proposal emergency: " + err);
            setOpenEmergency(false);
            setLoading(false);
          },
        },
      );
    }
  }

  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-28 text-white lg:py-48"
    >
      <BlurIn
        word="Launch Schedule"
        className="mb-10 text-2xl font-black text-zinc-50 uppercase lg:mb-14 lg:text-4xl"
      />

      <div className="space-y-6">
        <div className="flex gap-2">
          <Dialog open={open}>
            <button
              disabled={loading}
              onClick={() => setOpen(true)}
              className="animate-shimmer ml-auto inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden"
            >
              Create Proposal
            </button>
            <DialogContent className="w-11/12 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Proposal</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
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
                            placeholder="proposal title..."
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
                            placeholder="my proposal...."
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="col-span-4 cursor-pointer place-self-end"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog open={openEmergency}>
            <button
              disabled={loading}
              onClick={() => setOpenEmergency(true)}
              className="animate-shimmer ml-auto inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden"
            >
              Create Proposal Emergency
            </button>
            <DialogContent className="w-11/12 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Proposal Emergency</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
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
                            placeholder="proposal title..."
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
                            placeholder="my proposal...."
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="col-span-4 cursor-pointer place-self-end"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex w-full items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        ) : (
          Array.isArray(data) &&
          data.map((proposal: any) => (
            <AnimatedItem
              key={proposal.id}
              userWalletAddress={address as string}
              proposalId={proposal.id}
              title={proposal.title}
              description={proposal.description}
              totalUpVote={proposal.upvote}
              totalDownVote={proposal.downvote}
            />
          ))
        )}
      </div>
    </section>
  );
};
