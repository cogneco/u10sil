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

export class Enumerator<T> {
	get last(): T | undefined {
		const next = this.next()
		return next ? this.last || next : next
	}
	constructor(readonly next: () => T | undefined) {
	}
	append(item: T | Enumerator<T>): Enumerator<T> {
		return new Enumerator(() => this.next() || (item instanceof Enumerator ? item.next() : item))
	}
	map<S>(mapping: (item: T) => S): Enumerator<S> {
		return new Enumerator<S>(() => {
			const item = this.next()
			return (item != undefined) ? mapping(item) : undefined })
	}
	reduce<S>(reduce: (result: S, item: T) => S, result: S): S {
		const item = this.next()
		return item ? this.reduce(reduce, reduce(result, item)) : result
	}
	apply(apply: (item: T) => void): void {
		const item = this.next()
		if (item) {
			apply(item)
			this.apply(apply)
		}
	}
	filter(filter: (item: T) => boolean): Enumerator<T> {
		return new Enumerator<T>(() => {
			let item: T | undefined
			do
				item = this.next()
			while (item != undefined && !filter(item))
			return item
		})
	}
	toArray(): T[] {
		const item = this.next()
		let result: T[]
		if (!item)
			result = []
		else {
			result = this.toArray()
			result.unshift(item)
		}
		return result
	}
}