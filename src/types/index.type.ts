import { type ImageProps } from "next/image";

export type TAnimateParallaxImg = ImageProps & {
  start: number;
  end: number;
};

export type TChatMessage = {
  role: "user" | "assistant";
  content: TUserContent[] | string;
  model?: string;
  reasoning?: string;
  usage?: TTokenUsage;
};

export type TUserContent = {
  type: "text";
  text: string;
};

export type TTokenUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
