/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0 0% 14.9%)",
        input: "hsl(0 0% 14.9%)",
        ring: "hsl(142 71% 45%)",
        background: "hsl(0 0% 7%)",
        foreground: "hsl(0 0% 98%)",
        primary: {
          DEFAULT: "hsl(142 71% 45%)",
          foreground: "hsl(0 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 14.9%)",
          foreground: "hsl(0 0% 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 14.9%)",
          foreground: "hsl(0 0% 63.9%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 14.9%)",
          foreground: "hsl(0 0% 98%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 7%)",
          foreground: "hsl(0 0% 98%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 7%)",
          foreground: "hsl(0 0% 98%)",
        },
        // Spotify colors
        'spotify-dark': '#121212',
        'spotify-darker': '#000000',
        'spotify-gray': '#181818',
        'spotify-light-gray': '#282828',
        'spotify-text': '#ffffff',
        'spotify-text-secondary': '#b3b3b3',
        'spotify-green': '#1db954',
        'spotify-green-hover': '#1ed760',
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
}

