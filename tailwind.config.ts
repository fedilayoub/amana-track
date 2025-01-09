import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		animation: {
			spotlight: "spotlight 2s ease .75s 1 forwards",
		  },
		  keyframes: {
			spotlight: {
			  "0%": {
				opacity: '0',
				transform: "translate(-72%, -62%) scale(0.5)",
			  },
			  "100%": {
				opacity: '1',
				transform: "translate(-50%,-40%) scale(1)",
			  },
			},
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  backgroundImage: {
			'pattern': "url('/logos/logo_amana_dark_bg.svg')",
		  }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
