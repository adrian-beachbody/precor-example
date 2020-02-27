export const fontSize = {
  base: '16px',
  jumbo: '28px',
  xxxLarge: '26px',
  xxLarge: '22px',
  xLarge: '20px',
  large: '18px',
  small: '14px',
}

export const deviceSize = {
  mobileS: '32rem',
  mobileM: '37.5rem',
  mobileL: '42.5rem',
  tablet: '76.8rem',
  laptop: '102.4rem',
  laptopL: '144rem',
  desktop: '256rem',
}

export const deviceSizePx = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
}

/*
  The html element base font-size is 10px, 1 rem, 1 em.
  Media queries don't take into account font-size on html element
  So to convert rems where font-size is 10px to ems on where font-size is 16px
  rems * (10 / 16 === 0.625) = ems
*/
export const device = {
  mobileS: `(min-width: 20em)`,
  mobileM: `(min-width: 23.4375em)`,
  mobileL: `(min-width: 26.5625em)`,
  tablet: `(min-width: 48em)`,
  laptop: `(min-width: 64em)`,
  laptopL: `(min-width: 90em)`,
  desktop: `(min-width: 160em)`,
}
