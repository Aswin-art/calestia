"use client";
import ButtonConnect from "@/app/(public)/_components/button-connect";
import { Providers } from "@/app/providers";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { check } from "../../actions/users";

const Navbar = () => {
  const { address } = useAccount();

  const handleCheck = async () => {
    if (address) {
      await check(address);
    }
  };

  useEffect(() => {
    if (address) {
      handleCheck();
    }
  }, [address]);
  return (
    <Providers>
      <div className="fixed top-0 right-0 left-0 z-20 w-full p-4">
        <div className="border-input bg-background flex items-center justify-between gap-4 rounded-xl border p-4">
          <aside className="flex items-center gap-2">
            <Link href={"/"} className="text-xl font-bold">
              Arcalis
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
