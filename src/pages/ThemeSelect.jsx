import { useNavigate } from "react-router-dom"
import { themes } from "../data/themes"

export default function ThemeSelect() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          color: "white",
          marginBottom: 32,
          fontSize: "clamp(24px, 4vw, 40px)",
        }}
      >
        Choose Your Booth Theme
      </h1>

      {/* THEMES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {themes.map(theme => (
          <div
            key={theme.id}
            onClick={() => navigate(`/booth/${theme.id}/stickers`)}
            style={{
              height: 160,
              borderRadius: 16,
              cursor: "pointer",
              backgroundImage: `url(${theme.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* SOFT OVERLAY — NO backdrop-filter */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))",
              }}
            />

            {/* TEXT */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                textTransform: "capitalize",
                textShadow: "0 2px 6px rgba(0,0,0,0.6)",
              }}
            >
              {theme.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
