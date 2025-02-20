'use client'
import { useState, useEffect } from 'react'
import { NovitaSDK, TaskStatus } from 'novita-sdk'
import { useAccount } from 'wagmi'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tooltip from '@radix-ui/react-tooltip'
import { 
  Wand2, Rocket, Settings2, Search, AlertCircle, Loader2, ImagePlus,
  X, Check, Plus, Sliders, Info
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BASE_MODELS, LORA_MODELS, SAMPLER_OPTIONS } from './models'
const currentProgress: number = 0;
interface LoraConfig {
  model_name: string
  strength: number
}

interface GenerationParams {
  model: string
  prompt: string
  negativePrompt: string
  width: number
  height: number
  steps: number
  imageNum: number
  guidance: number
  seed: number
  sampler: string
  clipSkip: number
  loras: LoraConfig[]
}

const LORA_ALLOWED_MODELS = [
  'wlopArienwlopstylexl_v10_101973.safetensors',
  'fustercluck_v2_233009.safetensors',
  'foddaxlPhotorealism_v45_122788.safetensors',
  'sdXL_v10Refiner_91495.safetensors',
  'novaPrimeXL_v10_107899.safetensors'
]

export default function ImageAIPage() {
  const { isConnected } = useAccount()
  const [modelOpen, setModelOpen] = useState(false)
  const [loraOpen, setLoraOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fakeProgress, setFakeProgress] = useState(0)
  const [realProgress, setRealProgress] = useState(0)
  const [images, setImages] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [customLoraName, setCustomLoraName] = useState('')
  const [customLoraStrength, setCustomLoraStrength] = useState(0.8)

  const [params, setParams] = useState<GenerationParams>({
    model: BASE_MODELS[0].value,
    prompt: '',
    negativePrompt: '',
    width: 1024,
    height: 768,
    steps: 25,
    imageNum: 1,
    guidance: 7.5,
    seed: -1,
    sampler: 'Eueler a',
    clipSkip: 1,
    loras: [],
  })

  useEffect(() => {
    if (!isAdvancedMode) {
      setParams(prev => ({
        ...prev,
        width: 1024,
        height: 768,
        sampler: 'Eueler a',
        clipSkip: 1
      }))
    }
  }, [isAdvancedMode])

  const toggleLora = (loraValue: string, strength: number = 0.8) => {
    setParams(prev => {
      const exists = prev.loras.find(l => l.model_name === loraValue)
      return {
        ...prev,
        loras: exists 
          ? prev.loras.filter(l => l.model_name !== loraValue)
          : [...prev.loras, { model_name: loraValue, strength }]
      }
    })
  }

  const handleAddCustomLora = () => {
    if (!customLoraName.trim()) {
      toast.error('Please enter a model name')
      return
    }
    toggleLora(customLoraName.trim(), customLoraStrength)
    setCustomLoraName('')
    setCustomLoraStrength(0.8)
  }

  const updateLoraStrength = (loraName: string, strength: number) => {
    setParams(prev => ({
      ...prev,
      loras: prev.loras.map(l => 
        l.model_name === loraName ? { ...l, strength } : l
      )
    }))
  }

  const handleGenerate = async () => {
    if (loading) return
    setLoading(true)
    setFakeProgress(0)
    setRealProgress(0)
    setImages([])
    
    try {
      const novitaClient = new NovitaSDK(process.env.NEXT_PUBLIC_NOVITA_API_KEY || '')
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
          loras: params.loras
        }
      })

      const poll = setInterval(async () => {
        try {
          const progress = await novitaClient.progress({ task_id: res.task_id })
          setRealProgress(prev => Math.max(prev, progress.task.progress_percent || 0))
          
          if (progress.task.status === TaskStatus.SUCCEED) {
            clearInterval(poll)
            setImages(progress.images || [])
            setLoading(false)
          }
          
          if (progress.task.status === TaskStatus.FAILED) {
            clearInterval(poll)
            setLoading(false)
            const errorMsg = progress.task.reason?.includes('failed to exec task') 
              ? 'Server busy due to high demand' 
              : 'Generation failed'
            toast.error(errorMsg, { icon: <AlertCircle className="w-5 h-5" /> })
          }
        } catch (error) {
          clearInterval(poll)
          setLoading(false)
        }
      }, 1000)
    } catch (error) {
      setLoading(false)
      toast.error('Failed to start generation')
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 max-w-md p-6"
        >
          <Rocket className="w-12 h-12 text-purple-400 mx-auto animate-bounce" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Connect Wallet to Start
          </h1>
        </motion.div>
      </div>
    )
  }

  return (
    <Tooltip.Provider>
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wand2 className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Arcalis Studio
              </h1>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex bg-gray-800 rounded-full p-1 gap-1">
                <Button
                  onClick={() => setIsAdvancedMode(false)}
                  variant="ghost"
                  className={`rounded-full px-6 ${
                    !isAdvancedMode 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  Simple
                </Button>
                <Button
                  onClick={() => setIsAdvancedMode(true)}
                  variant="ghost"
                  className={`rounded-full px-6 ${
                    isAdvancedMode 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  Advanced
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div
                className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700/50 transition-all"
                onClick={() => setModelOpen(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-purple-500/30">
                    <img
                      src={BASE_MODELS.find(m => m.value === params.model)?.img}
                      alt="Selected model"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200 text-lg flex items-center gap-2">
                      {BASE_MODELS.find(m => m.value === params.model)?.label}
                      <Tooltip.Root>
                        <Tooltip.Trigger>
                          <Info className="w-4 h-4 text-gray-400" />
                        </Tooltip.Trigger>
                        <Tooltip.Content side="top" className="bg-gray-700 text-gray-100 p-2 rounded text-sm">
                          Base model for image generation
                          <Tooltip.Arrow className="fill-gray-700" />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </h3>
                    <p className="text-purple-400 text-xs mt-1">
                      Click to change model
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-6 relative">
                <div className="relative">
                  <Textarea
                    value={params.prompt}
                    onChange={(e) => setParams(p => ({ ...p, prompt: e.target.value }))}
                    className="bg-gray-800 border-2 border-gray-700 focus:border-purple-500/50 text-gray-100 min-h-[150px] text-lg pt-6"
                    placeholder=" "
                  />
                  <label className="absolute top-2 left-4 text-gray-400 text-sm pointer-events-none">
                    Describe your masterpiece...
                  </label>
                </div>

                <div className="relative">
                  <Textarea
                    value={params.negativePrompt}
                    onChange={(e) => setParams(p => ({ ...p, negativePrompt: e.target.value }))}
                    className="bg-gray-800 border-2 border-gray-700 focus:border-purple-500/50 text-gray-100 min-h-[100px] pt-6"
                    placeholder=" "
                  />
                  <label className="absolute top-2 left-4 text-gray-400 text-sm pointer-events-none">
                    What to exclude...
                  </label>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">Number of Images</span>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </Tooltip.Trigger>
                          <Tooltip.Content side="top" className="bg-gray-700 text-gray-100 p-2 rounded text-sm">
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
                      onValueChange={([val]) => setParams(p => ({ ...p, imageNum: val }))}
                      className="[&_.slider-track]:h-2 [&_.slider-thumb]:w-4 [&_.slider-thumb]:h-4"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">Guidance Scale</span>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <Info className="w-4 h-4 text-gray-400" />
                          </Tooltip.Trigger>
                          <Tooltip.Content side="top" className="bg-gray-700 text-gray-100 p-2 rounded text-sm">
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
                      onValueChange={([val]) => setParams(p => ({ ...p, guidance: val }))}
                      className="[&_.slider-track]:h-2 [&_.slider-thumb]:w-4 [&_.slider-thumb]:h-4"
                    />
                  </div>
                </div>

                {isAdvancedMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6 bg-gray-800/30 p-4 rounded-xl"
                  >
                    <fieldset className="space-y-6">
                      <legend className="text-lg font-medium text-gray-200 mb-4">Dimensions</legend>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between text-gray-300 text-sm">
                            <span>Width</span>
                            <span>{params.width}</span>
                          </div>
                          <Slider
                            min={512}
                            max={2048}
                            step={64}
                            value={[params.width]}
                            onValueChange={([val]) => setParams(p => ({ ...p, width: val }))}
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-gray-300 text-sm">
                            <span>Height</span>
                            <span>{params.height}</span>
                          </div>
                          <Slider
                            min={512}
                            max={2048}
                            step={64}
                            value={[params.height]}
                            onValueChange={([val]) => setParams(p => ({ ...p, height: val }))}
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-6">
                      <legend className="text-lg font-medium text-gray-200 mb-4">Sampling</legend>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between text-gray-300 text-sm">
                            <span>Steps</span>
                            <span>{params.steps}</span>
                          </div>
                          <Slider
                            min={10}
                            max={50}
                            step={1}
                            value={[params.steps]}
                            onValueChange={([val]) => setParams(p => ({ ...p, steps: val }))}
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="block text-sm text-gray-300">Sampler</label>
                          <select
                            value={params.sampler}
                            onChange={(e) => setParams(p => ({ ...p, sampler: e.target.value }))}
                            className="w-full bg-gray-700 border-gray-600 rounded-lg p-2 text-sm text-gray-100"
                          >
                            {SAMPLER_OPTIONS.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-6">
                      <legend className="text-lg font-medium text-gray-200 mb-4">Advanced</legend>
                      <div className="space-y-4">
                        <div className="flex justify-between text-gray-300 text-sm">
                          <span>Clip Skip</span>
                          <span>{params.clipSkip}</span>
                        </div>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[params.clipSkip]}
                          onValueChange={([val]) => setParams(p => ({ ...p, clipSkip: val }))}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm text-gray-300">Seed</label>
                        <Input
                          type="number"
                          value={params.seed}
                          onChange={(e) => setParams(p => ({ ...p, seed: Number(e.target.value) }))}
                          className="bg-gray-700 border-gray-600"
                          placeholder="-1 for random seed"
                        />
                      </div>
                    </fieldset>

                    {LORA_ALLOWED_MODELS.includes(params.model) && (
                      <fieldset className="space-y-6">
                        <legend className="text-lg font-medium text-gray-200 mb-4">LoRA Models</legend>
                        <div className="flex flex-col gap-2 mb-2">
                          {params.loras.map(lora => (
                            <div key={lora.model_name} className="flex flex-col gap-2 p-3 bg-gray-700 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-purple-300 truncate">
                                  {lora.model_name}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:bg-red-500/10"
                                  onClick={() => toggleLora(lora.model_name)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <Slider
                                  min={0}
                                  max={2}
                                  step={0.1}
                                  value={[lora.strength]}
                                  onValueChange={([val]) => updateLoraStrength(lora.model_name, val)}
                                />
                                <span className="text-xs text-gray-400 w-12 text-right">
                                  {lora.strength.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => setLoraOpen(true)}
                          variant="outline"
                          className="w-full text-purple-400 border-purple-500/50 hover:bg-purple-500/10"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add LoRA Model
                        </Button>
                      </fieldset>
                    )}
                  </motion.div>
                )}


                
                <Button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl text-lg font-semibold shadow-lg transition-all"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <Progress 
                          value={currentProgress} 
                          className="absolute inset-0 text-purple-500" 
                        />
                      </div>
                      <span>{currentProgress}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-6 h-6" />
                      <span>Generate Magic</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
              <AnimatePresence mode='wait'>
                {images.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid ${
                      images.length === 1 
                        ? 'grid-cols-1' 
                        : 'grid-cols-2'
                    } gap-4 auto-rows-min`}
                  >
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`
                          relative group overflow-hidden rounded-xl bg-gray-700
                          ${images.length === 3 && index === 2 ? 'col-span-2' : ''}
                        `}
                        style={{
                          aspectRatio: `${params.width}/${params.height}`,
                          maxWidth: images.length === 3 && index === 2 ? '50%' : '100%',
                          marginLeft: images.length === 3 && index === 2 ? 'auto' : '0',
                          marginRight: images.length === 3 && index === 2 ? 'auto' : '0'
                        }}
                      >
                        <img
                          src={img.image_url}
                          alt={`Generated ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    className="h-full flex items-center justify-center min-h-[500px]"
                  >
                    <div className="text-center space-y-4 text-gray-500">
                      <ImagePlus className="w-12 h-12 mx-auto" />
                      <p>Your generated art will appear here</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Dialog open={modelOpen} onOpenChange={setModelOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-gray-200 text-2xl">Select Model</DialogTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search models..."
                    className="pl-10 bg-gray-700 border-gray-600 h-12 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                {BASE_MODELS.filter(m => 
                  m.label.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((model) => (
                  <motion.div
                    key={model.value}
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setParams(p => ({ ...p, model: model.value }))
                      setModelOpen(false)
                    }}
                  >
                    <div className="bg-gray-700 rounded-xl p-3 transition-all hover:bg-gray-600/50">
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <img
                          src={model.img}
                          alt={model.label}
                          className="w-full h-full object-cover"
                        />
                        {params.model === model.value && (
                          <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium truncate">{model.label}</h3>
                        <p className="text-sm text-gray-400 truncate">{model.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={loraOpen} onOpenChange={setLoraOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-gray-200 text-2xl">Add LoRA Models</DialogTitle>
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
                      <span className="text-sm text-gray-300 w-8">
                        {customLoraStrength.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <Button onClick={handleAddCustomLora} className="w-full">
                    Add Custom LoRA
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
                {LORA_MODELS.filter(m => 
                  m.label.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((lora) => (
                  <motion.div
                    key={lora.value}
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                    onClick={() => toggleLora(lora.value)}
                  >
                    <div className={`bg-gray-700 rounded-xl p-3 transition-all ${
                      params.loras.some(l => l.model_name === lora.value) 
                        ? 'ring-2 ring-purple-500' 
                        : 'hover:bg-gray-600/50'
                    }`}>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <img
                          src={lora.img}
                          alt={lora.label}
                          className="w-full h-full object-cover"
                        />
                        {params.loras.some(l => l.model_name === lora.value) && (
                          <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium truncate">{lora.label}</h3>
                        <p className="text-sm text-gray-400 truncate">{lora.value}</p>
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
  )
}