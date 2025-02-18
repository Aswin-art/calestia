'use client'

import { useState, useEffect } from 'react'
import { NovitaSDK, TaskStatus } from 'novita-sdk'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { Rocket, Wand2, ImagePlus, Settings2, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { BASE_MODELS, LORA_MODELS } from './models'

export default function ImageAIPage() {
  const { address, isConnected } = useAccount()
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [images, setImages] = useState<any[]>([])
  const [error, setError] = useState('')

  // Form state
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [model, setModel] = useState('sd_xl_base_1.0')
  const [loras, setLoras] = useState<string[]>([])
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [steps, setSteps] = useState(25)
  const [guidance, setGuidance] = useState(7.5)
  const [seed, setSeed] = useState(-1)
  const [sampler, setSampler] = useState('DPM++ 2S a Karras')

  const novitaClient = new NovitaSDK(process.env.NEXT_PUBLIC_NOVITA_API_KEY || '')

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const params = {
        request: {
          model_name: model,
          prompt,
          negative_prompt: negativePrompt,
          width,
          height,
          sampler_name: sampler,
          guidance_scale: guidance,
          steps,
          image_num: 1,
          seed,
          loras: loras.map(lora => ({ model_name: lora, strength: 0.7 })),
        },
      }

      const res = await novitaClient.txt2Img(params)
      if (res?.task_id) {
        const interval = setInterval(async () => {
          try {
            const result = await novitaClient.progress({ task_id: res.task_id })
            setProgress(result.task.progress_percent || 0)
            
            if (result.task.status === TaskStatus.SUCCEED) {
              clearInterval(interval)
              setImages(prev => [...prev, ...(result.images ?? [])])
              setLoading(false)
            }
          } catch (err) {
            clearInterval(interval)
            setError('Failed to fetch progress')
            setLoading(false)
          }
        }, 1000)
      }
    } catch (err) {
      setError('Generation failed')
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center space-y-4 max-w-md">
          <Rocket className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Connect Your Wallet
          </h1>
          <p className="text-gray-400">
            Please connect your wallet to start generating amazing AI art
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI Art Studio
            </h1>
            <Badge variant="default" className="ml-2">
              Pro Tier
            </Badge>
          </div>
          <Button
            variant={isAdvanced ? 'default' : 'outline'}
            onClick={() => setIsAdvanced(!isAdvanced)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {isAdvanced ? 'Simple Mode' : 'Advanced Mode'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6 space-y-6">
                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Model</label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {BASE_MODELS.map((model) => (
                        <SelectItem
                          key={model.value}
                          value={model.value}
                          className="hover:bg-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={model.img}
                              className="w-6 h-6 rounded-sm"
                              alt={model.label}
                            />
                            {model.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Prompt Inputs */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Prompt</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-gray-100 min-h-[120px]"
                    placeholder="A beautiful landscape with..."
                  />
                </div>

                {isAdvanced && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Negative Prompt
                    </label>
                    <Textarea
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-gray-100 min-h-[100px]"
                      placeholder="Blurry, low quality..."
                    />
                  </div>
                )}

                {/* Parameters Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Width</label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Height</label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>

                {isAdvanced && (
                  <>
                    <Separator className="bg-gray-700" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Sampler
                        </label>
                        <Select value={sampler} onValueChange={setSampler}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select sampler" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {['DPM++ 2S a Karras', 'Euler a', 'DDIM'].map((s) => (
                              <SelectItem key={s} value={s} className="hover:bg-gray-700">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Guidance
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          value={guidance}
                          onChange={(e) => setGuidance(Number(e.target.value))}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Steps</label>
                        <Input
                          type="number"
                          value={steps}
                          onChange={(e) => setSteps(Number(e.target.value))}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Seed</label>
                        <Input
                          type="number"
                          value={seed}
                          onChange={(e) => setSeed(Number(e.target.value))}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Generate Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={loading}
                  onClick={handleGenerate}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="w-24 h-2 bg-gray-700" />
                      <span>{progress}%</span>
                    </div>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Art
                    </>
                  )}
                </Button>

                {error && (
                  <div className="text-red-400 text-sm text-center">{error}</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {images.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-6"
              >
                {images.map((img, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700 relative group">
                    <CardContent className="p-0">
                      <img
                        src={img.image_url}
                        alt={`Generated ${index + 1}`}
                        className="rounded-t-lg w-full h-64 object-cover"
                      />
                      {img.nsfw_detection_result?.valid && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2 backdrop-blur-sm"
                        >
                          NSFW
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">
                      <div className="text-sm text-gray-400">
                        {width}x{height} • {sampler}
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-400">
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700">
                <div className="text-center space-y-4">
                  <ImagePlus className="w-12 h-12 text-gray-600 mx-auto" />
                  <p className="text-gray-500">
                    Your generated masterpieces will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}