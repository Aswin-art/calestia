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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const Schedule: React.FC = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

          <div className="flex items-center justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <button className="animate-shimmer mx-auto ml-auto inline-flex h-12 items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-semibold text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden">
                  Create Proposal
                </button>
              </DialogTrigger>
              <DialogContent className="w-11/12 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-4 items-center gap-4 space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="shadcn"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="col-span-4 place-self-end">
                      Submit
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 lg:mt-14">
          {Array.from({ length: 10 }, (_, idx) => (
            <Link href={`/dao/${idx + 1}`} key={idx}>
              <DaoProposal
                title={`${idx + 1}-NG-2adasdsadsadsdasddasdsadaddsdasdadasdsad1`}
                description="adoaskdoksaodksao"
                token="12312xh8g8z8gx120kxkxaksia9z91"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
