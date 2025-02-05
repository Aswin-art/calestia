import { Navigation } from "@/components/layouts/navbars/nav";
import ReactLenis from "lenis/react";
import { Fragment } from "react";

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
        <Navigation />
        {children}
      </ReactLenis>
    </Fragment>
  );
}
