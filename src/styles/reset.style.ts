import { css } from "@emotion/react";
const reset = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  body,
  html {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }
  canvas,
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  }
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
  #__next,
  #root {
    isolation: isolate;
    height: 100%;
  }
  html {
    width: 100dvw;
    height: 100dvh;
    /* 50px : 3840px기준 */
    font-size: 1.303dvw;
    font-family: "Pretendard";
  }
`;
export default reset;
