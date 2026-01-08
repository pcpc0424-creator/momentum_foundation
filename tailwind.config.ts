import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
foreground: 'hsl(var(--foreground))',
				
				// Pastel Colors
				'pastel-pink': 'hsl(var(--pastel-pink))',
				'pastel-blue': 'hsl(var(--pastel-blue))',
				'pastel-green': 'hsl(var(--pastel-green))',
				'pastel-yellow': 'hsl(var(--pastel-yellow))',
				'pastel-purple': 'hsl(var(--pastel-purple))',
				'pastel-orange': 'hsl(var(--pastel-orange))',
				'pastel-mint': 'hsl(var(--pastel-mint))',
				'pastel-lavender': 'hsl(var(--pastel-lavender))',
				
				// Soft Accent Colors
				'soft-pink': 'hsl(var(--soft-pink))',
				'soft-blue': 'hsl(var(--soft-blue))',
				'soft-green': 'hsl(var(--soft-green))',
				'soft-yellow': 'hsl(var(--soft-yellow))',
				'soft-purple': 'hsl(var(--soft-purple))',
				'soft-orange': 'hsl(var(--soft-orange))',
				'soft-mint': 'hsl(var(--soft-mint))',
'soft-lavender': 'hsl(var(--soft-lavender))',
				
				// Natural Neutral Tones
				'warm-beige': 'hsl(var(--warm-beige))',
				'cool-grey': 'hsl(var(--cool-grey))',
				'sage-green': 'hsl(var(--sage-green))',
				'dusty-blue': 'hsl(var(--dusty-blue))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				// 커스텀 파스텔 색상
				'lawn-green': '#5EA152',
				'pastel-green': '#A8CBA0',
				'pastel-blue': '#A8D8EA',
				'pastel-beige': '#F5E6D3',
				'pastel-orange': '#FFD4A3',
				'pastel-pink': '#FAE8ED',
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Noto Sans', 'Segoe UI', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
