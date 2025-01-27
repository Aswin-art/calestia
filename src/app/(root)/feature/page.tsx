import GaleryAi from "@/app/(root)/feature/_components/galery-ai";
import { Schedule } from "@/app/(root)/feature/_components/schedules";
import { Navigation } from "@/components/layouts/navbars/nav";
import React, { Fragment } from "react";

const PageFeature = () => {
  return (
    <Fragment>
      <Navigation />
      <GaleryAi />
      <Schedule />
    </Fragment>
  );
};

export default PageFeature;
