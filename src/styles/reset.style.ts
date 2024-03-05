import { Theme, css } from "@emotion/react";
const reset = (theme: Theme, zoom: number) => css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  *,
  ::after,
  ::before {
    margin: 0;
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out,
      background-color 0.2s ease-in-out, background 0.2s ease-in-out;
  }
  * {
    min-width: 0;
  }

  :root {
    --font-size: calc(2.3dvh * ${zoom});
  }
  body,
  html {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
    overflow: clip;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -ms-content-zooming: none;
    -ms-touch-action: none;
    content-zooming: none;
    touch-action: none;
  }
  /* canvas,
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  } */
  button,
  input,
  select,
  textarea {
    font: inherit;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    overflow-wrap: break-word;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    line-break: anywhere;
  }
  #__next,
  #root {
    isolation: isolate;
    height: 100%;
    max-height: 100dvh;
  }
  html {
    width: 100dvw;
    height: 100dvh;
    /* 50px : 3840px기준 */
    /* font-size: 1.303dvw; */
    font-size: 2.3dvh;
    font-family: "Pretendard";
  }
  button:focus:not([data-disable-focus-effect="true"]) {
    background-color: ${theme.color.accent.foreground};
    color: ${theme.color.secondary.foreground} !important;
  }
`;
export default reset;
