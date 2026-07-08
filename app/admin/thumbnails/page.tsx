'use client'

import { useState } from 'react'
import { Upload, Check, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function ThumbnailManagerPage() {
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [ogImageFile, setOgImageFile] = useState<File | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string>('/favicon.png')
  const [ogImagePreview, setOgImagePreview] = useState<string>('/og-image.png')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'favicon' | 'og-image'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Bitte wählen Sie eine Bilddatei aus' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Dateigröße darf 5MB nicht überschreiten' })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      const preview = event.target?.result as string
      if (type === 'favicon') {
        setFaviconFile(file)
        setFaviconPreview(preview)
      } else {
        setOgImageFile(file)
        setOgImagePreview(preview)
      }
    }
    reader.readAsDataURL(file)

    console.log("[v0] File selected for", type, ':', file.name)
  }

  const handleUpload = async (type: 'favicon' | 'og-image') => {
    const file = type === 'favicon' ? faviconFile : ogImageFile
    if (!file) {
      setMessage({ type: 'error', text: 'Bitte wählen Sie eine Datei aus' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('imageType', type)

      console.log("[v0] Starting upload for", type)

      const response = await fetch('/api/manage-thumbnail', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message || `${type === 'favicon' ? 'Favicon' : 'OG-Image'} erfolgreich hochgeladen`,
        })
        console.log("[v0] Upload successful:", data)

        // Reset file input
        if (type === 'favicon') {
          setFaviconFile(null)
        } else {
          setOgImageFile(null)
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload fehlgeschlagen' })
        console.log("[v0] Upload failed:", data)
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
      setMessage({ type: 'error', text: 'Fehler beim Hochladen der Datei' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Thumbnail Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Verwalten Sie Favicon und Open Graph Image für naser.solutions
          </p>
        </div>

        {message && (
          <div
            className={`mb-8 p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            )}
            <p
              className={
                message.type === 'success'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }
            >
              {message.text}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Favicon Manager */}
          <div className="bg-secondary/50 rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Favicon</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer bg-background/50">
                <label className="cursor-pointer text-center w-full">
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Datei auswählen</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, SVG (max. 5MB)
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'favicon')}
                    className="hidden"
                  />
                </label>
              </div>

              {faviconPreview && (
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-background rounded-lg border border-border overflow-hidden">
                    <Image
                      src={faviconPreview}
                      alt="Favicon Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {faviconFile?.name || 'Aktueller Favicon'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {faviconFile ? `${(faviconFile.size / 1024).toFixed(2)} KB` : 'Standardgröße'}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleUpload('favicon')}
                disabled={!faviconFile || loading}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Lädt...' : 'Favicon speichern'}
              </button>
            </div>
          </div>

          {/* OG Image Manager */}
          <div className="bg-secondary/50 rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Open Graph Image</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer bg-background/50">
                <label className="cursor-pointer text-center w-full">
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Datei auswählen</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG (1200x630px, max. 5MB)
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'og-image')}
                    className="hidden"
                  />
                </label>
              </div>

              {ogImagePreview && (
                <div className="relative w-full aspect-video bg-background rounded-lg border border-border overflow-hidden">
                  <Image
                    src={ogImagePreview}
                    alt="OG Image Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <button
                onClick={() => handleUpload('og-image')}
                disabled={!ogImageFile || loading}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Lädt...' : 'OG-Image speichern'}
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-primary/10 rounded-2xl border border-primary/20 p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Empfehlungen</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Favicon: Quadratisches Format (1:1), mindestens 192x192px</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>OG-Image: 1200x630px (16:9), für beste Social-Media-Vorschau</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>PNG oder JPG Format, max. 5MB Dateigröße</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Bilder sollten auf verschiedenen Geräten gut aussehen</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
