import stickers from "../assets/stickers"; // or wherever stickers live

export default function StickerTray() {
  return (
    <div className="sticker-tray">
      {stickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker}
          className="sticker"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("sticker", sticker);
          }}
        />
      ))}
    </div>
  );
}
