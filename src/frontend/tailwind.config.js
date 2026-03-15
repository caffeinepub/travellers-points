/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        gold: {
          DEFAULT: "oklch(0.75 0.13 82)",
          dark: "oklch(0.62 0.13 82)",
          light: "oklch(0.85 0.10 82)",
        },
        charcoal: {
          DEFAULT: "oklch(0.18 0.02 250)",
          light: "oklch(0.24 0.03 250)",
          mid: "oklch(0.30 0.03 250)",
        },
        cream: {
          DEFAULT: "oklch(0.96 0.02 90)",
          dark: "oklch(0.88 0.03 90)",
        },
        whatsapp: "#25D366",
      },
      boxShadow: {
        luxury: "0 25px 60px -12px rgba(0,0,0,0.5), 0 4px 20px -4px rgba(0,0,0,0.3)",
        card: "0 4px 24px -4px rgba(0,0,0,0.4)",
        glow: "0 0 40px rgba(212,175,55,0.25)",
        "gold-border": "inset 0 0 0 1px oklch(0.75 0.13 82 / 0.3)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, oklch(0.75 0.13 82), oklch(0.62 0.13 82))",
        "dark-gradient": "linear-gradient(180deg, oklch(0.18 0.02 250), oklch(0.13 0.02 250))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
