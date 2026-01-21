import { useState, useRef } from "react"
import { Rnd } from "react-rnd"

export default function Sticker({ sticker, onSelect }) {
  const [rotation, setRotation] = useState(0)
  const [isSelected, setIsSelected] = useState(false)

  const startX = useRef(0)
  const rotating = useRef(false)

  // ======================
  // ROTATION CORE
  // ======================
  const beginRotate = (clientX) => {
    rotating.current = true
    startX.current = clientX
  }

  const applyRotate = (clientX) => {
    if (!rotating.current) return
    const delta = clientX - startX.current
    setRotation(r => r + delta * 0.4) // 🔧 mobile-friendly sensitivity
    startX.current = clientX
  }

  const endRotate = () => {
    rotating.current = false
  }

  // ======================
  // MOUSE HANDLERS
  // ======================
  const startRotateMouse = (e) => {
    e.preventDefault()
    e.stopPropagation()
    beginRotate(e.clientX)
    window.addEventListener("mousemove", rotateMouse)
    window.addEventListener("mouseup", stopRotateMouse)
  }

  const rotateMouse = (e) => applyRotate(e.clientX)

  const stopRotateMouse = () => {
    endRotate()
    window.removeEventListener("mousemove", rotateMouse)
    window.removeEventListener("mouseup", stopRotateMouse)
  }

  // ======================
  // TOUCH HANDLERS (🔥 NEW)
  // ======================
  const startRotateTouch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    beginRotate(e.touches[0].clientX)
    window.addEventListener("touchmove", rotateTouch, { passive: false })
    window.addEventListener("touchend", stopRotateTouch)
  }

  const rotateTouch = (e) => {
    e.preventDefault()
    applyRotate(e.touches[0].clientX)
  }

  const stopRotateTouch = () => {
    endRotate()
    window.removeEventListener("touchmove", rotateTouch)
    window.removeEventListener("touchend", stopRotateTouch)
  }

  return (
    <Rnd
  bounds="parent"
  style={{ pointerEvents: "auto" }}
  disableDragging={false}  // 🔥 prevents conflict during rotate
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
  data-sticker-box
  style={{
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "move",
    transform: `rotate(${rotation}deg)`,
    border: isSelected ? "2px dashed #00e5ff" : "none",
    boxSizing: "border-box",
    touchAction: "none",
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
            userSelect: "none",
          }}
        />

        {/* 🔄 ROTATE HANDLE */}
        <div className="export-hide"
  onMouseDown={startRotateMouse}
  onTouchStart={(e) => {
    e.stopPropagation()   // 🔥 STOP RND FROM STEALING TOUCH
    startRotateTouch(e)
  }}
  style={{
    position: "absolute",
    top: -22,
    left: "50%",
    transform: "translateX(-50%)",
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#2563eb",
    cursor: "grab",
    touchAction: "none",
    zIndex: 10,           // 🔥 ABOVE RND
  }}
/>
</div>
    </Rnd>
  )
}
