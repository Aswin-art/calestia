export const routeNav = [
  { name: "About Us", href: "/about-us" },
  { name: "Feature", href: "/feature" },
  { name: "Dao", href: "/dao" },
  { name: "Chat AI", href: "/chat" },
];

export const SECTION_HEIGHT = 1500;

export const TIER_CONFIG_MODEL = [
  {
    title: "Deepseek R1",
    model: "deepseek/deepseek-chat",
    description:
      "A basic chatbot offering essential functionality without customization or DAO integration.",
  },
  {
    title: "Minimax 01",
    model: "deepseek/deepseek-r2:pro",
    description:
      "An upgraded chatbot delivering advanced responses alongside community voting capabilities.",
  },
  {
    title: "Qwen Turbo",
    model: "deepseek/deepseek-r3:elite",
    description:
      "A dynamic AI that provides personalized recommendations and an extended conversation history.",
  },
  {
    title: "Liquid LFM 7B",
    model: "deepseek/deepseek-r4:visionary",
    description:
      "A high-performance model featuring premium support and tailored, responsive interactions.",
  },
  {
    title: "Gemini 2.0",
    model: "deepseek/deepseek-r4:visionary",
    description:
      "A next-generation AI with superior conversational skills and robust governance features.",
  },
  {
    title: "Microsoft Phi 4",
    model: "deepseek/deepseek-r4:visionary",
    description:
      "A cutting-edge solution engineered for comprehensive dialogue and elite personalization.",
  },
];

export interface ModelConfig {
  reasoning: boolean;
  multimodal: boolean;
  maxTokens: number;
  pricePerToken: number;
  features: string[];
  supportsSchema?: boolean;
  imageSpecs?: {
    formats: string[];
    maxSizeMB: number;
  };
}

export interface TierConfig {
  modelAccess: Record<string, number>;
  features: {
    webSearch: boolean;
    cacheTTL: number;
    maxSessions: number;
  };
}

export type ModelList = Record<string, ModelConfig>;
export type TierList = Record<string, TierConfig>;

export const MODEL_CONFIG: ModelList = {
  "deepseek/deepseek-chat": {
    reasoning: false,
    multimodal: false,
    maxTokens: 32768,
    pricePerToken: 0.000002,
    features: ["text-processing"],
    supportsSchema: true,
  },
  "minimax/minimax-01": {
    reasoning: false,
    multimodal: true,
    maxTokens: 131072,
    pricePerToken: 0.000005,
    features: ["image-analysis", "web-search"],
    imageSpecs: {
      formats: ["url", "base64"],
      maxSizeMB: 10,
    },
  },
  "qwen/qwen-turbo": {
    reasoning: true,
    multimodal: false,
    maxTokens: 65536,
    pricePerToken: 0.0000035,
    features: ["fast-inference", "long-context"],
  },
  "liquid/lfm-7b": {
    reasoning: false,
    multimodal: false,
    maxTokens: 32768,
    pricePerToken: 0.0000028,
    features: ["low-latency"],
  },
  "google/gemini-2.0-flash-thinking-exp": {
    reasoning: true,
    multimodal: true,
    maxTokens: 262144,
    pricePerToken: 0.000007,
    features: ["multi-modal", "web-search"],
  },
  "microsoft/phi-4": {
    reasoning: true,
    multimodal: true,
    maxTokens: 131072,
    pricePerToken: 0.0000085,
    features: ["data-analysis", "code-interpretation"],
  },
};

export const TIER_CONFIG: TierList = {
  Explorer: {
    modelAccess: {
      "deepseek/deepseek-chat": Infinity,
      "minimax/minimax-01": 20,
      "qwen/qwen-turbo": 10,
    },
    features: {
      webSearch: false,
      cacheTTL: 300,
      maxSessions: Infinity,
    },
  },
  Scholar: {
    modelAccess: {
      "deepseek/deepseek-chat": Infinity,
      "minimax/minimax-01": 100,
      "qwen/qwen-turbo": 100,
      "liquid/lfm-7b": 20,
      "google/gemini-2.0-flash-thinking-exp": 20,
    },
    features: {
      webSearch: true,
      cacheTTL: 1800,
      maxSessions: Infinity,
    },
  },
  Innovator: {
    modelAccess: {
      "deepseek/deepseek-chat": Infinity,
      "minimax/minimax-01": 500,
      "qwen/qwen-turbo": 500,
      "liquid/lfm-7b": 500,
      "google/gemini-2.0-flash-thinking-exp": 500,
      "microsoft/phi-4": 30,
    },
    features: {
      webSearch: true,
      cacheTTL: 3600,
      maxSessions: Infinity,
    },
  },
  Visionary: {
    modelAccess: {
      "deepseek/deepseek-chat": Infinity,
      "minimax/minimax-01": Infinity,
      "qwen/qwen-turbo": Infinity,
      "liquid/lfm-7b": Infinity,
      "google/gemini-2.0-flash-thinking-exp": Infinity,
      "microsoft/phi-4": Infinity,
    },
    features: {
      webSearch: true,
      cacheTTL: 86400,
      maxSessions: Infinity,
    },
  },
};
