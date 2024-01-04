export const lightTheme = {
  color: {
    text: {
      main: "#000000",
      sub: "#666666",
    },
    primary: {
      foreground: "#FFFBE2",
    },
    secondary: {
      foreground: "white",
    },
    accent: {
      foreground: "#65B741",
    },
    button: {
      active: "#FB950A",
      disable: "#DBD5AD",
    },
  },
};
export const darkTheme: typeof lightTheme = {
  color: {
    text: {
      main: "#ffffff",
      sub: "#666666",
    },
    primary: {
      foreground: "#111111",
    },
    secondary: {
      foreground: "black",
    },
    accent: {
      foreground: "#65B741",
    },
    button: {
      active: "#FB950A",
      disable: "#DBD5AD",
    },
  },
};

export type ThemeType = typeof lightTheme;
