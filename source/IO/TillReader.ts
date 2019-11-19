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

import * as Error from "../Error"
import * as Uri from "../Uri"
import { Reader } from "./Reader"
import { BufferedReader } from "./BufferedReader"

export class TillReader extends Reader {
	get tabSize(): number { return this.backend.tabSize }
	set tabSize(size: number) { this.backend.tabSize = size }
	private backend: BufferedReader
	private done = false
	get readable(): boolean { return this.backend.readable }
	get opened(): boolean { return !this.done && this.backend.opened }
	get isEmpty() { return this.done || this.backend.isEmpty }
	get resource(): Uri.Locator { return this.backend.resource }
	get location(): Error.Location { return this.backend.location }
	get region(): Error.Region { return this.backend.region }
	private constructor(backend: Reader, private endMark: string | string[]) {
		super()
		this.backend = backend instanceof BufferedReader ? backend : BufferedReader.create(backend)
		this.done = this.backend.peekIs(this.endMark) != undefined
	}
	close(): Promise<boolean> {
		const result = !this.done
		if (result)
			this.done = true
		return Promise.resolve(result)
	}
	read(): string | undefined {
		let result: string | undefined
		if (!this.done) {
			result = this.backend.read()
			this.done = this.backend.peekIs(this.endMark) != undefined
		}
		return result
	}
	mark(): Error.Region { return this.backend.mark() }
	static create(backend: undefined, endMark?: string | string[]): undefined
	static create(backend: Reader, endMark?: string | string[]): Reader
	static create(backend: Reader | undefined, endMark?: string | string[]): Reader | undefined {
		return backend && endMark ? new TillReader(backend, endMark) : backend
	}
}
