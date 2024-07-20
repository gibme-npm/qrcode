// Copyright (c) 2024, Brandon Lehmann <brandonlehmann@gmail.com>
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
import { DefaultOptions, Options } from './types';

export { Options };

/** @ignore */
const validate_color = (color: string): boolean =>
    /^[0-9a-f]{3}$/i.test(color) || /^[0-9a-f]{6}$/i.test(color);

export class QRCodeInstance {
    public readonly base_url = 'https://quickchart.io/qr';

    /**
     * Creates a new instance of a QR Code
     *
     * @param text
     * @param _options
     */
    constructor (public text: string, private _options: Partial<Options> = {}) {
        this._options = deepmerge(DefaultOptions, this._options);

        if (this._options.light && !validate_color(this._options.light)) {
            throw new Error('Invalid light color specified');
        }

        if (this._options.dark && !validate_color(this._options.dark)) {
            throw new Error('Invalid dark color specified');
        }

        if (this._options.margin && this._options.size && this._options.margin >= this._options.size) {
            throw new Error('Margin cannot be larger than size');
        }

        if (this._options.centerImageSizeRatio &&
            (this._options.centerImageSizeRatio < 0 || this._options.centerImageSizeRatio > 1)) {
            throw new Error('Center Image Size Ratio must be between 0 and 1');
        }
    }

    public get options (): Partial<Options & { text: string }> {
        return {
            text: this.text,
            ...this._options
        };
    }

    public set options (options: Partial<Options & { text: string }>) {
        this._options = deepmerge(this._options, options);
    }

    /**
     * Returns the url to the qrcode image that is suitable for use in the
     * `src` attribute of an <img> element
     */
    public toString (): string {
        const params = new URLSearchParams();

        params.set('text', this.text);

        for (const key of Object.keys(this._options)) {
            params.set(key, this._options[key]);
        }

        return `${this.base_url}?${params.toString()}`;
    }
}

/**
 * Constructs a new QR Code instance
 *
 * @param text
 * @param options
 * @constructor
 */
export const QRCode = (text: string, options: Partial<Options> = {}) => new QRCodeInstance(text, options);

export default QRCode;
