import { BrowserRouter, Routes, Route } from "react-router-dom"
import ThemeSelect from "./pages/ThemeSelect"
import Booth from "./pages/Booth"
import StickerEditor from "./pages/StickerEditor"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Theme selection page */}
        <Route path="/" element={<ThemeSelect />} />

        {/* Booth page with selected theme */}
        
        <Route path="/booth/:theme" element={<Booth />} />
        <Route path="/booth/:theme/stickers" element={<StickerEditor />} />

      </Routes>
    </BrowserRouter>
  )
}
