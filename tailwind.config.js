/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bluebg: "#021064",
        lightblue: "#4D41DF",
        graytext: "#454651",
        greenbg: "#15803D",
        brownbg: "#B45309",
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#F59E0B",
        background: "#FFFFFF",
        surface: "#F3F4F6",
        text: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
        },
      },
      fontSize: {
        Bigtext: "36px",
        Minibigtext: "20px",
        mediumtext: "16px",
        smalltext: "10px",
      },
      // Moved fontFamily outside of colors
      fontFamily: {
        sans: ["Inter_400Regular"],
        inter: ["Inter_400Regular"],
        "inter-thin": ["Inter_100Thin"],
        "inter-light": ["Inter_300Light"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        "inter-black": ["Inter_900Black"],
      },
      spacing: {
        "screen-edge": "20px",
        gutter: "20px",
        small: "4px",
        medium: "8px",
        big: "16px",
        large: "24px",
        section: "32px",
        "section-lg": "48px",
        header: "64px",
        input: "56px",
        btn: "52px",
        "safe-top": "44px",
        "safe-bottom": "34px",
      },
    },
  },
  plugins: [],
};
