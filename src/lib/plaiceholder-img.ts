"use server";

import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

export const plaiceholderImageRemote = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer, { size: 32 });
  return base64;
};

export async function plaiceholderImageLocal(src: string) {
  const buffer = src.startsWith("/")
    ? await fs.readFile("./public" + src)
    : await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );
  const { base64 } = await getPlaiceholder(buffer, { size: 32 });
  return base64;
}
