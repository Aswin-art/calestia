import Link from "next/link";
import React, { Fragment } from "react";
// import { Schedule } from "@/app/(public)/dao/_components/schedules";

export default function PageDao() {
  return (
    <Fragment>
      {/* <Schedule /> */}
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h3 className="text-4xl font-bold">Coming Soon</h3>
        <p className="text-muted-foreground mt-5 max-w-2xl text-center">
          Decentralized Autonomous Organization (DAO) functionality is coming
          soon! We&apos;re working hard to bring you a seamless and secure DAO
          experience. Stay tuned for updates!
        </p>
        <div className="mt-8 text-center">
          <Link href={"/"} className="hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
