// todo
// -------------------------------------------

// handle for errors/incorrect values
// accept rgb/hsl string?


// utilities
// -------------------------------------------

function hslString(h, s, l) {
  return `hsl(${h}, ${s}, ${l})`
}

function oppositeHue(h) {
  return (h + 180) % 360
}

function getShade(h, s, l, percentage) {
  const baseLightness     = parseInt(l, 10)
  const differenceToWhite = 100 - parseInt(l, 10)
  const tint              = (parseInt(percentage, 10) / 100) * differenceToWhite
  const adjustedLightness = `${baseLightness + tint}%`
  return hslString(h, s, adjustedLightness)
}

export function generateShades(h, s, l, shadeVariation) {
  const names = ['darker', 'dark', 'base', 'light', 'lighter']
  let variationMultiplier = -2
  const shades = {}

  names.forEach(name => {
    const variationPercentage = parseInt(shadeVariation, 10) * variationMultiplier
    shades[name] = getShade(h, s, l, variationPercentage)
    variationMultiplier++
  })

  return shades
}


// scheme generators
// -------------------------------------------

function generateAnalogousScheme(h, s, l, hueIncrement) {
  return [
    [h, s, l],
    [h - hueIncrement, s, l],
    [h + hueIncrement, s, l],
  ]
}

function generateAccentedAnalogousScheme(h, s, l, hueIncrement) {
  return [
    [h, s, l],
    [h - hueIncrement, s, l],
    [h + hueIncrement, s, l],
    [oppositeHue(h), s, l],
  ]
}

function generateDualScheme(h, s, l, hueIncrement) {
  const betaHue = h + hueIncrement
  return [
    [h, s, l],
    [oppositeHue(h), s, l],
    [betaHue, s, l],
    [oppositeHue(betaHue), s, l],
  ]
}

function generateComplementaryScheme(h, s, l, hueIncrement) {
  return [
    [h, s, l],
    [oppositeHue(h), s, l],
    [oppositeHue(h) - hueIncrement, s, l],
    [oppositeHue(h) + hueIncrement, s, l],
  ]
}

function generateTriadicScheme(h, s, l, hueIncrement) {
  return [
    [h, s, l],
    [oppositeHue(h) - hueIncrement, s, l],
    [oppositeHue(h) + hueIncrement, s, l],
  ]
}


// palette generator
// -------------------------------------------

export default function generatePalette(h, s, l, { hueIncrement = 20,
                                                   shadeVariation = '20%',
                                                   scheme = 'complementary' } = {}) {
  const colorGroupNames = ['alpha', 'beta', 'delta', 'gamma', 'epsilon']

  let colorValues = []
  switch (scheme) {
    case 'complementary':
      colorValues = generateComplementaryScheme(h, s, l, hueIncrement)
      break
    case 'analogous':
      colorValues = generateAnalogousScheme(h, s, l, hueIncrement)
      break
    case 'accentedAnalogous':
      colorValues = generateAccentedAnalogousScheme(h, s, l, hueIncrement)
      break
    case 'dual':
      colorValues = generateDualScheme(h, s, l, hueIncrement)
      break
    case 'triadic':
      colorValues = generateTriadicScheme(h, s, l, hueIncrement)
      break
    default:
      colorValues = generateComplementaryScheme(h, s, l, hueIncrement)
  }

  const colors = {}
  colorValues.forEach((color, i) => {
    const [h, s, l] = color
    colors[colorGroupNames[i]] = generateShades(h, s, l, shadeVariation)
  })

  colors.grey = generateShades(h, '25%', '87%', shadeVariation)

  return colors
}
