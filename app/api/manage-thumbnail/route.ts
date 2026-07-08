import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const imageType = formData.get('imageType') as 'favicon' | 'og-image'

    if (!file) {
      console.log("[v0] No file provided in upload request")
      return NextResponse.json({ error: 'Keine Datei bereitgestellt' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log("[v0] Invalid file type:", file.type)
      return NextResponse.json({ error: 'Nur Bilddateien werden unterstützt' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log("[v0] File size exceeds 5MB:", file.size)
      return NextResponse.json({ error: 'Dateigröße darf 5MB nicht überschreiten' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine filename and path based on imageType
    const publicDir = join(process.cwd(), 'public')
    const filename = imageType === 'favicon' ? 'favicon.png' : 'og-image.png'
    const filepath = join(publicDir, filename)

    // Ensure public directory exists
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true })
    }

    // Write file
    await writeFile(filepath, buffer)
    console.log("[v0] Successfully uploaded", imageType, "to", filepath)

    return NextResponse.json({
      success: true,
      message: `${imageType === 'favicon' ? 'Favicon' : 'OG-Image'} erfolgreich hochgeladen`,
      filename,
      url: `/${filename}`,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json(
      { error: 'Fehler beim Hochladen der Datei' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const imageType = request.nextUrl.searchParams.get('type') as 'favicon' | 'og-image'

    if (!imageType || !['favicon', 'og-image'].includes(imageType)) {
      return NextResponse.json({ error: 'Ungültiger Image-Typ' }, { status: 400 })
    }

    const filename = imageType === 'favicon' ? 'favicon.png' : 'og-image.png'
    const publicDir = join(process.cwd(), 'public')
    const filepath = join(publicDir, filename)

    console.log("[v0] Checking if file exists:", filepath)

    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: `${imageType} nicht gefunden` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      filename,
      url: `/${filename}`,
      type: imageType,
    })
  } catch (error) {
    console.error("[v0] Get error:", error)
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Datei-Informationen' },
      { status: 500 }
    )
  }
}
