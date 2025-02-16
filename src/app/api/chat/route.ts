/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createParser, type EventSourceMessage } from "eventsource-parser";
import { redisClient } from "@/lib/redis";
import { MODEL_CONFIG, TIER_CONFIG } from "@/assets/data";

export const runtime = "edge";

interface ChatPayload {
  model: keyof typeof MODEL_CONFIG;
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  response_format?: { type: string; schema?: any };
  extra_body?: any;
}

const authenticate = (
  req: NextRequest,
): { userId: string; tier: keyof typeof TIER_CONFIG } => {
  const userId = req.headers.get("x-user-id") || "anonymous";
  const tier = req.headers.get("x-user-tier") || "Explorer";

  if (!TIER_CONFIG[tier]) {
    throw new Error("Invalid tier configuration");
  }

  return { userId, tier: tier as keyof typeof TIER_CONFIG };
};

const validateAccess = (
  model: keyof typeof MODEL_CONFIG,
  tier: keyof typeof TIER_CONFIG,
): NextResponse | null => {
  const tierModelAccess = TIER_CONFIG[tier].modelAccess;

  if (!(model in tierModelAccess) || tierModelAccess[model] <= 0) {
    return NextResponse.json(
      { error: "Model not available for your tier" },
      { status: 403 },
    );
  }

  return null;
};

export async function GET(request: Request) {
  return NextResponse.json(
    {
      message: "asmasn",
    },
    {
      status: 200,
    },
  );
}

export async function POST(request: NextRequest) {
  try {
    const { userId, tier } = authenticate(request);
    const { searchParams } = new URL(request.url);
    const body = await request.json();

    const { model, messages, stream, schema } = body;
    const conversationId =
      searchParams.get("conversationId") || Date.now().toString();

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      typeof messages[messages.length - 1].content !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }

    // Validate model access
    const accessValidation = validateAccess(model, tier);
    if (accessValidation) return accessValidation;

    // Get model configuration
    const modelConfig = MODEL_CONFIG[model];
    if (!modelConfig) {
      return NextResponse.json(
        { error: "Invalid model configuration" },
        { status: 400 },
      );
    }

    let history: any[] = [];
    try {
      history = await redisClient.getHistory(userId, conversationId);
    } catch (error) {
      console.error("Error fetching history:", error);
      history = [];
    }

    // Build payload
    const payload: ChatPayload = {
      model,
      messages: [
        ...history.map(({ role, content }) => ({ role, content })),
        ...messages,
      ],
      stream,
      max_tokens: modelConfig.maxTokens,
      temperature: 0.7,
      ...(modelConfig.supportsSchema &&
        schema && {
          response_format: { type: "json_schema", schema },
        }),
      ...(modelConfig.features.includes("web-search") && {
        extra_body: { web_search: true },
      }),
    };

    // Handle streaming
    if (payload.stream) {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "X-Title": "ArcalisAI",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.body) {
        return NextResponse.json(
          { error: "Failed to initiate stream" },
          { status: 500 },
        );
      }

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      return new Response(
        new ReadableStream({
          async start(controller) {
            try {
              // Store user message to Redis
              await redisClient.storeMessage(userId, conversationId, {
                role: "user",
                content: messages[messages.length - 1]?.content || "",
                model: model,
              });

              let accumulatedContent = "";
              const reader = response.body!.getReader();
              const parser = createParser({
                onEvent: (event: EventSourceMessage) => {
                  try {
                    if (event.data === "[DONE]") {
                      controller.close();
                      return;
                    }

                    const data = JSON.parse(event.data);
                    const content = data.choices[0]?.delta?.content;
                    if (content) {
                      accumulatedContent += content;
                      controller.enqueue(encoder.encode(content));
                    }
                  } catch (e) {
                    console.error("Stream parsing error:", e);
                    controller.error(e);
                  }
                },
              });

              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  parser.feed(decoder.decode(value));
                }
              } catch (e) {
                console.error("Error reading stream:", e);
                controller.error(e);
              } finally {
                controller.close();
              }

              // Store assistant's response to Redis
              if (accumulatedContent) {
                try {
                  await redisClient.storeMessage(userId, conversationId, {
                    role: "assistant",
                    content: accumulatedContent,
                    model: payload.model,
                  });
                } catch (e) {
                  console.error("Error storing assistant message to Redis:", e);
                }
              }
            } catch (err) {
              console.error("Error in ReadableStream start function:", err);
              controller.error(err);
            }
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    } else {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "X-Title": "ArcalisAI",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      const assistantContent = data.choices[0].message.content;

      await redisClient.storeMessage(userId, conversationId, {
        role: "user",
        content: messages[messages.length - 1].content,
        model: model,
      });
      await redisClient.storeMessage(userId, conversationId, {
        role: "assistant",
        content: assistantContent,
        model: model,
      });

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
