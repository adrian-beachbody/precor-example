import { css } from 'styled-components'
import { device } from 'styles/variables'
export const centerContent = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1210px;
  padding-left: 10px;
  padding-right: 10px;
  @media ${device.mobileL} {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const textOverflowEllipsis = css`
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
`

export const centerAbsolute = css`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`

export const screenReader = css`
  position: absolute !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
`

const animation = 'fade'
const duration = 300
const DEFAULT_OPACITY = 0.75

function getOpacity(props: { opacity?: number }) {
  return props.opacity || DEFAULT_OPACITY
}

export const fade = {
  className: css`
    opacity: ${getOpacity};

    &.${animation}-enter {
      opacity: 0;
    }

    &.${animation}-enter-active {
      opacity: ${getOpacity};
      transition: opacity ${duration}ms ease-out;
    }

    &.${animation}-exit {
      opacity: ${getOpacity};
    }

    &.${animation}-exit-active {
      opacity: 0;
      transition: opacity ${duration}ms ease-out;
    }
  `,
  duration,
  name: animation,
}
