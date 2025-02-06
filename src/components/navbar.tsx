"use client";
import ButtonConnect from "@/app/(public)/_components/button-connect";
import { Providers } from "@/app/providers";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { address } = useAccount();

  useEffect(() => {
    console.log("wallet: ", address);
  }, [address]);
  return (
    <Providers>
      <div className="fixed left-0 right-0 top-0 z-20 w-full p-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-input bg-background p-4">
          <aside className="flex items-center gap-2">
            <Link href={"/"} className="text-xl font-bold">
              Annect
            </Link>
          </aside>
          <nav className="hidden flex-grow items-center justify-center gap-4 lg:flex"></nav>
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <ButtonConnect />
          </div>
        </div>
      </div>
    </Providers>
  );
};

export default Navbar;
