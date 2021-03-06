// The MIT License (MIT)
//
// Copyright (c) 2016 Simon Mika
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

import { Enumerator } from "./Enumerator"

export class BufferedEnumerator<T> extends Enumerator<T> {
	private buffer: T[] = []
	constructor(private backend: Enumerator<T>) {
		super(() => {
			const result = this.peek(0)
			if (this.buffer.length > 0)
				this.buffer.shift()
			return result
		})
	}
	peek(position?: number): T | undefined {
		if (!position)
			position = 0
		let next: T | undefined
		while (position > this.buffer.length - 1 && (next = this.backend.fetch()))
			this.buffer.push(next)
		return position > this.buffer.length - 1 ? undefined : this.buffer[position]
	}
}
