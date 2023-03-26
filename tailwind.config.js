/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: '#046241',
				softBlack: '#55443a',
				pureWhite: '#ffffff',
				dark: '#2c2f33',
				grey: '#60666d',
				button_disabled: '#848687',
				darkGreen: '#1e3932',
				body: '#fef2f2',
				bodyAccent: '#fc3f3f',
				input_light: '#ffffff',
				input_dark: '#60666d',
			},
			backgroundColor: {
				ivory: '#f6f5ef',
				deepDark: '#111111',
				white: '#f5f4ef',
				darkGreen: '#1e3932',
			},
			padding: {
				side: '2rem',
				checkList: '1rem',
				container: '1rem',
				input: '0.75rem',
			},
			animation: {
				'show-orderly': 'slideIn 0.5s forwards',
				appear: 'appear 1s forwards',
			},
			keyframes: {
				slideIn: {
					'0%': {
						transform: 'translateX(2%)',
					},
					'100%': {
						transform: 'translateX(0)',
					},
				},
				appear: {
					'0%': {
						opacity: 0,
					},
					'100%': {
						opacity: 1,
					},
				},
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar-hide'),
		require('tailwindcss-animation-delay'),
	],
};
