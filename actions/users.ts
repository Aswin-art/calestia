/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "../src/lib/db";

export const check = async (wallet_address: string) => {
  if (!wallet_address) return null;

  try {
    const user = await db.users.findFirst({
      where: {
        wallet_address,
      },
    });

    if (user) return user;

    const create = await insert(wallet_address);

    if (!create) return null;

    return create;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const insert = async (wallet_address: string) => {
  try {
    const user = await db.users.create({
      data: {
        wallet_address,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addSubscription = async (level: number, wallet_address: any) => {
  if (!level || !wallet_address) return null;
  try {
    const user = await db.users.update({
      where: {
        wallet_address: wallet_address,
      },
      data: {
        subscription: level,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
