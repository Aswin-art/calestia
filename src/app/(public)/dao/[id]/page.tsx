import { Fragment } from "react";
import { DetailProposal } from "@/app/(public)/dao/[id]/_components/detail-proposal";
import { Button } from "@/components/ui/button";
import { ChartPie } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DetailVote from "@/app/(public)/dao/[id]/_components/detail-vote";

export default function PageDetailDao() {
  return (
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

          <DetailVote show={false} />
        </SheetContent>
      </Sheet>

      <section className="py-28">
        <div className="container mx-auto">
          <div className="block w-full grid-cols-12 gap-x-10 sm:grid">
            <DetailProposal />
            <DetailVote show />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
