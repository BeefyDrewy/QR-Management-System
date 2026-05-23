tailwind.config = {
  darkMode: "class",

  theme: {
    extend: {

      colors: {

        primary: "#bb0014",
        background: "#f9f9fc",
        surface: "#ffffff",
        secondary: "#5f5e5e",

        "surface-container-low": "#f3f3f6",
        "surface-container-lowest": "#ffffff",

        "outline-variant": "#e8bcb7",

        "on-primary": "#ffffff",
        "on-background": "#1a1c1e"

      },

      spacing: {
        md: "16px",
        sm: "8px",
        lg: "24px",
        xl: "40px",
        "margin-desktop": "32px"
      },

      borderRadius: {
        lg: "0.25rem",
        xl: "0.5rem"
      },

      fontFamily: {
        display: ["Inter"]
      }

    }
  }
}