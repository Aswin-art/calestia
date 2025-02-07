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
  DialogTrigger,
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must not be null!",
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
        <div className="flex items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <button className="animate-shimmer ml-auto inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden">
                Action Click
              </button>
            </DialogTrigger>
            <DialogContent className="w-11/12 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
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

                  <Button type="submit" className="col-span-4 place-self-end">
                    Submit
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <AnimatedItem title="NG-21" description="adoaskdoksaodksao" />
          <AnimatedItem title="Starlink" description="adoaskdoksaodksao" />
          <AnimatedItem title="Turksat 6A" description="adoaskdoksaodksao" />
          <AnimatedItem title="NROL-186" description="adoaskdoksaodksao" />
          <AnimatedItem title="GOES-U" description="adoaskdoksaodksao" />
          <AnimatedItem title="ASTRA 1P" description="adoaskdoksaodksao" />
        </div>
      </div>
    </section>
  );
};
