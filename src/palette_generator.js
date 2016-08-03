// todo
// -------------------------------------------

// handle for errors/incorrect values
// accept rgb/hsl string?
// build to es2015
// Readme
// npm package
// react component?


// schemes
// -------------------------------------------

// Complementary
//   Multiple accent colors selected across color wheel from base color
// Analogous
//   Secondary colors selected adjacent to base color
//   2 secondary colors only
// Analogous (accented)
//   secondary colors selected adjacent to base color + single accent color from across color wheel
//   2 secondary colors + accent color only
// Dual
//   Primary + secondary colors + their accent colors


// utilities
// -------------------------------------------

function color(h, s, l) {
  return `hsl(${h}, ${s}, ${l})`
}

function oppositeHue(h) {
  return (h + 180) % 360
}

function adjustL(h, s, l, perc) {
  const lr = 100 - parseInt(l)
  const adjustedL = parseInt(l) + ((parseInt(perc) / 100) * lr) + "%"
  return color(h, s, adjustedL)
}

function generateShades(h, s, l, shadeVariation) {
  const names = ["lighter", "light", "base", "dark", "darker"]
  let variationMultiplier = -2
  let shades = {}

  names.map(name => {
    const vp = parseInt(shadeVariation) * variationMultiplier
    shades[name] = adjustL(h, s, l, vp)
    variationMultiplier++
  })

  return shades
}


// scheme generators
// -------------------------------------------

function generateAnalogousScheme(h, s, l, hueInc) {
  return [
    [h, s, l],
    [h - hueInc, s, l],
    [h + hueInc, s, l]
  ]
}

function generateAccentedAnalogousScheme(h, s, l, hueInc) {
  return [
    [h, s, l],
    [h - hueInc, s, l],
    [h + hueInc, s, l],
    [oppositeHue(h), s, l]
  ]
}

function generateDualScheme(h, s, l, hueInc) {
  const betaHue = h + hueInc
  return [
    [h, s, l],
    [oppositeHue(h), s, l],
    [betaHue, s, l],
    [oppositeHue(betaHue), s, l]
  ]
}

function generateComplementaryScheme(h, s, l, hueInc) {
  return [
    [h, s, l],
    [oppositeHue(h), s, l],
    [oppositeHue(h) - hueInc, s, l],
    [oppositeHue(h) + hueInc, s, l]
  ]
}

function generateTriadicScheme(h, s, l, hueInc) {
  return [
    [h, s, l],
    [oppositeHue(h) - hueInc, s, l],
    [oppositeHue(h) + hueInc, s, l]
  ]
}


// palette generator
// -------------------------------------------

export function generatePalette(h, s, l, { hueInc = 20, shadeVariation = "20%", scheme = "dual" } = {}) {
  const colorGroupNames = ["alpha", "beta", "delta", "gamma", "epsilon"]

  let colorValues = []
  switch (scheme) {
  case "complementary":
    colorValues = generateComplementaryScheme(h, s, l, hueInc)
    break
  case "analogous":
    colorValues = generateAnalogousScheme(h, s, l, hueInc)
    break
  case "accentedAnalogous":
    colorValues = generateAccentedAnalogousScheme(h, s, l, hueInc)
    break
  case "dual":
    colorValues = generateDualScheme(h, s, l, hueInc)
    break
  case "triadic":
    colorValues = generateTriadicScheme(h, s, l, hueInc)
    break
  default:
    colorValues = generateComplementaryScheme(h, s, l, hueInc)
  }

  let colors = {}
  colorValues.map((color, i) => {
    const [h, s, l] = color
    colors[colorGroupNames[i]] = generateShades(h, s, l, shadeVariation)
  })

  colors.grey = generateShades(h, "25%", "87%", shadeVariation)

  return colors
}
