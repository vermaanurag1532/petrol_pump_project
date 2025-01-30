/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',  // Adjust path as per your project structure
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',  // Adjust path as per your project structure
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',  // Adjust path as per your project structure
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        // Status colors
        success: "var(--success)",
        warning: "var(--warning)",
        danger: {
          DEFAULT: "var(--danger)",
          foreground: "var(--danger-foreground)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        system: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      fontSize: {
        // Responsive font sizes
        "fluid-sm": "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
        "fluid-base": "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
        "fluid-lg": "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
        "fluid-xl": "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
        "fluid-2xl": "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
      },
      spacing: {
        // Responsive spacing
        "fluid-1": "clamp(0.25rem, 0.5vw, 0.5rem)",
        "fluid-2": "clamp(0.5rem, 1vw, 1rem)",
        "fluid-3": "clamp(1rem, 1.5vw, 1.5rem)",
        "fluid-4": "clamp(1.5rem, 2vw, 2rem)",
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
