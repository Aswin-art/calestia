"use server";

import { cookies } from "next/headers";

export const cookiesManagement = async (
  save: boolean = false,
  address?: string,
) => {
  const cookieStore = await cookies();

  if (save) {
    cookieStore.set("session-address", JSON.stringify({ value: address }));
  } else {
    cookieStore.delete("session-address");
  }
};
