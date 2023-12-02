/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "max-height": "max-height",
        height: "height",
      },
      boxShadow: {
        header:
          "0 0.46875rem 2.1875rem rgb(59 62 102 / 3%), 0 0.9375rem 1.40625rem rgb(59 62 102 / 3%), 0 0.25rem 0.53125rem rgb(59 62 102 / 5%), 0 0.125rem 0.1875rem rgb(59 62 102 / 3%)",
        "card-box": "0 1px 15px 1px rgb(62 57 107 / 7%)",
        button: "0 14px 24px 0 rgb(62 57 107 / 26%)",
        "button-alt":
          "0 14px 26px -12px rgb(0 0 0 / 10%), 0 4px 23px 0 rgb(0 0 0 / 10%), 0 8px 10px -5px rgb(0 0 0 / 10%)",
        section:
          "0 0.46875rem 2.1875rem rgb(59 62 102 / 3%), 0 0.9375rem 1.40625rem rgb(59 62 102 / 3%), 0 0.25rem 0.53125rem rgb(59 62 102 / 5%), 0 0.125rem 0.1875rem rgb(59 62 102 / 3%)",
        drawer:
          "0 3px 5px -1px rgb(0 0 0 / 20%), 0 5px 8px 0 rgb(0 0 0 / 14%), 0 1px 14px 0 rgb(0 0 0 / 12%)",
        card: "0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)",

        box: "rgba(0, 0, 0, 0.2) 0 8px 10px -5px, rgba(0, 0, 0, 0.14) 0 16px 24px 2px, rgba(0, 0, 0, 0.12) 0 6px 30px 5px",

        dialog:
          "0 3px 5px -1px rgb(0 0 0 / 10%), 0 6px 10px 0 rgb(0 0 0 / 10%), 0 1px 18px 0 rgb(0 0 0 / 12%)",
        "play-button":
          "rgba(0 0 0 0.2) 0 3px 5px -1px, rgba(0 0 0 0.14) 0 6px 10px 0, rgba(0 0 0 0.12) 0 1px 18px 0",
      },

      colors: {
        onNeutralBg: "var(--onNeutralBg)",
        neutralBg: "var(--neutralBg)",
        neutralBgOpacity: "var(--neutralBgOpacity)",
        neutralBgAlt: "var(--neutralBgAlt)",

        primary: "var(--primary)",
        "primary-opacity": "var(--primary-opacity)",
        "primary-light-gray": "var(--primary-light-gray)",
        secondary: "var(--onNeutralBgSecondary)",
        divider: "var(--onNeutralBgDivider)",

        sidebar: "var(--neutralBgAlt)",
        main: "var(--neutralBg)",
        switch: "var(--switchBg)",

        card: "var(--cardBg)",
        "card-skeleton": "var(--cardSkeletonBg)",
        "card-hover": "var(--cardBgHover)",
        player: "var(--playerBg)",

        glassmorphism: "rgba(0, 0, 0, 0.50)",
      },

      width: {
        sidebar: "var(--sidebar-width)",
        aside: "var(--aside-width)",
        logo: "var(--logo-width)",
      },

      height: {
        navbar: "var(--nav-height)",
        player: "var(--player-height)",
      },

      minWidth: {
        sidebar: "var(--sidebar-width)",
        aside: "var(--aside-width)",
      },

      spacing: {
        sidebar: "var(--sidebar-width)",
        aside: "var(--aside-width)",
        navbar: "var(--nav-height)",
        "main-top": "var(--main-margin-top)",
        logo: "var(--logo-width)",
        player: "var(--player-height)",
        sidebarHorizontal: "var(--sidebar-horizontal-width)",
      },

      screens: {
        xs: "450px",
      },

      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
    },
  },
  plugins: [],
};
