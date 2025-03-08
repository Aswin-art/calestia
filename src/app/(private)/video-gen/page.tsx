'use client';

import { useState } from 'react';
import { NovitaSDK, TaskStatus } from 'novita-sdk';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { LucidePlus, LucideVideo, LucideLoader } from 'lucide-react';

interface VideoResult {
  video_url: string;
  video_url_ttl: string;
  video_type: string;
}

const models = [
  'darkSushiMixMix_225D_64380.safetensors',
  'dreamshaper_8_93211.safetensors',
  'realisticVision V51_v51VAE_94301.safetensors',
  'epicrealism_naturalSin_121250.safetensors',
] as const;

interface PromptSegment {
  startFrame: number;
  endFrame: number;
  prompt: string;
}

export default function TextToVideoPage() {
  const [selectedModel, setSelectedModel] = useState<string>(models[0]);
  const [prompts, setPrompts] = useState<PromptSegment[]>([
    { startFrame: 0, endFrame: 16, prompt: 'A girl, baby, portrait, 5 years old' },
  ]);
  const [negativePrompt, setNegativePrompt] = useState(
    '(worst quality:2), (low quality:2), (normal quality:2), ((monochrome)), ((grayscale)), bad hands'
  );
  const [width, setWidth] = useState<number>(640);
  const [height, setHeight] = useState<number>(480);
  const [guidanceScale, setGuidanceScale] = useState<number>(7.5);
  const [steps, setSteps] = useState<number>(20);
  const [seed, setSeed] = useState<number>(-1);
  const [taskStatus, setTaskStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [resultVideo, setResultVideo] = useState<string | null>(null);

  const addPromptSegment = () => {
    const lastEndFrame = prompts[prompts.length - 1].endFrame;
    setPrompts([
      ...prompts,
      {
        startFrame: lastEndFrame + 1,
        endFrame: lastEndFrame + 16,
        prompt: '',
      },
    ]);
  };

  const updatePromptSegment = <K extends keyof PromptSegment>(
    index: number,
    field: K,
    value: PromptSegment[K]
  ) => {
    const newPrompts = [...prompts];
    newPrompts[index][field] = value;

    if (field === 'endFrame') {
      for (let i = index + 1; i < newPrompts.length; i++) {
        newPrompts[i].startFrame = Number(newPrompts[i-1].endFrame) + 1;
        newPrompts[i].endFrame = Number(newPrompts[i].startFrame) + 15;
      }
    }

    setPrompts(newPrompts);
  };

  const handleGenerate = async () => {
    setTaskStatus('processing');
    setProgress(0);

    try {
      const novitaClient = new NovitaSDK(process.env.NEXT_PUBLIC_NOVITA_API_KEY!);
      const params = {
        model_name: selectedModel,
        width,
        height,
        guidance_scale: guidanceScale,
        steps,
        seed,
        prompts: prompts.map(p => ({
          prompt: p.prompt,
          frames: p.endFrame - p.startFrame + 1
        })),
        negative_prompt: negativePrompt,
      };

      const res = await novitaClient.txt2Video(params);
      
      if (res?.task_id) {
        const timer = setInterval(async () => {
          try {
            const progressRes = await novitaClient.progress({ task_id: res.task_id });
            
            switch(progressRes.task.status) {
              case TaskStatus.SUCCEED:
                clearInterval(timer);
                setTaskStatus('success');
                setResultVideo(progressRes.videos?.[0]?.video_url || null);
                setProgress(100);
                break;
              case TaskStatus.FAILED:
                clearInterval(timer);
                setTaskStatus('error');
                setProgress(0);
                break;
              case TaskStatus.QUEUED:
                setProgress(30);
                break;
              case TaskStatus.PROCESSING:
                setProgress(60);
                break;
            }
          } catch (error) {
            console.error('Progress check error:', error);
            clearInterval(timer);
            setTaskStatus('error');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Generation error:', error);
      setTaskStatus('error');
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <LucideVideo className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Video Generation
          </h1>
        </div>

        {/* Model Selection */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Model Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {models.map((model) => (
                  <SelectItem key={model} value={model} className="hover:bg-gray-700">
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Prompt Timeline */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Prompt Timeline</CardTitle>
            <Button 
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={addPromptSegment}
            >
              <LucidePlus className="mr-2 h-4 w-4" />
              Add Segment
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {prompts.map((prompt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-700 p-4 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Start Frame</Label>
                    <Input
                      type="number"
                      className="bg-gray-600 border-gray-500"
                      value={prompt.startFrame}
                      onChange={(e) => updatePromptSegment(index, 'startFrame', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>End Frame</Label>
                    <Input
                      type="number"
                      className="bg-gray-600 border-gray-500"
                      value={prompt.endFrame}
                      onChange={(e) => updatePromptSegment(index, 'endFrame', Number(e.target.value))}
                    />
                  </div>
                </div>
                <Textarea
                  className="bg-gray-600 border-gray-500"
                  placeholder="Enter prompt..."
                  value={prompt.prompt}
                  onChange={(e) => updatePromptSegment(index, 'prompt', e.target.value)}
                />
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Generation Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Generation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Width</Label>
                  <Input
                    type="number"
                    className="bg-gray-600 border-gray-500"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Height</Label>
                  <Input
                    type="number"
                    className="bg-gray-600 border-gray-500"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label>Guidance Scale</Label>
                <Input
                  type="number"
                  step="0.1"
                  className="bg-gray-600 border-gray-500"
                  value={guidanceScale}
                  onChange={(e) => setGuidanceScale(Number(e.target.value))}
                />
              </div>

              <div>
                <Label>Steps</Label>
                <Input
                  type="number"
                  className="bg-gray-600 border-gray-500"
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                />
              </div>

              <div>
                <Label>Seed</Label>
                <Input
                  type="number"
                  className="bg-gray-600 border-gray-500"
                  value={seed}
                  onChange={(e) => setSeed(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Negative Prompt */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Negative Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="bg-gray-600 border-gray-500 h-48"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Generate Button */}
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg"
          onClick={handleGenerate}
          disabled={taskStatus === 'processing'}
        >
          {taskStatus === 'processing' ? (
            <div className="flex items-center gap-2">
              <LucideLoader className="animate-spin h-5 w-5" />
              Generating...
            </div>
          ) : (
            'Generate Video'
          )}
        </Button>

        {/* Progress & Result */}
        {taskStatus !== 'idle' && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Generation Progress</Label>
                  <span className="text-purple-400">{progress}%</span>
                </div>
                <Progress value={progress} className="bg-gray-700 h-2" />
              </div>

              {resultVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-lg overflow-hidden"
                >
                  <video controls className="w-full">
                    <source src={resultVideo} type="video/mp4" />
                  </video>
                </motion.div>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}