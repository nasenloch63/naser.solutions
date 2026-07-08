export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return new Response(JSON.stringify({ error: "URL parameter is required" }), { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(url)
  } catch {
    return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 })
  }

  const encoded = encodeURIComponent(targetUrl.href)

  // Service list — each is tried in order, bytes proxied back to avoid CORS
  const directImageServices = [
    `https://image.thum.io/get/width/1200/crop/630/noanimate/${targetUrl.href}`,
    `https://s0.wordpress.com/mshots/v1/${encoded}?w=1200&h=630`,
  ]

  // Helper: fetch with timeout
  async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response | null> {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ThumbnailBot/1.0)" },
        signal: controller.signal,
      })
      clearTimeout(id)
      return res
    } catch {
      clearTimeout(id)
      return null
    }
  }

  console.log("[v0] Generating thumbnail for:", targetUrl.href)

  // 1. Try thum.io and wordpress mshots (direct image endpoints)
  for (const serviceUrl of directImageServices) {
    try {
      console.log("[v0] Trying service:", serviceUrl.substring(0, 60))
      const res = await fetchWithTimeout(serviceUrl)
      if (!res) {
        console.log("[v0] Service timeout/failed")
        continue
      }
      if (!res.ok) {
        console.log("[v0] Service returned:", res.status)
        continue
      }

      const contentType = res.headers.get("content-type") ?? ""
      console.log("[v0] Content-Type:", contentType)
      if (contentType.includes("text/html")) {
        console.log("[v0] Rejected: HTML response")
        continue
      }

      const buffer = await res.arrayBuffer()
      console.log("[v0] Buffer size:", buffer.byteLength)
      // Reject placeholder/spinner images (thum.io returns ~4.5KB spinner for slow sites)
      if (buffer.byteLength < 10000) {
        console.log("[v0] Rejected: too small (likely placeholder)")
        continue
      }

      console.log("[v0] SUCCESS from:", serviceUrl.substring(0, 40))
      return new Response(buffer, {
        headers: {
          "Content-Type": contentType || "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=604800",
        },
      })
    } catch (err) {
      console.log("[v0] Service error:", err)
      continue
    }
  }

  // 2. Try microlink (returns JSON with screenshot URL inside)
  try {
    const microlinkUrl = `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`
    console.log("[v0] Trying microlink")
    const res = await fetchWithTimeout(microlinkUrl, 10000)
    if (res && res.ok) {
      const data = await res.json()
      const imgUrl: string | undefined = data?.data?.screenshot?.url
      console.log("[v0] Microlink screenshot URL:", imgUrl?.substring(0, 50))
      if (imgUrl) {
        const imgRes = await fetchWithTimeout(imgUrl)
        if (imgRes && imgRes.ok) {
          const buffer = await imgRes.arrayBuffer()
          console.log("[v0] Microlink buffer size:", buffer.byteLength)
          if (buffer.byteLength >= 10000) {
            console.log("[v0] SUCCESS from microlink")
            return new Response(buffer, {
              headers: {
                "Content-Type": "image/jpeg",
                "Cache-Control": "public, max-age=86400, s-maxage=604800",
              },
            })
          }
        }
      }
    }
  } catch (err) {
    console.log("[v0] Microlink error:", err)
  }

  console.log("[v0] ALL SERVICES FAILED for:", targetUrl.href)
  return new Response(JSON.stringify({ error: "All thumbnail services failed" }), { status: 503 })
}
