import { Navigation } from "@/components/layouts/navbars/nav";
import ReactLenis from "lenis/react";
import { Fragment } from "react";
import NavigationPublic from "./_components/navigation-public";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <NavigationPublic />
        {/* <Navigation /> */}
        {children}
      </ReactLenis>
    </Fragment>
  );
}
