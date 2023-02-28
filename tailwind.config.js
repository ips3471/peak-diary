/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: '#046241',
				softBlack: '#55443a',
			},
			backgroundColor: {
				ivory: '#f6f5ef',
				deepDark: '#111111',
				white: '#f5f4ef',
				darkGreen: '#1e3932',
			},
			padding: {
				side: '2rem',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
