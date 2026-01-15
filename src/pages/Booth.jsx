import { useNavigate, useParams } from "react-router-dom"
import { themes } from "../data/themes"
import CameraStrip from "../components/CameraStrip"

export default function Booth() {
  const navigate = useNavigate()
  const { theme } = useParams()

  const selectedTheme = themes.find(t => t.id === theme)

  if (!selectedTheme) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Theme not found</h2>
        <p>URL param: {theme}</p>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* Booth mode = no stickers */}
      <CameraStrip
  background={selectedTheme.background}
  stickerMode={location.pathname.endsWith("/stickers")}
/>
    <div className="booth-layout">
      <CameraStrip />
      <StickerTray />
    </div>


      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => navigate(`/booth/${theme}/stickers`)}>
          Add Stickers
        </button>

      </div>
    </div>
  )
}
