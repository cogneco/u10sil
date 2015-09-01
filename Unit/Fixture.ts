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

/// <reference path="Test" />
/// <reference path="TestFailedError" />
/// <reference path="./Constraints/Constraint" />

module U10sil.Unit {
	export class Fixture {
		private tests: Test[] = []
		constructor(private name: string) {
		}
		getName(): string { return this.name }
		add(name: string, action: () => void): void {
			this.tests.push(new Test(name, action))
		}
		run(): void {
			var failures: TestFailedError[] = []
			var success = true
			this.tests.forEach(test => {
				try {
					test.run()
				} catch (TestFailedError) {
					success = false
					TestFailedError.setTest(test)
					failures.push(TestFailedError)
				}
			})
			console.log(this.name + ":", success ? "passed" : "failed")
			if(!success) {
				failures.forEach(failure => {
					console.log("  ->", failure.getTest().toString())
				})
				//process.exit(1)
			}
		}
		expect(value: any, constraint: Constraints.Constraint): void {
			if (!constraint.verify(value))
				throw new TestFailedError(value, constraint)
		}
	}
}
