"use client";
import { Fragment, useEffect } from "react";
import { useAccount } from "wagmi";
import { check } from "../../../actions/users";
import ReactLenis from "lenis/react";
import NavigationPublic from "./_components/navigation-public";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { address, isConnected } = useAccount();

  const handleCheck = async () => {
    if (address) {
      await check(address);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      handleCheck();
    }
  }, [address, isConnected]);
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
