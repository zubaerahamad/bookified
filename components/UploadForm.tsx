'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import LoadingOverlay from '@/components/LoadingOverlay'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  pdfFile: z.instanceof(File, { message: 'PDF file is required' }).refine((file) => file.size <= 50 * 1024 * 1024, 'Max file size is 50MB'),
  coverImage: z.instanceof(File).optional(),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author name is required'),
  voice: z.string().min(1, 'Please select a voice'),
})

const voices = [
  { id: 'dave', name: 'Dave', gender: 'Male', description: 'Deep and professional' },
  { id: 'daniel', name: 'Daniel', gender: 'Male', description: 'Energetic and clear' },
  { id: 'chris', name: 'Chris', gender: 'Male', description: 'Friendly and conversational' },
  { id: 'rachel', name: 'Rachel', gender: 'Female', description: 'Soft and expressive' },
  { id: 'sarah', name: 'Sarah', gender: 'Female', description: 'Professional and authoritative' },
]

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pdfName, setPdfName] = useState<string | null>(null)
  const [coverName, setCoverName] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      voice: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      setPdfName(file.name)
      onChange(file)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverName(file.name)
      onChange(file)
    }
  }

  return (
    <div className="new-book-wrapper">
      {isSubmitting && <LoadingOverlay />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* PDF Upload */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Upload Book PDF</FormLabel>
                <FormControl>
                  <div className={cn("upload-dropzone", pdfName && "upload-dropzone-uploaded")}>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                      onChange={(e) => handlePdfChange(e, field.onChange)}
                    />
                    <label htmlFor="pdf-upload" className="w-full flex flex-col items-center cursor-pointer">
                      {pdfName ? (
                        <>
                          <CheckCircle2 className="upload-dropzone-icon text-green-600" />
                          <div className="flex items-center gap-2">
                            <span className="upload-dropzone-text">{pdfName}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setPdfName(null);
                                field.onChange(undefined);
                              }}
                              className="upload-dropzone-remove"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <span className="upload-dropzone-hint">Click to change file</span>
                        </>
                      ) : (
                        <>
                          <Upload className="upload-dropzone-icon" />
                          <span className="upload-dropzone-text">Click to upload PDF</span>
                          <span className="upload-dropzone-hint">PDF file (max 50MB)</span>
                        </>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Rich Dad Poor Dad" className="form-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Input */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Robert Kiyosaki" className="form-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-[var(--text-secondary)]">Male Voices</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {voices.filter(v => v.gender === 'Male').map((voice) => (
                          <div key={voice.id} className="relative">
                            <RadioGroupItem
                              value={voice.id}
                              id={voice.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={voice.id}
                              className={cn(
                                "voice-selector-option block cursor-pointer",
                                field.value === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"
                              )}
                            >
                              <div className="font-bold">{voice.name}</div>
                              <div className="text-xs opacity-70">{voice.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-[var(--text-secondary)]">Female Voices</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {voices.filter(v => v.gender === 'Female').map((voice) => (
                          <div key={voice.id} className="relative">
                            <RadioGroupItem
                              value={voice.id}
                              id={voice.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={voice.id}
                              className={cn(
                                "voice-selector-option block cursor-pointer",
                                field.value === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"
                              )}
                            >
                              <div className="font-bold">{voice.name}</div>
                              <div className="text-xs opacity-70">{voice.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Upload Book Cover Image</FormLabel>
                <FormControl>
                  <div className={cn("upload-dropzone", coverName && "upload-dropzone-uploaded")}>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="cover-upload"
                      onChange={(e) => handleCoverChange(e, field.onChange)}
                    />
                    <label htmlFor="cover-upload" className="w-full flex flex-col items-center cursor-pointer">
                      {coverName ? (
                        <>
                          <ImageIcon className="upload-dropzone-icon text-blue-600" />
                          <div className="flex items-center gap-2">
                            <span className="upload-dropzone-text">{coverName}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setCoverName(null);
                                field.onChange(undefined);
                              }}
                              className="upload-dropzone-remove"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <span className="upload-dropzone-hint">Click to change cover</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="upload-dropzone-icon" />
                          <span className="upload-dropzone-text">Click to upload cover image</span>
                          <span className="upload-dropzone-hint">Leave empty to auto-generate from PDF</span>
                        </>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-btn">
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UploadForm