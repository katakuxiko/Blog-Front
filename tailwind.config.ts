import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	
	theme: {
		 screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px', // Проверьте, что это значение есть
      xl: '1280px',
      '2xl': '1536px',
    },
		extend: {
			fontFamily: {
				
				sans: [
					'"Inter"',
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
			fontSize: {
				"heading-1": [
					"32px",
					{ lineHeight: "36px", letterSpacing: "-1%", fontWeight: 600 },
				],
				"heading-2": [
					"28px",
					{ lineHeight: "32px", letterSpacing: "-1%", fontWeight: 600 },
				],
				"heading-3": [
					"24px",
					{ lineHeight: "28px", letterSpacing: "-1%", fontWeight: 600 },
				],
				"subtitle-1": [
					"22px",
					{ lineHeight: "24px", letterSpacing: "-1%", fontWeight: 600 },
				],
				"subtitle-2": [
					"18px",
					{ lineHeight: "24px", letterSpacing: "0", fontWeight: 500 },
				],
				"subtitle-3": [
					"16px",
					{ lineHeight: "24px", letterSpacing: "-1%", fontWeight: 600 },
				],
				"body-1-semibold": [
					"16px",
					{ lineHeight: "24px", letterSpacing: "0", fontWeight: "600" },
				],
				"body-1-medium": [
					"16px",
					{ lineHeight: "24px", letterSpacing: "0", fontWeight: "500" },
				],
				"body-1-regular": [
					"16px",
					{ lineHeight: "24px", letterSpacing: "0", fontWeight: "400" },
				],
				"body-2-semibold": [
					"14px",
					{ lineHeight: "20px", letterSpacing: "0", fontWeight: "600" },
				],
				"body-2-medium": [
					"14px",
					{ lineHeight: "20px", letterSpacing: "0", fontWeight: "500" },
				],
				"body-2-regular": [
					"14px",
					{ lineHeight: "20px", letterSpacing: "0", fontWeight: "400" },
				],
				"body-3-semibold": [
					"14px",
					{ lineHeight: "16px", letterSpacing: "0", fontWeight: "600" },
				],
				"body-3-medium": [
					"14px",
					{ lineHeight: "16px", letterSpacing: "0", fontWeight: "500" },
				],
				"body-3-regular": [
					"14px",
					{ lineHeight: "16px", letterSpacing: "0", fontWeight: "400" },
				],
				"caption-1-semibold": [
					"12px",
					{ lineHeight: "16px", letterSpacing: "0", fontWeight: "600" },
				],
				"caption-1-medium": [
					"12px",
					{ lineHeight: "16px", letterSpacing: "0", fontWeight: "500" },
				],
				"caption-1-regular": [
					"12px",
					{ lineHeight: "16px", letterSpacing: "0", fontWeight: "400" },
				],
				"caption-2-semibold": [
					"10px",
					{ lineHeight: "12px", letterSpacing: "0", fontWeight: "600" },
				],
				"caption-2-medium": [
					"10px",
					{ lineHeight: "12px", letterSpacing: "0", fontWeight: "500" },
				],
				"caption-2-regular": [
					"10px",
					{ lineHeight: "12px", letterSpacing: "0", fontWeight: "400" },
				],
				"alt-semibold": [
					"10px",
					{ lineHeight: "12px", letterSpacing: "0", fontWeight: "600" },
				],
				"label-semibold": [
					"12px",
					{ lineHeight: "12px", letterSpacing: "2%", fontWeight: "600" },
				],
			},
			colors: {
				"custom-turquoise": "#54CDDE",
				"custom-teal": "#30B0C7",
				"custom-white-blue": "#EDF8FD",
				"custom-cyan": "#32ADE6",
				"custom-secondary": "#F0F2F4",
			},
		},
	},
	plugins: [],
} satisfies Config;
