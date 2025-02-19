// app/facemerge/page.tsx

"use client";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MergeFaceRequest, NovitaSDK, MergeFaceResponse as SdkMergeFaceResponse } from 'novita-sdk';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, Rocket, ImagePlus, X, Download, AlertCircle, Loader2, 
  Settings2,
  Check
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const novita = new NovitaSDK(process.env.NEXT_PUBLIC_NOVITA_API_KEY || '');

interface FilePreview {
  file: File;
  preview: string;
}

export default function FaceMergePage() {
  const [baseImage, setBaseImage] = useState<FilePreview | null>(null);
  const [faceImage, setFaceImage] = useState<FilePreview | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [facePosition, setFacePosition] = useState({ x: 0.5, y: 0.5, zoom: 1 });

  const onDrop = useCallback((acceptedFiles: File[], type: 'base' | 'face') => {
    const file = acceptedFiles[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    if (file) {
      const preview = URL.createObjectURL(file);
      type === 'base' 
        ? setBaseImage({ file, preview }) 
        : setFaceImage({ file, preview });
    }
  }, []);

  const handleMerge = async () => {
    if (!baseImage || !faceImage) {
      setError('Please upload both base and face images');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(30);

    try {
      const mergeRequest: MergeFaceRequest = {
        face_image_file: URL.createObjectURL(faceImage.file),
        image_file: URL.createObjectURL(baseImage.file),
      };
      
      const params = {
        ...mergeRequest,
        face_resolve: 1,
        face_position_x: facePosition.x,
        face_position_y: facePosition.y,
        face_zoom: facePosition.zoom,
      };

      const result: SdkMergeFaceResponse = await novita.mergeFace(params, (p: number) => {
        setProgress(30 + Math.floor(p * 70));
      });
      
      setResultImage(result.image);
    } catch (err) {
      setError('Failed to merge faces. Please check your images and try again.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const FileUpload = ({ type, label }: { type: 'base' | 'face'; label: string }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
      maxFiles: 1,
      onDrop: (files) => onDrop(files, type),
    });

    const image = type === 'base' ? baseImage : faceImage;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full"
      >
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-6 cursor-pointer
            transition-all h-full ${
              isDragActive 
                ? 'border-primary bg-primary/10' 
                : 'border-muted hover:border-primary/30'
            }`}
        >
          <input {...getInputProps()} />
          <AnimatePresence>
            {image ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-full"
              >
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    type === 'base' ? setBaseImage(null) : setFaceImage(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-4"
              >
                <ImagePlus className="w-12 h-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-muted-foreground font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG, JPEG (max 5MB)
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Wand2 className="text-primary h-8 w-8" />
            Face Fusion
          </h1>
          <p className="text-muted-foreground">
            Merge faces seamlessly using AI-powered technology
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center">Base Image</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-96">
              <FileUpload
                type="base"
                label="Drag & drop base image"
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center">Face Image</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-96">
              <FileUpload
                type="face"
                label="Drag & drop face image"
              />
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleMerge}
              disabled={isLoading || !baseImage || !faceImage}
              size="lg"
              className="px-8 py-6 text-lg gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Merging... ({progress}%)
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  Generate Fusion
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsSettingsOpen(true)}
              className="px-8 py-6 text-lg gap-2"
            >
              <Settings2 className="h-5 w-5" />
              Settings
            </Button>
          </div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-1/2 mx-auto"
            >
              <Progress value={progress} className="h-2" />
            </motion.div>
          )}
        </div>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Advanced Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Face Position X: {facePosition.x}
                </label>
                <Slider
                  value={[facePosition.x]}
                  max={1}
                  step={0.1}
                  onValueChange={(val) => setFacePosition(prev => ({
                    ...prev,
                    x: val[0]
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Face Position Y: {facePosition.y}
                </label>
                <Slider
                  value={[facePosition.y]}
                  max={1}
                  step={0.1}
                  onValueChange={(val) => setFacePosition(prev => ({
                    ...prev,
                    y: val[0]
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Face Zoom: {facePosition.zoom}
                </label>
                <Slider
                  value={[facePosition.zoom]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={(val) => setFacePosition(prev => ({
                    ...prev,
                    zoom: val[0]
                  }))}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AnimatePresence>
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative group rounded-lg overflow-hidden">
                    <img
                      src={resultImage}
                      alt="Merged Result"
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-4 right-4 flex gap-2"
                    >
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = resultImage;
                          link.download = 'merged-face.jpg';
                          link.click();
                        }}
                        variant="secondary"
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12"
        >
          <Card className="bg-muted/50 border-none">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Tips for Best Results
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <span>Use high-resolution images (minimum 1024px width)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <span>Ensure face images have neutral expressions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <span>Match lighting conditions between images</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <span>Use front-facing portraits for face images</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}