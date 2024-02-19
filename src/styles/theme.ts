export const lightTheme = {
  color: {
    yellow: "#FFF500",
    main: "#ffffff",
    text: {
      main: "#222222",
      sub: "#666666",
    },
    card: {
      class: "#F2F2F2",
    },
    badge: {
      background: "#FFFFFF",
      text: "black",
      border: "#3131ff",
    },
    icon: {
      button: "#666666",
    },
    primary: {
      foreground: "#1A254C",
    },
    background: {
      card: "rgba(255,255,255,0.2)",
      card2: "rgba(255,255,255,0.1)",
      secondary: "white",
    },
    shadow: {
      card: {
        border: "rgba(255,255,255,0.8)",
        inner: "rgba(0,0,0,0.15)",
      },
    },
    secondary: {
      foreground: "white",
    },
    accent: {
      foreground: "#8080FF",
    },
    button: {
      active: "#FB950A",
      disable: "#DBD5AD",
    },
    switch: {
      chip: "#ffffff",
      enable: "#8080FF",
      "disable/30": "rgba(153,153,153,0.3)",
      disable: "#999999",
    },
  },
};
export const darkTheme: typeof lightTheme = {
  color: {
    yellow: "#FFF500",
    main: "#FFF500",
    text: {
      main: "#ffffff",
      sub: "#ffffff",
    },
    card: {
      class: "#666666",
    },
    badge: {
      background: "black",
      text: "#fff500",
      border: "black",
    },
    icon: {
      button: "#000000",
    },
    background: {
      card: "rgba(0,0,0,0.5)",
      card2: "rgba(0,0,0,0.8)",
      secondary: "#222222",
    },
    shadow: {
      card: {
        border: "rgba(255,255,255,0.8)",
        inner: "rgba(0,0,0,0.15)",
      },
    },
    primary: {
      foreground: "#111111",
    },
    secondary: {
      foreground: "black",
    },
    accent: {
      foreground: "#FFF500",
    },
    button: {
      active: "#FB950A",
      disable: "#DBD5AD",
    },
    switch: {
      chip: "#222222",
      enable: "#FFF500",
      disable: "#999999",
      "disable/30": "#ffffff",
    },
  },
};

export type ThemeType = typeof lightTheme;
