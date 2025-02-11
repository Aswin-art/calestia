import { Fragment } from "react";
import ReactLenis from "lenis/react";
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

        {children}
      </ReactLenis>
    </Fragment>
  );
}
