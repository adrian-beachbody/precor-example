import styled from 'styled-components'

export type IconProps = {
  code: string
}

export const search = '\\e800'
export const downOpen = '\\e801'
export const plus = '\\e802'
export const check = '\\e803'
export const ok = '\\e806'
export const attention = '\\e804'
export const lock = '\\e805'
export const leftOpen = '\\e807'
export const rightOpen = '\\e808'
export const heartEmpty = '\\e80a'
export const heart = '\\e80b'
export const cancel = '\\e809'
export const star = '\\e80c'
export const rightBig = '\\e80d'
export const box = '\\e80e'
export const creditCard = '\\e80f'
export const shop = '\\e835'
export const menu = '\f0c9'
export const mailAlt = '\f0e0'
export const angleDown = '\f107'
export const starHalfAlt = '\f123'
export const creditCardAlt = '\f283'

export default styled.span<IconProps>`
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  text-align: center;
  /* opacity: .8; */

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;

  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;
  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */

  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :before { content: "${prop => prop.code}"; }
`
