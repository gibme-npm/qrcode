# @gibme/qrcode

A lightweight QR code URL generator that builds requests against the [QuickChart.io](https://quickchart.io/qr) QR API. Rather than generating QR codes locally, it constructs a URL that returns the rendered QR code image when fetched.

## Installation

```bash
yarn add @gibme/qrcode
```

or

```bash
npm install @gibme/qrcode
```

**Requires Node.js >= 22**

## Usage

```typescript
import QRCode from '@gibme/qrcode';

// Basic usage — returns a URL to a PNG QR code image
const url = QRCode('https://github.com');

// With custom options
const customUrl = QRCode('https://example.com', {
    format: 'svg',
    size: 300,
    dark: '1a1a1a',
    light: 'f0f0f0',
    ecLevel: 'H',
    caption: 'Scan me'
});
```

The returned URL can be used directly in `<img>` tags, fetched via HTTP, or embedded anywhere a URL is accepted.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `format` | `'png' \| 'svg' \| 'base64'` | `'png'` | Output image format |
| `size` | `number` | `150` | QR code size in pixels |
| `margin` | `number` | `4` | Quiet zone margin around the code |
| `dark` | `string` | `'000000'` | Dark module color (3 or 6-digit hex) |
| `light` | `string` | `'ffffff'` | Light module color (3 or 6-digit hex) |
| `ecLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Error correction level |
| `centerImageUrl` | `string` | — | URL of a logo/image to place in the center |
| `centerImageSizeRatio` | `number` | `0.3` | Size ratio of center image (0–1) |
| `centerImageWidth` | `number` | — | Override center image width |
| `centerImageHeight` | `number` | — | Override center image height |
| `caption` | `string` | — | Text caption below the QR code |
| `captionFontFamily` | `string` | `'sans-serif'` | Font family for caption text |
| `captionFontSize` | `number` | `10` | Font size for caption text |

## Error Correction Levels

| Level | Recovery |
|---|---|
| `L` | ~7% |
| `M` | ~15% |
| `Q` | ~25% |
| `H` | ~30% |

Higher levels allow more of the QR code to be damaged or obscured (e.g., by a center image) while remaining scannable.

## Documentation

Full API documentation is available at [https://gibme-npm.github.io/qrcode/](https://gibme-npm.github.io/qrcode/).

## License

[MIT](./LICENSE)
