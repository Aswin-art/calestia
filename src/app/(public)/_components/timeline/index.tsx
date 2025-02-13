import React from "react";
import { Timeline } from "./timeline-wrapper";
import { CheckCircle } from "lucide-react";

export function TimelineArcalis() {
  const data = [
    {
      title: "Phase 1",
      content: (
        <div>
          <h3 className="font-bold">
            Beta Test Launch & Feedback Session & DAO Activation (Q1 2025)
          </h3>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Objective: Release the beta version of the Arcalis platform for
            testing and gather community feedback.
          </p>
          <ul className="mb-8 list-none pl-5 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR1: Deploy the beta version of Arcalis chatbot with core
                functionalities.
              </span>
            </li>
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR2: Onboard 500+ early testers and collect qualitative and
                quantitative feedback.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR3: Optimize model performance to achieve latency &lt;2s (90th
                percentile).
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Phase 2",
      content: (
        <div>
          <h3 className="font-bold">
            Full Chatbot Launch & Product Development (Q2 2025 – Q3 2025)
          </h3>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Objective: Officially launch the full version of the Arcalis chatbot
            with multiple AI models and increased stability while preparing new
            product offerings.
          </p>
          <ul className="mb-8 list-none pl-5 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR1: Expand AI chatbot with at least 10 distinct AI models
                tailored for different use cases.
              </span>
            </li>
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>Achieve 3,000 DAU (Daily Active Users) post-launch.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                Develop and introduce at least 2 new Arcalis products in R&D
                phase.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Phase 3",
      content: (
        // <div>
        //   <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
        //     Deployed 5 new components on Aceternity today
        //   </p>
        //   <div className="mb-8">
        //     <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
        //       ✅ Card grid component
        //     </div>
        //     <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
        //       ✅ Startup template Aceternity
        //     </div>
        //     <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
        //       ✅ Random file upload lol
        //     </div>
        //     <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
        //       ✅ Himesh Reshammiya Music CD
        //     </div>
        //     <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
        //       ✅ Salman Bhai Fan Club registrations open
        //     </div>
        //   </div>
        //   <div className="grid grid-cols-2 gap-4">
        //     <Image
        //       src="https://assets.aceternity.com/pro/hero-sections.png"
        //       alt="hero template"
        //       width={500}
        //       height={500}
        //       className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
        //     />
        //     <Image
        //       src="https://assets.aceternity.com/features-section.png"
        //       alt="feature template"
        //       width={500}
        //       height={500}
        //       className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
        //     />
        //     <Image
        //       src="https://assets.aceternity.com/pro/bento-grids.png"
        //       alt="bento template"
        //       width={500}
        //       height={500}
        //       className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
        //     />
        //     <Image
        //       src="https://assets.aceternity.com/cards.png"
        //       alt="cards template"
        //       width={500}
        //       height={500}
        //       className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
        //     />
        //   </div>
        // </div>
        <div>
          <h3 className="font-bold">Product Expansion (Q4 2026 – Q1 2026)</h3>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Objective: Launch new products and activate DAO governance for
            community-driven decision-making.
          </p>
          <ul className="mb-8 list-none pl-5 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR1: Release at least 3 new Arcalis products into production.
              </span>
            </li>
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR2: Implement DAO voting mechanism with active governance
                participation.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                Reach 10,000+ community members engaged in governance
                discussions.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Phase 4",
      content: (
        <div>
          <h3 className="font-bold">
            Full-Scale Adoption & Strategic Partnerships (Q2 2026)
          </h3>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Objective: Scale adoption, establish partnerships, and drive global
            impact.
          </p>
          <ul className="mb-8 list-none pl-5 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR1: Secure at least 3 strategic partnerships with blockchain or
                AI projects.
              </span>
            </li>
            <li className="mb-2 flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR2: Expand decentralized AI governance model to external
                projects.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2" size={16} />
              <span>
                KR3: Reach 50,000+ global users and ensure sustainability of the
                ecosystem.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "TBA",
      content: (
        <div>
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Upcoming features are under development.{" "}
            <span className="font-bold">Stay tuned!</span>
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-40 min-h-screen w-full">
      <div className="w-full" id="timeline">
        <Timeline data={data} />
      </div>
    </div>
  );
}
