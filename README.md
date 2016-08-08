`palette-generator` allows you to use simple color theory rules to create and maintain a color palette with consistant relationships between colors and shades.
Make high level adjustments to your palette while maintaining the same consistant relationships between colors.

### Installation
```
npm install palette-generator --save
```

### Usage

```js
paletteGenerator(hue, saturation, lightness [, options])
```

### Options
All options are optional.

#### scheme
_Default_: `"complementary"`

_Values_: `analogous`, `accentedAnalogous`, `complementary`, `dual`, `triadic`

The color theory rule set used to generate the palette.

#### hueInc
_Default_: `20`

The degree of hue variation between generated palette colors.

#### shadeVariation
_Default_: `"20%"`

The percentage variation in shades generated for each palette color.


### Palette structure

```js
{
  alpha: {
    lighter: "hsl()",
    light: "hsl()",
    base: "hsl()",     // initial color
    dark: "hsl()",     // shade variation of initial color
    darker: "hsl()"
 },
  beta: {
    lighter: "hsl()",
    light: "hsl()",
    base: "hsl()",     // generated palette color
    dark: "hsl()",     // shade variation of generated palette color
    darker: "hsl()"
 },
 etc...
}
```

### Example

```js
import paletteGenerator from 'palette-generator'

const palette = paletteGenerator(215, "74%", "58%", {shadeVariation: "20%",
                                                     hueInc: 15,
                                                     scheme: "accentedAnalogous"})

const styles = {
  box: {
    backgroundColor: palette.alpha.base
    borderColor: palette.beta.dark
    color: palette.delta.lighter
  }
}
```

### Available schemes

#### Analogous
Initial base color + two secondary colors selected adjacent to the initial base color on the color wheel.

#### Analogous (accented)
Initial base color + two secondary colors selected adjacent to the initial base color on the color wheel + 1 accent color selected from across the color wheel.

#### Complementary
Initial base color + three accent colors selected from across color wheel.

#### Dual
Initial base color + one secondary color selected adjacent to the initial base color + accent colors for both initial and secondary colors selected from across the color wheel.

#### Triadic
Initial base color + two accent colors selected from across color wheel.

### Related
Inspired by <a href="http://paletton.com" target="_blank">Paletton</a>

### TODO
+ Tests
+ Option to add custom colors
+ Accept/return color formats other than hsl

