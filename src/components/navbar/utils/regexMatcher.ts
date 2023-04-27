export function regexMatcher(words: string, regEx: RegExp) {
	if (!words.match(regEx)) {
		throw new Error('unvalid tailwindcss backgound-color style');
	}
}
