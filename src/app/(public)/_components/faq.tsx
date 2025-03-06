import IconDiscord from "@/assets/icons/discord";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const FAQ = () => {
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div className="flex flex-col">
        <p className="lg:text-md text-sm">FAQ</p>
        <div className="mt-2">
          <h3 className="text-2xl font-bold lg:text-6xl">
            Got questions? We have answers!
          </h3>
          <p className="text-muted-foreground lg:text-md mt-5 text-sm">
            Everything you need to know about product and billing
          </p>

          <Link
            href={"https://discord.gg/ps4HpGEcS7"}
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "mt-5",
              }),
            )}
          >
            Talk to us <IconDiscord />
          </Link>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-md lg:text-lg">
            How is Calestia different from ChatGPT or other centralized AI
            platforms?
          </AccordionTrigger>
          <AccordionContent>
            Unlike centralized services, Calestia is governed by its users. You
            own your data, vote on platform upgrades, and access multiple AI
            models in one place—all secured by blockchain. No corporate
            middlemen, no hidden biases.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-md lg:text-lg">
            How does Calestia protect my data privacy?
          </AccordionTrigger>
          <AccordionContent>
            We leverage Manta Network’s{" "}
            <span className="font-bold">zero-knowledge proofs (ZKPs)</span> to
            process AI transactions without exposing sensitive information. Your
            interactions remain encrypted, and data is never sold to third
            parties.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-md lg:text-lg">
            How does the DAO voting system work?
          </AccordionTrigger>
          <AccordionContent>
            Voting power grows with your subscription tier and activity{" "}
            <span className="font-bold">
              (Quadratic Voting + Proof-of-Engagement).
            </span>{" "}
            Propose ideas, vote on upgrades, and shape Calestia’ roadmap. Only
            Visionary-tier users can submit technical proposals (after KYC
            verification).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-md lg:text-lg">
            What is Auto-Selection AI?
          </AccordionTrigger>
          <AccordionContent>
            Our proprietary system analyzes your task (text, image, or data) and
            automatically routes it to the best-suited AI model. Prioritize
            speed, accuracy, or cost—or let Calestia optimize all three.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-md lg:text-lg">
            What’s next for Calestia?
          </AccordionTrigger>
          <AccordionContent>
            We’re expanding to 10+ AI models, launching decentralized AI
            training, and integrating with Ethereum/Polygon. Join our beta to
            test new features and earn governance rewards!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
