import { useState, useRef } from "react"
import { Rnd } from "react-rnd"

export default function Sticker({ sticker, onSelect }) {
  const [rotation, setRotation] = useState(0)
  const [isSelected, setIsSelected] = useState(false)
  const startX = useRef(0)

  const startRotate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    startX.current = e.clientX
    window.addEventListener("mousemove", rotate)
    window.addEventListener("mouseup", stopRotate)
  }

  const rotate = (e) => {
    const delta = e.clientX - startX.current
    setRotation(r => r + delta * 0.5)
    startX.current = e.clientX
  }

  const stopRotate = () => {
    window.removeEventListener("mousemove", rotate)
    window.removeEventListener("mouseup", stopRotate)
  }

  return (
    <Rnd
      bounds="parent"
      style={{ pointerEvents: "auto" }}
      default={{ x: 100, y: 100, width: 80, height: 80 }}
      enableResizing
      onMouseDown={() => {
        setIsSelected(true)
        onSelect(sticker.id)
      }}
      onResizeStart={() => setIsSelected(true)}
      onResizeStop={() => setIsSelected(false)}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          cursor: "move",
          transform: `rotate(${rotation}deg)`,
          border: isSelected ? "2px dashed #00e5ff" : "none",
          boxSizing: "border-box",
        }}
      >
        <img
          src={sticker.src}
          draggable={false}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        {/* ROTATE HANDLE */}
        <div
          onMouseDown={startRotate}
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            transform: "translateX(-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#2563eb",
            cursor: "grab",
          }}
        />
      </div>
    </Rnd>
  )
}
