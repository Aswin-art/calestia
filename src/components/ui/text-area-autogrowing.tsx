"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChangeEvent, SetStateAction, useId, useRef } from "react";

import React from "react";

type TTextAreatAutoGrowing = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreatAutoGrowing: React.FC<
  TTextAreatAutoGrowing & {
    setText: (value: SetStateAction<string>) => void;
  }
> = ({ className, setText, ...props }) => {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultRows = 1;
  const maxRows = undefined;

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight =
      parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    const paddingHeight =
      parseInt(style.paddingTop) + parseInt(style.paddingBottom);

    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = maxRows
      ? lineHeight * maxRows + borderHeight + paddingHeight
      : Infinity;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
    setText(textarea.value);
  };

  return (
    <Textarea
      id={id}
      ref={textareaRef}
      onChange={handleInput}
      rows={defaultRows}
      className={cn("resize-none", className)}
      {...props}
    />
  );
};
