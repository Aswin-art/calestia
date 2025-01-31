import { Navigation } from "@/components/layouts/navbars/nav";
import { Fragment } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  );
}
