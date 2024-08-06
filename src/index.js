module.exports = function check(str, bracketsConfig) {
	const stack = []
	const bracketMap = {}
	const openingBrackets = new Set()
	const closingBrackets = new Set()
	const specialBrackets = new Set()

	// Create a map and sets from the bracketsConfig
	bracketsConfig.forEach(([open, close]) => {
		bracketMap[close] = open
		openingBrackets.add(open)
		closingBrackets.add(close)
		if (open === close) {
			specialBrackets.add(open)
		}
	})

	for (let char of str) {
		if (openingBrackets.has(char)) {
			if (specialBrackets.has(char) && stack[stack.length - 1] === char) {
				// Handle special case: close the current special bracket
				stack.pop()
			} else {
				// Regular opening bracket or start of a special one
				stack.push(char)
			}
		} else if (closingBrackets.has(char)) {
			if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
				return false // Mismatch found
			}
		}
	}

	return stack.length === 0
}
