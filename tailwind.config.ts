import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { ink:'#0f172a', plum:'#7c3aed', lime:'#a3e635' }
    }
  },
  plugins: []
}
export default config