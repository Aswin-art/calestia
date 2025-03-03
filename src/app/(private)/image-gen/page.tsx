/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { NovitaSDK, TaskStatus } from "novita-sdk";
import { useAccount } from "wagmi";
import { publicClient } from "@/lib/wagmi";
import config from "@/lib/config";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  Wand2,
  Sparkles,
  Search,
  AlertCircle,
  Loader2,
  ImagePlus,
  X,
  Check,
  Plus,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BASE_MODELS, LORA_MODELS, SAMPLER_OPTIONS } from "./models";
const currentProgress: number = 0;
interface LoraConfig {
  model_name: string;
  strength: number;
}

interface GenerationParams {
  model: string;
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  steps: number;
  imageNum: number;
  guidance: number;
  seed: number;
  sampler: string;
  clipSkip: number;
  loras: LoraConfig[];
}

const LORA_ALLOWED_MODELS = [
  "wlopArienwlopstylexl_v10_101973.safetensors",
  "fustercluck_v2_233009.safetensors",
  "foddaxlPhotorealism_v45_122788.safetensors",
  "sdXL_v10Refiner_91495.safetensors",
  "novaPrimeXL_v10_107899.safetensors",
];

export default function ImageAIPage() {
  const { isConnected } = useAccount();
  const [modelOpen, setModelOpen] = useState(false);
  const [loraOpen, setLoraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [realProgress, setRealProgress] = useState(0);
  const [images, setImages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [customLoraName, setCustomLoraName] = useState("");
  const [customLoraStrength, setCustomLoraStrength] = useState(0.8);
  const [userLevel, setUserLevel] = useState(0);
  const { address } = useAccount();
  const [dailyUsage, setDailyUsage] = useState(() => {
    const savedUsage = localStorage.getItem("dailyUsage");
    return savedUsage ? JSON.parse(savedUsage) : 0;
  });

  // Menentukan batas generate berdasarkan level
  const limits: Record<number, number> = {
    0: 3,
    1: 20,
    2: 50,
    3: 100,
  };

  useEffect(() => {
    const lastReset = localStorage.getItem("lastReset");
    const today = new Date().toDateString();

    if (lastReset !== today) {
      localStorage.setItem("dailyUsage", JSON.stringify(0)); // Reset penggunaan
      localStorage.setItem("lastReset", today);
      setDailyUsage(0);
    }
  }, []);

  const [params, setParams] = useState<GenerationParams>({
    model: BASE_MODELS[0].value,
    prompt: "",
    negativePrompt: "",
    width: 1024,
    height: 768,
    steps: 25,
    imageNum: 1,
    guidance: 7.5,
    seed: -1,
    sampler: "Eueler a",
    clipSkip: 1,
    loras: [],
  });

  const checkUserLevel = async () => {
    const level: any = await publicClient.readContract({
      address: config.address as `0x${string}`,
      abi: config.abi,
      functionName: "userLevel",
      args: [address],
    });
    return setUserLevel(Number(level));
  };

  const getSuggestedPrompt = () => {
    const suggestedPrompts = [
      "A futuristic cyberpunk city at night with neon lights.",
      "A majestic dragon flying over a medieval castle.",
      "A cozy cabin in a snowy forest with warm lights glowing inside.",
    ];
    const randomPrompt =
      suggestedPrompts[Math.floor(Math.random() * suggestedPrompts.length)];

    // Update hanya bagian prompt dari params
    setParams((prev) => ({ ...prev, prompt: randomPrompt }));
  };

  useEffect(() => {
    if (!isAdvancedMode) {
      setParams((prev) => ({
        ...prev,
        width: 1024,
        height: 768,
        sampler: "Eueler a",
        clipSkip: 1,
      }));
    }
  }, [isAdvancedMode]);

  const toggleLora = (loraValue: string, strength: number = 0.8) => {
    setParams((prev) => {
      const exists = prev.loras.find((l) => l.model_name === loraValue);
      return {
        ...prev,
        loras: exists
          ? prev.loras.filter((l) => l.model_name !== loraValue)
          : [...prev.loras, { model_name: loraValue, strength }],
      };
    });
  };

  const handleAddCustomLora = () => {
    if (!customLoraName.trim()) {
      toast.error("Please enter a model name");
      return;
    }
    toggleLora(customLoraName.trim(), customLoraStrength);
    setCustomLoraName("");
    setCustomLoraStrength(0.8);
  };

  const updateLoraStrength = (loraName: string, strength: number) => {
    setParams((prev) => ({
      ...prev,
      loras: prev.loras.map((l) =>
        l.model_name === loraName ? { ...l, strength } : l,
      ),
    }));
  };

  const handleGenerate = async () => {
    if (loading) return;

    if (userLevel !== null && dailyUsage >= limits[userLevel]) {
      toast.error("Limit harian sudah habis. Coba lagi besok!", {
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    setLoading(true);
    setFakeProgress(0);
    setRealProgress(0);
    setImages([]);

    try {
      const novitaClient = new NovitaSDK(
        process.env.NEXT_PUBLIC_NOVITA_API_KEY || "",
      );
      const res = await novitaClient.txt2Img({
        request: {
          model_name: params.model,
          prompt: params.prompt,
          negative_prompt: params.negativePrompt,
          width: params.width,
          height: params.height,
          steps: params.steps,
          image_num: params.imageNum,
          guidance_scale: params.guidance,
          sampler_name: params.sampler,
          seed: params.seed,
          clip_skip: params.clipSkip,
          loras: params.loras,
        },
      });

      const poll = setInterval(async () => {
        try {
          const progress = await novitaClient.progress({
            task_id: res.task_id,
          });
          setRealProgress((prev) =>
            Math.max(prev, progress.task.progress_percent || 0),
          );

          if (progress.task.status === TaskStatus.SUCCEED) {
            clearInterval(poll);
            setImages(progress.images || []);
            setLoading(false);

            setDailyUsage((prev: any) => {
              const newUsage = prev + 1;
              localStorage.setItem("dailyUsage", JSON.stringify(newUsage)); // Simpan ke localStorage
              return newUsage;
            });
          }

          if (progress.task.status === TaskStatus.FAILED) {
            clearInterval(poll);
            setLoading(false);
            const errorMsg = progress.task.reason?.includes(
              "failed to exec task",
            )
              ? "Server busy due to high demand"
              : "Generation failed";
            toast.error(errorMsg, {
              icon: <AlertCircle className="h-5 w-5" />,
            });
          }
        } catch (error) {
          clearInterval(poll);
          setLoading(false);
        }
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to start generation");
    }
  };
  useEffect(() => {
    if (address) {
      checkUserLevel();
    }
  }, [address]);

  if (!isConnected) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold">Please Connect Your Wallet</h3>
          <p className="text-muted-foreground mt-5 max-w-2xl text-center">
            To get started, please connect your cryptocurrency wallet. This will
            allow you to securely manage your digital assets and perform
            transactions seamlessly.
          </p>
        </motion.div>
        <div className="mt-8 text-center">
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <Tooltip.Provider>
      <div className="min-h-screen bg-neutral-900 p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <motion.div className="flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-lg border border-blue-800 bg-blue-700/20 px-4 py-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <h1 className="text-lg font-bold text-gray-100">
                Arcalis Studio
              </h1>
            </div>
            {/* <h3>User Level: {userLevel !== null ? userLevel : "Loading..."}</h3> */}

            <div className="flex items-center gap-4">
              <div className="flex gap-1 rounded-full bg-neutral-950/50 p-1">
                <Button
                  onClick={() => setIsAdvancedMode(false)}
                  variant="ghost"
                  className={`rounded-full px-6 ${
                    !isAdvancedMode
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:bg-gray-700/50"
                  }`}
                >
                  Simple
                </Button>
                <Button
                  onClick={() => setIsAdvancedMode(true)}
                  variant="ghost"
                  className={`rounded-full px-6 ${
                    isAdvancedMode
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:bg-gray-700/50"
                  }`}
                >
                  Advanced
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <motion.div
                className="cursor-pointer rounded-xl border-2 border-neutral-700 bg-neutral-950/50 p-4 transition-all hover:bg-neutral-800/50"
                onClick={() => setModelOpen(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-blue-500/30">
                    <img
                      src={
                        BASE_MODELS.find((m) => m.value === params.model)?.img
                      }
                      alt="Selected model"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent" />
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-200">
                      {BASE_MODELS.find((m) => m.value === params.model)?.label}
                      <Tooltip.Root>
                        <Tooltip.Trigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </Tooltip.Trigger>
                        <Tooltip.Content
                          side="top"
                          className="rounded bg-neutral-900 p-2 text-sm text-gray-100"
                        >
                          Base model for image generation
                          <Tooltip.Arrow className="fill-gray-700" />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </h3>
                    <p className="mt-1 text-xs text-blue-400">
                      Click to change model
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="relative space-y-6">
                <div className="relative">
                  <Textarea
                    value={params.prompt}
                    onChange={(e) =>
                      setParams((prev) => ({ ...prev, prompt: e.target.value }))
                    }
                    className="min-h-[150px] border-2 border-neutral-700 bg-neutral-950/50 pt-6 text-lg text-gray-100 focus:border-blue-500/50"
                    placeholder=" "
                  />
                  <label className="pointer-events-none absolute top-2 left-4 text-sm text-gray-400">
                    Describe your masterpiece...
                  </label>
                  <button
                    onClick={getSuggestedPrompt}
                    className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Suggest Prompt
                  </button>
                </div>

                <div className="relative">
                  <Textarea
                    value={params.negativePrompt}
                    onChange={(e) =>
                      setParams((p) => ({
                        ...p,
                        negativePrompt: e.target.value,
                      }))
                    }
                    className="min-h-[100px] border-2 border-neutral-600 bg-neutral-950 pt-6 text-gray-100 focus:border-blue-500/50"
                    placeholder=" "
                  />
                  <label className="pointer-events-none absolute top-2 left-4 text-sm text-gray-400">
                    What to exclude...
                  </label>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">Number of Images</span>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </Tooltip.Trigger>
                          <Tooltip.Content
                            side="top"
                            className="rounded bg-gray-700 p-2 text-sm text-gray-100"
                          >
                            Number of variations to generate (1-4)
                            <Tooltip.Arrow className="fill-gray-700" />
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </div>
                      <span className="text-gray-400">{params.imageNum}</span>
                    </div>
                    <Slider
                      min={1}
                      max={4}
                      step={1}
                      value={[params.imageNum]}
                      onValueChange={([val]) =>
                        setParams((p) => ({ ...p, imageNum: val }))
                      }
                      className="[&_.slider-thumb]:h-4 [&_.slider-thumb]:w-4 [&_.slider-track]:h-2"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">Guidance Scale</span>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </Tooltip.Trigger>
                          <Tooltip.Content
                            side="top"
                            className="rounded bg-gray-700 p-2 text-sm text-gray-100"
                          >
                            How closely to follow the prompt (1-20)
                            <Tooltip.Arrow className="fill-gray-700" />
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </div>
                      <span className="text-gray-400">{params.guidance}</span>
                    </div>
                    <Slider
                      min={1}
                      max={20}
                      step={0.5}
                      value={[params.guidance]}
                      onValueChange={([val]) =>
                        setParams((p) => ({ ...p, guidance: val }))
                      }
                      className="[&_.slider-thumb]:h-4 [&_.slider-thumb]:w-4 [&_.slider-track]:h-2"
                    />
                  </div>
                </div>

                {isAdvancedMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-6 rounded-xl border-2 border-neutral-600 bg-neutral-950 p-4"
                  >
                    <fieldset className="space-y-6">
                      <legend className="mb-4 text-lg font-medium text-gray-200">
                        Dimensions
                      </legend>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Width</span>
                            <span>{params.width}</span>
                          </div>
                          <Slider
                            min={512}
                            max={2048}
                            step={64}
                            value={[params.width]}
                            onValueChange={([val]) =>
                              setParams((p) => ({ ...p, width: val }))
                            }
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Height</span>
                            <span>{params.height}</span>
                          </div>
                          <Slider
                            min={512}
                            max={2048}
                            step={64}
                            value={[params.height]}
                            onValueChange={([val]) =>
                              setParams((p) => ({ ...p, height: val }))
                            }
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-6">
                      <legend className="mb-4 text-lg font-medium text-gray-200">
                        Sampling
                      </legend>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Steps</span>
                            <span>{params.steps}</span>
                          </div>
                          <Slider
                            min={10}
                            max={50}
                            step={1}
                            value={[params.steps]}
                            onValueChange={([val]) =>
                              setParams((p) => ({ ...p, steps: val }))
                            }
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="block text-sm text-gray-300">
                            Sampler
                          </label>
                          <select
                            value={params.sampler}
                            onChange={(e) =>
                              setParams((p) => ({
                                ...p,
                                sampler: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border-gray-600 bg-neutral-800/50 p-2 text-sm text-gray-100"
                          >
                            {SAMPLER_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-6">
                      <legend className="mb-4 text-lg font-medium text-gray-200">
                        Advanced
                      </legend>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Clip Skip</span>
                          <span>{params.clipSkip}</span>
                        </div>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[params.clipSkip]}
                          onValueChange={([val]) =>
                            setParams((p) => ({ ...p, clipSkip: val }))
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm text-gray-300">
                          Seed
                        </label>
                        <Input
                          type="number"
                          value={params.seed}
                          onChange={(e) =>
                            setParams((p) => ({
                              ...p,
                              seed: Number(e.target.value),
                            }))
                          }
                          className="border-gray-600 bg-neutral-800/50"
                          placeholder="-1 for random seed"
                        />
                      </div>
                    </fieldset>

                    {LORA_ALLOWED_MODELS.includes(params.model) && (
                      <fieldset className="space-y-6">
                        <legend className="mb-4 text-lg font-medium text-gray-200">
                          LoRA Models
                        </legend>
                        <div className="mb-2 flex flex-col gap-2">
                          {params.loras.map((lora) => (
                            <div
                              key={lora.model_name}
                              className="flex flex-col gap-2 rounded-lg bg-gray-700 p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate text-sm text-blue-300">
                                  {lora.model_name}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:bg-red-500/10"
                                  onClick={() => toggleLora(lora.model_name)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Slider
                                  min={0}
                                  max={2}
                                  step={0.1}
                                  value={[lora.strength]}
                                  onValueChange={([val]) =>
                                    updateLoraStrength(lora.model_name, val)
                                  }
                                />
                                <span className="w-12 text-right text-xs text-gray-400">
                                  {lora.strength.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => setLoraOpen(true)}
                          variant="outline"
                          className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add LoRA Model
                        </Button>
                      </fieldset>
                    )}
                  </motion.div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="h-14 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-500 text-lg font-semibold shadow-lg transition-all hover:from-blue-600 hover:to-blue-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <Progress
                          value={currentProgress}
                          className="absolute inset-0 text-blue-500"
                        />
                      </div>
                      <span>{currentProgress}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wand2 className="h-6 w-6 text-white" />
                      <span className="text-white">
                        Generate Magic ({dailyUsage}/{limits[userLevel ?? 0]})
                      </span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border-2 border-gray-500 border-neutral-600 bg-neutral-950/50 p-6">
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid ${
                      images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    } auto-rows-min gap-4`}
                  >
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`group relative overflow-hidden rounded-xl bg-gray-700 ${images.length === 3 && index === 2 ? "col-span-2" : ""} `}
                        style={{
                          aspectRatio: `${params.width}/${params.height}`,
                          maxWidth:
                            images.length === 3 && index === 2 ? "50%" : "100%",
                          marginLeft:
                            images.length === 3 && index === 2 ? "auto" : "0",
                          marginRight:
                            images.length === 3 && index === 2 ? "auto" : "0",
                        }}
                      >
                        <img
                          src={img.image_url}
                          alt={`Generated ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {img.nsfw_detection_result?.valid && (
                          <Badge
                            variant="destructive"
                            className="absolute top-2 right-2 backdrop-blur-sm"
                          >
                            NSFW
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full min-h-[500px] items-center justify-center"
                  >
                    <div className="space-y-4 text-center text-gray-500">
                      <ImagePlus className="mx-auto h-12 w-12" />
                      <p>Your generated art will appear here</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Dialog open={modelOpen} onOpenChange={setModelOpen}>
            <DialogContent className="h-[80vh] max-w-4xl border-gray-700 bg-neutral-800/50">
              <DialogHeader>
                <DialogTitle className="text-2xl text-gray-200">
                  Select Model
                </DialogTitle>
                <div className="relative">
                  <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search models..."
                    className="h-12 border-gray-600 bg-neutral-900 pl-10 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
                {BASE_MODELS.filter((m) =>
                  m.label.toLowerCase().includes(searchQuery.toLowerCase()),
                ).map((model) => (
                  <motion.div
                    key={model.value}
                    whileHover={{ scale: 1.02 }}
                    className="group relative cursor-pointer"
                    onClick={() => {
                      setParams((p) => ({ ...p, model: model.value }));
                      setModelOpen(false);
                    }}
                  >
                    <div className="rounded-xl bg-neutral-800/50 p-3 transition-all hover:bg-gray-600/50">
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <img
                          src={model.img}
                          alt={model.label}
                          className="h-full w-full object-cover"
                        />
                        {params.model === model.value && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                            <Check className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <h3 className="truncate font-medium">{model.label}</h3>
                        <p className="truncate text-sm text-gray-400">
                          {model.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={loraOpen} onOpenChange={setLoraOpen}>
            <DialogContent className="h-[80vh] max-w-4xl border-gray-700 bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-2xl text-gray-200">
                  Add LoRA Models
                </DialogTitle>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Custom LoRA Name"
                      value={customLoraName}
                      onChange={(e) => setCustomLoraName(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <Slider
                        min={0}
                        max={2}
                        step={0.1}
                        value={[customLoraStrength]}
                        onValueChange={([val]) => setCustomLoraStrength(val)}
                      />
                      <span className="w-8 text-sm text-gray-300">
                        {customLoraStrength.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <Button onClick={handleAddCustomLora} className="w-full">
                    Add Custom LoRA
                  </Button>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
                {LORA_MODELS.filter((m) =>
                  m.label.toLowerCase().includes(searchQuery.toLowerCase()),
                ).map((lora) => (
                  <motion.div
                    key={lora.value}
                    whileHover={{ scale: 1.02 }}
                    className="group relative cursor-pointer"
                    onClick={() => toggleLora(lora.value)}
                  >
                    <div
                      className={`rounded-xl bg-gray-700 p-3 transition-all ${
                        params.loras.some((l) => l.model_name === lora.value)
                          ? "ring-2 ring-blue-500"
                          : "hover:bg-gray-600/50"
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <img
                          src={lora.img}
                          alt={lora.label}
                          className="h-full w-full object-cover"
                        />
                        {params.loras.some(
                          (l) => l.model_name === lora.value,
                        ) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                            <Check className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <h3 className="truncate font-medium">{lora.label}</h3>
                        <p className="truncate text-sm text-gray-400">
                          {lora.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
