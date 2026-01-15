// =======================
// SEA STICKERS
// =======================
import seashell3 from "../assets/stickers/sea/3seashell.png"
import crab from "../assets/stickers/sea/crab.png"
import dolphin from "../assets/stickers/sea/dolphin.png"
import otter from "../assets/stickers/sea/otter.png"
import seahorse from "../assets/stickers/sea/seahorse.png"
import seashell from "../assets/stickers/sea/seashell.png"
import shark from "../assets/stickers/sea/shark.png"
import starfish from "../assets/stickers/sea/starfish.png"
import turtle from "../assets/stickers/sea/turtle.png"
import whale from "../assets/stickers/sea/whale.png"

// =======================
// GARDEN STICKERS
// =======================
import angry from "../assets/stickers/garden/angry.png"
import daisy from "../assets/stickers/garden/daisy.png"
import farmingNature from "../assets/stickers/garden/farming-and-nature.png"
import flowerPot from "../assets/stickers/garden/flower-pot.png"
import flower from "../assets/stickers/garden/flower.png"
import flowers1 from "../assets/stickers/garden/flowers (1).png"
import flowers2 from "../assets/stickers/garden/flowers (2).png"
import flowers3 from "../assets/stickers/garden/flowers (3).png"
import flowers4 from "../assets/stickers/garden/flowers (4).png"
import flowers from "../assets/stickers/garden/flowers.png"

// =======================
// SAFARI STICKERS
// =======================
import bee from "../assets/stickers/safari/bee.png"
import flamingo from "../assets/stickers/safari/flamingo.png"
import giraffe from "../assets/stickers/safari/giraffe.png"
import leopard from "../assets/stickers/safari/leopard.png"
import panda from "../assets/stickers/safari/panda.png"
import parrot from "../assets/stickers/safari/parrot.png"
import penguinSafari from "../assets/stickers/safari/penguin.png"
import rabbitSafari from "../assets/stickers/safari/rabbit.png"
import sleepingPanda from "../assets/stickers/safari/sleepingpanda.png"
import snake from "../assets/stickers/safari/snake.png"

// =======================
// STAR STICKERS
// =======================
import asteroid from "../assets/stickers/stars/asteroid.png"
import cloudy from "../assets/stickers/stars/cloudy.png"
import creativity from "../assets/stickers/stars/creativity.png"
import goldStar from "../assets/stickers/stars/gold-star.png"
import night from "../assets/stickers/stars/night.png"
import planet from "../assets/stickers/stars/planet.png"
import rabbitStar from "../assets/stickers/stars/rabbit.png"
import saturn from "../assets/stickers/stars/saturn.png"
import sleep from "../assets/stickers/stars/sleep.png"
import weather from "../assets/stickers/stars/weather.png"

// =======================
// SNOW STICKERS
// =======================
import igloo from "../assets/stickers/snow/igloo.png"
import penguinSnow from "../assets/stickers/snow/penguin.png"
import sledge from "../assets/stickers/snow/sledge.png"
import snow from "../assets/stickers/snow/snow.png"
import snowball from "../assets/stickers/snow/snowball.png"
import snowclouds from "../assets/stickers/snow/snowclouds.png"
import snowflake from "../assets/stickers/snow/snowflake.png"
import snowflakes from "../assets/stickers/snow/snowflakes.png"
import snowing from "../assets/stickers/snow/snowing.png"
import snowman from "../assets/stickers/snow/snowman.png"

// =======================
// THEMES
// =======================

const BASE = import.meta.env.BASE_URL
export const themes = [
  {
    id: "sea",
    name: "Sea",
    background: `${BASE}backgrounds/sea.jpg`,
    stickers: [
      seashell3,
      crab,
      dolphin,
      otter,
      seahorse,
      seashell,
      shark,
      starfish,
      turtle,
      whale,
    ],
  },

  {
    id: "garden",
    name: "Garden",
    background: `${BASE}backgrounds/garden.jpg`,
    stickers: [
      angry,
      daisy,
      farmingNature,
      flowerPot,
      flower,
      flowers1,
      flowers2,
      flowers3,
      flowers4,
      flowers,
    ],
  },

  {
    id: "safari",
    name: "Safari",
    background: `${BASE}backgrounds/safari.jpg`,
    stickers: [
      bee,
      flamingo,
      giraffe,
      leopard,
      panda,
      parrot,
      penguinSafari,
      rabbitSafari,
      sleepingPanda,
      snake,
    ],
  },

  {
    id: "stars",
    name: "Starry Sky",
    background: `${BASE}backgrounds/starry-sky.jpg`,
    stickers: [
      asteroid,
      cloudy,
      creativity,
      goldStar,
      night,
      planet,
      rabbitStar,
      saturn,
      sleep,
      weather,
    ],
  },

  {
    id: "snow",
    name: "Snow",
    background: `${BASE}backgrounds/snow.jpg`,
    stickers: [
      igloo,
      penguinSnow,
      sledge,
      snow,
      snowball,
      snowclouds,
      snowflake,
      snowflakes,
      snowing,
      snowman,
    ],
  },
]
