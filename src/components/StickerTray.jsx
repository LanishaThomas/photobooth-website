import stickers from "../assets/stickers"

export default function StickerTray({ onAddSticker }) {
  const isTouch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0

  return (
    <div
      className="sticker-tray"
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        background: "rgba(255,255,255,0.95)",
        borderRadius: 10,

        /* 🔥 MOBILE FRIENDLY */
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",

        maxWidth: "100%",
        alignItems: "center",
      }}
    >
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          alt=""
          draggable={!isTouch} // ❌ disable drag on mobile
          onDragStart={e => {
            if (!isTouch) {
              e.dataTransfer.setData("sticker", sticker)
            }
          }}
          onClick={() => {
            // 📱 Mobile: tap to add sticker
            if (isTouch && onAddSticker) {
              onAddSticker(sticker)
            }
          }}
          style={{
            width: 56,
            height: 56,
            objectFit: "contain",
            flex: "0 0 auto",
            cursor: isTouch ? "pointer" : "grab",
            userSelect: "none",
            touchAction: "manipulation",
          }}
        />
      ))}
    </div>
  )
}
