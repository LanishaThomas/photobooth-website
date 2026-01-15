import { useEffect, useRef, useState } from "react"
import html2canvas from "html2canvas"
import Sticker from "./Sticker"

const FRAME_W = 600
const FRAME_H = 400

export default function CameraStrip({
  background,
  stickers,
  onDeleteSticker,
  onSelectSticker,
}) {


  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const fileInputRef = useRef(null)

  const [shots, setShots] = useState([null, null, null])
  const [active, setActive] = useState(null)

  const [autoMode, setAutoMode] = useState(false)
  const [delayMode, setDelayMode] = useState("5")
  
  const [customDelay, setCustomDelay] = useState("")

  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      const video = videoRef.current
      video.srcObject = stream
      video.onloadedmetadata = () => video.play()
    }
    startCamera()
  }, [])

  const capture = (index) => {
    const video = videoRef.current
    if (!video.videoWidth) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = FRAME_W
    canvas.height = FRAME_H

    const vr = video.videoWidth / video.videoHeight
    const fr = FRAME_W / FRAME_H

    let sx, sy, sw, sh
    if (vr > fr) {
      sh = video.videoHeight
      sw = sh * fr
      sx = (video.videoWidth - sw) / 2
      sy = 0
    } else {
      sw = video.videoWidth
      sh = sw / fr
      sx = 0
      sy = (video.videoHeight - sh) / 2
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, FRAME_W, FRAME_H)

    setShots(p => {
      const c = [...p]
      c[index] = canvas.toDataURL("image/png")
      return c
    })

    setActive(null)
  }

  const retake = (i) => {
    setShots(p => {
      const c = [...p]
      c[i] = null
      return c
    })
    setActive(i)
  }

  const upload = (i, file) => {
    const r = new FileReader()
    r.onload = () => {
      setShots(p => {
        const c = [...p]
        c[i] = r.result
        return c
      })
      setActive(null)
    }
    r.readAsDataURL(file)
  }

  const startAutoCapture = async () => {
    const delay =
      delayMode === "custom"
        ? Number(customDelay) || 3
        : Number(delayMode)

    setAutoMode(true)
    for (let i = 0; i < 3; i++) {
      setActive(i)
      await new Promise(r => setTimeout(r, delay * 1000))
      capture(i)
    }
    setActive(null)
    setAutoMode(false)
  }

  const downloadStrip = async () => {
    if (shots.some(s => !s)) {
      alert("Please capture all 3 photos first")
      return
    }

    const canvas = await html2canvas(containerRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    })

    canvas.toBlob(blob => {
      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = "photobooth-strip.png"
      a.click()
      URL.revokeObjectURL(a.href)
    })
  }

  return (
    <div
  ref={containerRef}
  id="sticker-canvas"
  style={{
  position: "relative",
  minHeight: "100svh",   // ✅ mobile-safe viewport
  width: "90%",
  maxWidth: 600,
  margin: "0 auto",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflowX: "hidden",  // ✅ prevent sideways scroll
}}

>

            {/* 🎨 STICKER TRAY — ABOVE FRAMES */}
<div
  data-html2canvas-ignore
  style={{
  marginBottom: 20,
  padding: 12,
  background: "rgba(255,255,255,0.95)",
  borderRadius: 10,
  display: "flex",
  gap: 14,
  overflowX: "auto",        // 🔥 horizontal scroll
  overflowY: "hidden",
  width: "100%",
maxWidth: 420,
margin: "0 auto",

  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",   // Firefox
}}

>
  {/* sticker icons go here */}
</div>
      {/* CONTENT */}
      <div
  style={{
    position: "relative",
    zIndex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none",   // 🔥 THIS IS THE FIX
  }}
>

      
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
  position: "absolute",
  width: 0,
  height: 0,
  overflow: "hidden",
}}

        />

        {/* AUTO CONTROLS */}
        <button
          data-html2canvas-ignore
          onClick={downloadStrip}
          style={{
            pointerEvents: "auto",
            marginTop: 20,
            padding: "14px 28px",
            fontSize: 18,
            fontWeight: "bold",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        >
          Download Photo Strip
        </button>

        <div
          data-html2canvas-ignore
          style={{
            marginBottom: 18,
            padding: 10,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 8,
            marginTop: 20,
            display: "flex",
            gap: 12,
            pointerEvents: "auto",
          }}
        >
          <span>Auto Capture</span>

          <select
            value={delayMode}
            onChange={e => setDelayMode(e.target.value)}
            disabled={autoMode}
          >
            <option value="3">3 sec</option>
            <option value="5">5 sec</option>
            <option value="custom">Custom</option>
          </select>

          {delayMode === "custom" && (
            <input
              type="number"
              value={customDelay}
              onChange={e => setCustomDelay(e.target.value)}
              placeholder="sec"
              style={{ width: 80 }}
            />
          )}

          <button onClick={startAutoCapture} disabled={autoMode}>
            Start Auto
          </button>
        </div>

        {/* PHOTO STRIP */}
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    maxWidth: 420,   // ✅ keeps it centered on mobile
  }}
>

          {shots.map((shot, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div
                style={{
  width: "100%",
  maxWidth: FRAME_W,   // desktop keeps size
  aspectRatio: `${FRAME_W} / ${FRAME_H}`, // 🔥 magic
  background: "#fff",
  position: "relative",
  overflow: "hidden",
}}

              >
                {shot ? (
                  <img
                    src={shot}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : active === i ? (
                  <video
                    autoPlay
                    playsInline
                    muted
                    ref={el =>
                      el && (el.srcObject = videoRef.current.srcObject)
                    }
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>Empty</span>
                )}
              </div>

              <div
                data-html2canvas-ignore
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  pointerEvents: "auto",
                }}
              >
                {!shot && active !== i && (
                  <button onClick={() => setActive(i)}>Start</button>
                )}

                {active === i && (
                  <>
                    <button onClick={() => capture(i)}>Capture</button>
                    <button onClick={() => fileInputRef.current.click()}>
                      Upload
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={e => upload(i, e.target.files[0])}
                    />
                  </>
                )}

                {shot && <button onClick={() => retake(i)}>Retake</button>}
              </div>
            </div>
          ))}
        </div>

        

        <canvas ref={canvasRef} hidden />
      </div>



      {/* 🔥 GLOBAL STICKERS (TOPMOST) */}
      <div
        style={{
          display: "flex",
gap: 14,
justifyContent: "center",
flexWrap: "wrap",   // ✅ mobile wrap
maxWidth: "80%",

          position: "absolute",
          inset: 0,
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
  {stickers.map(sticker => (
  <Sticker
    key={sticker.id}
    sticker={sticker}
    onSelect={onSelectSticker}
  />
))}






      </div>
    </div>
  )
}
