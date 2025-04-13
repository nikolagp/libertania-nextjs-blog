import type { Config } from "tailwindcss"
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorantGaramond: ["var(--font-cormorant-garamond)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [flowbiteReact],
}
export default config