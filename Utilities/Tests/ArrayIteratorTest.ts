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

/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Iterator" />
/// <reference path="../ArrayIterator" />

module U10sil.Utilities.Tests {
	import Is = Unit.Constraints.Is
	export class ArrayIteratorTest extends Unit.Fixture {
		constructor() {
			super("Utilitites.ArrayIterator")
			this.add("empty", () => {
				this.expect(new ArrayIterator([]).next(), Is.Undefined())
			})
			this.add("integers", () => {
				var integers = [1, 2, 4, 8, 16]
				var iterator = new ArrayIterator(integers)
				integers.forEach(value => {
					this.expect(iterator.next(), Is.Equal().To(value))
				});
				this.expect(iterator.next(), Is.Undefined())
			})
		}
	}
	Unit.Fixture.add(new ArrayIteratorTest())
}
