/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"surface-norm": "rgba(var(--bg-norm))",
				"surface-mid": "rgba(var(--bg-mid))",
				"surface-high": "rgba(var(--bg-high))",
			}
		},
	},
}
