import { useParams } from "react-router-dom"
import { themes } from "../data/themes"
import CameraStrip from "../components/CameraStrip"
import { useEffect, useState } from "react"

export default function StickerEditor() {
  const { theme } = useParams()
  const selectedTheme = themes.find(t => t.id === theme)

  const [activeStickers, setActiveStickers] = useState([])
  const [selectedStickerId, setSelectedStickerId] = useState(null)

  if (!selectedTheme) {
    return <div>Theme not found</div>
  }

  // create a NEW sticker every time (duplicates allowed)
  const addSticker = (src) => {
    setActiveStickers(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        src,
      },
    ])
  }

  // 🔥 DELETE STICKER (SOURCE OF TRUTH)
  const deleteSticker = (id) => {
    setActiveStickers(prev => prev.filter(s => s.id !== id))
  }

  // 🔥 KEYBOARD DELETE (RELIABLE)
  useEffect(() => {
    const handleKey = (e) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedStickerId
      ) {
        deleteSticker(selectedStickerId)
        setSelectedStickerId(null)
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedStickerId])

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${selectedTheme.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* FOG / BLUR OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 1,
        }}
      />

      {/* PAGE CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* STICKER TRAY — TOP */}
<div
  className="tray-desktop"
  style={{
    position: "sticky",
    top: 12,
    zIndex: 100,

    width: "100%",
    maxWidth: 600,
    margin: "12px auto",
    padding: 10,

    /* 🔑 GRID MAGIC */
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 5 stickers per row
    gap: 10,
    justifyItems: "center",

    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    borderRadius: 14,

    maxHeight: 220,          // optional scroll control
    overflowY: "auto",
    scrollbarWidth: "none",
  }}
>
  {selectedTheme.stickers.map((src, i) => (
    <img
      key={i}
      src={src}
      style={{
        width: 60,
        height: 60,
        objectFit: "contain",
        cursor: "grab",
        userSelect: "none",
      }}
      onMouseDown={() => addSticker(src)}
      draggable={false}
    />
  ))}
</div>


        {/* CAMERA STRIP */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CameraStrip
            background={selectedTheme.background}
            stickers={activeStickers}
            onDeleteSticker={deleteSticker}
            onSelectSticker={setSelectedStickerId}
          />
        </div>
      </div>
{/* MOBILE DELETE BAR */}
{selectedStickerId && (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 999,
      background: "rgba(0,0,0,0.75)",
      padding: "12px 20px",
      borderRadius: 14,
      display: "flex",
      gap: 12,
    }}
  >
    <button
      onClick={() => {
        deleteSticker(selectedStickerId)
        setSelectedStickerId(null)
      }}
      style={{
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        fontSize: 16,
        borderRadius: 10,
        cursor: "pointer",
      }}
    >
      Delete Sticker
    </button>
  </div>
)}

      {/* RESPONSIVE RULES */}
      <style>{`
        @media (max-width: 768px) {
          .tray-desktop {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
