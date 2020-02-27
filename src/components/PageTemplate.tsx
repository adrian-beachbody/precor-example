import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { deviceSize, device } from 'styles/variables'

const headerHeights = {
  mobileS: '60px',
  mobileL: '66px',
  laptop: '84px',
}

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 1fr auto;

  @media ${device.laptopL} {
    background-color: #f9f9f9;
  }
`

const Card = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: ${deviceSize.laptopL};
  margin: 0 auto;
  position: relative;
  @media ${device.laptopL} {
    box-shadow: 0 1px 0 #e7e7e7;
  }
  &:before {
    content: ' ';
    display: block;
    height: ${headerHeights.mobileS};
    @media ${device.mobileL} {
      height: ${headerHeights.mobileL};
    }
    @media ${device.laptop} {
      height: ${headerHeights.laptop};
    }
  }
`

const Main = styled.main`
  min-height: 100vh;
`

type Props = {
  children: ReactNode
}

export default function PageTemplate({ children }: Props) {
  return (
    <Container>
      <Card>
        <Main>{children}</Main>
      </Card>
    </Container>
  )
}
