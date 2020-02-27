import { createGlobalStyle } from 'styled-components'
import fontello from 'assets/fontello/fontello.woff'
import { fontSize, fontFamily } from 'styles/variables'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: fontello;
    font-display: block;
    src: url(${fontello}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  html,
  body {
    font-family: 'CerebriSans' , Arial, Helvetica, sans-serif;
    height: 100%;
  }

  html {
    font-size: 62.5%;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%; /* stylelint-disable-line plugin/no-unsupported-browser-features, property-no-vendor-prefix */
  }

  a,
  body,
  button,
  dd,
  dt,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  input,
  label,
  p,
  pre,
  select,
  textarea,
  ul {
    margin: 0;
    padding: 0;
  }

  body {
    color: #1a1f1e;
    font-family: ${fontFamily.base};
    font-size: ${fontSize.base};
  }

  ul,
  ol {
    list-style: none;
  }

  dd,
  dt {
    display: inline-block;
  }

  dt {
    font-weight: bold;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  textarea,
  select {
    border-radius: 0;
    font-size: 100%;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    /* This is to get Safari to show box shadow on form input */
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
    appearance: none;
    border: none;
  }

  input {
    font-size: 100%;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border: none;
  }

  a {
    border-color: transparent;
    color: inherit;
    cursor: pointer;

    /*
    This is to fix the nested pointer-events: none bug
    If a tag has a child span with pointer-events: none
    click events dont work
   */
    display: inline-block;
    text-decoration: none;
    span {
      pointer-events: none;
    }
  }

  img,
  video {
    max-width: 100%;
  }

  img {
    border-style: none;
  }

  /* stylelint-disable-next-line no-descending-specificity */
  button {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    text-shadow: none;

    &::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }

    &:-moz-focusring {
      outline: 1px dotted ButtonText;
    }

    span, img {
      pointer-events: none;
    }
  }

  label {
    -webkit-tap-highlight-color: transparent;
  }

  pre {
    white-space: pre-wrap;
  }

  /* stylelint-disable-next-line no-descending-specificity */
  select {
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features, property-no-unknown */
    appearance: none;
    background-color: transparent;
    border: none;
    border-radius: 0;
    cursor: pointer;
    /* So FF select matches height of input */
    height: 1.15em;
  }

  /* stylelint-disable-next-line no-descending-specificity */
  textarea {
    border: none;
    box-shadow: none;
    overflow: auto;
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features, property-no-unknown */
    resize: none;
  }

  ::-webkit-file-upload-button {
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features, property-no-vendor-prefix */
    -webkit-appearance: button;
  }
`
export default GlobalStyle
