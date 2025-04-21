import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					'100': '#b6d3fa',
					'200': '#93bdf8',
					'300': '#629ff4',
					'400': '#448df2',
					'500': '#1570ef',
					'600': '#1366d9',
					'700': '#0f50aa',
					'800': '#0c3e83',
					'900': '#092f64',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				grey: {
					'100': '#d0d3d9',
					'200': '#b9bdc7',
					'300': '#989fad',
					'400': '#858d9d',
					'500': '#667085',
					'600': '#5d6679',
					'700': '#48505e',
					'800': '#383e49',
					'900': '#2b2f38 ',
					DEFAULT: '#f0f1f3'
				},
				error: {
					'100': '#fac5c1',
					'200': '#f8a9a3',
					'300': '#f5827a',
					'400': '#f36960',
					'500': '#f04438',
					'600': '#da3e33',
					'700': '#aa3028',
					'800': '#84251f',
					'900': '#651d18 ',
					DEFAULT: '#feeceb'
				},
				warning: {
					'100': '#fdddb3',
					'200': '#fbcc8e',
					'300': '#fab55a',
					'400': '#f9a63a',
					'500': '#f79009',
					'600': '#e18308',
					'700': '#af6606',
					'800': '#884f05',
					'900': '#683c04 ',
					DEFAULT: '#fef4e6'
				},
				success: {
					'100': '#b6e9d1',
					'200': '#92deba',
					'300': '#60cf9b',
					'400': '#41c588',
					'500': '#12b76a',
					'600': '#10a760',
					'700': '#0d824b',
					'800': '#0a653a',
					'900': '#084d2d  ',
					DEFAULT: '#e7f8f0'
				},
				returned: '#845EBC',
				products: '#DBA362',
				cts: 'primary-500',
				in_stock: 'success-500',
				out_of_stock: 'error-500',
				low_stock: 'warning-500',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;