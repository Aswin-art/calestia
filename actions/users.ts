"use server";

import { db } from "../lib/db";

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
