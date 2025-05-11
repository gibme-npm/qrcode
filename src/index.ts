// Copyright (c) 2024-2025, Brandon Lehmann <brandonlehmann@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import deepmerge from 'deepmerge';

/** @ignore */
const validate_color = (color: string): boolean =>
    /^[0-9a-f]{3}$/i.test(color) || /^[0-9a-f]{6}$/i.test(color);

export function QRCode (
    text: string,
    options: Partial<QRCode.Options> = {}
): string {
    const base_url = 'https://quickchart.io/qr';

    options = deepmerge(QRCode.DefaultOptions, options);

    if (options.light && !validate_color(options.light)) {
        throw new Error('Invalid light color specified');
    }

    if (options.dark && !validate_color(options.dark)) {
        throw new Error('Invalid dark color specified');
    }

    if (options.margin && options.size && options.margin >= options.size) {
        throw new Error('Margin cannot be larger than size');
    }

    if (options.centerImageSizeRatio &&
        (options.centerImageSizeRatio < 0 || options.centerImageSizeRatio > 1)) {
        throw new Error('Center Image Size Ratio must be between 0 and 1');
    }

    const params = new URLSearchParams();

    params.set('text', text);

    for (const key of Object.keys(options)) {
        params.set(key, options[key]);
    }

    return `${base_url}?${params.toString()}`;
}

export namespace QRCode {
    export type Options = {
        format: 'png' | 'svg' | 'base64';
        margin: number;
        size: number;
        dark: string;
        light: string;
        ecLevel: 'L' | 'M' | 'Q' | 'H';
        centerImageUrl: `http://${string}` | `https://${string}`;
        centerImageSizeRatio: number;
        centerImageWidth: number;
        centerImageHeight: number;
        caption: string;
        captionFontFamily: string;
        captionFontSize: number;
    }

    export const DefaultOptions: Partial<Options> = {
        format: 'png',
        margin: 4,
        size: 150,
        dark: '000000',
        light: 'ffffff',
        ecLevel: 'M',
        centerImageSizeRatio: 0.3,
        captionFontFamily: 'sans-serif',
        captionFontSize: 10
    };
}

export default QRCode;
