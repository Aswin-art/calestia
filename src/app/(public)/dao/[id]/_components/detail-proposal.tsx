import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, House, PanelsTopLeft } from "lucide-react";
import Image from "next/image";
import { DataTableVotes } from "./tables/data-table";
import { columnsVotes } from "./tables/columns";
import { dummyVotes } from "@/assets/data";

export const DetailProposal: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="col-span-12 px-4 md:col-span-8">
      <TabsList className="border-border h-auto rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <House
            className="mb-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="votes"
          className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-sm after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <PanelsTopLeft
            className="mb-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Votes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-edge-outline font-display z-10 cursor-default bg-white bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-2xl text-transparent md:text-4xl">
            Comunity Business Development Initiative for Aventus 2.0
          </h2>

          <Button
            type="button"
            className="rounded-full bg-green-600 px-9 text-lg font-semibold text-white hover:bg-green-700"
          >
            Active
          </Button>

          <div className="flex items-center gap-x-2">
            <Image
              src={"/vercel.svg"}
              width={35}
              height={35}
              className="rounded-full"
              alt="flag"
            />
            <p className="truncate text-lg font-bold">
              adiasd0j102j0jd010dsa0kd9k10j00dj01wm009m0
            </p>
          </div>
          <p className="text-muted-foreground text-sm font-semibold">
            10 January 2025, 6 days ago
          </p>
        </div>

        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            assumenda reiciendis accusamus qui cupiditate nemo explicabo
            blanditiis numquam quasi? Necessitatibus est veritatis nihil dolor
            quaerat quod eveniet voluptatum nulla voluptates. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Reiciendis non molestias
            aliquam, saepe a doloremque iusto commodi voluptatibus.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores,
            ducimus eos pariatur porro nemo esse. Atque ab perferendis, quisquam
            quis inventore blanditiis minus praesentium itaque optio eos
            dignissimos eum fugiat.
          </p>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            hic non, est vitae magni assumenda sapiente harum incidunt ipsum.
            Labore fuga voluptas cum modi ducimus quae temporibus, ut numquam
            blanditiis?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            hic non, est vitae magni assumenda sapiente harum incidunt ipsum.
            Labore fuga voluptas cum modi ducimus quae temporibus, ut numquam
            blanditiis?
          </p>

          <ul className="list-inside list-disc">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
              adipisci.
            </p>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>

          <ul className="list-inside list-disc">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
              adipisci.
            </p>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
            <li>
              Now this is a story all about how, my life got flipped-turned
              upside down
            </li>
          </ul>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium mollitia atque optio architecto modi et quis provident
            porro necessitatibus numquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            maxime deleniti voluptatum quaerat mollitia temporibus molestias
            quos eaque! Ad laudantium reprehenderit earum molestias! Tempora
            atque optio debitis.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium mollitia atque optio architecto modi et quis provident
            porro necessitatibus numquam.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="votes" className="mt-8 space-y-8">
        <DataTableVotes columns={columnsVotes} data={dummyVotes} />
      </TabsContent>
    </Tabs>
  );
};
