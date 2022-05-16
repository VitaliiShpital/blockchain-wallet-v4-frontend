import styled from 'styled-components'

import CoinDisplay from 'components/Display/CoinDisplay'
import LazyLoadContainer from 'components/LazyLoadContainer'
import { media } from 'services/styles'

export const LOADING_ITEMS_COUNT = 6

export const maxWidth = '1200px'

export const opensea_event_types = [
  'bid_entered',
  'bid_withdrawn',
  'cancelled',
  'created',
  'offer_entered',
  'successful',
  'transfer'
]

export const NftPage = styled.div`
  width: 100%;
  max-width: ${maxWidth};
  margin: 0px auto;
  position: relative;
  box-sizing: border-box;
  background: ${(props) => props.theme.white};
`

export const NftPageV2 = styled.div`
  width: 100%;
  ${media.atLeastTablet`
    padding: 24px;
  `}
  box-sizing: border-box;
`

export const LeftColWrapper = styled.div`
  position: sticky;
  height: 100%;
  top: 64px;
  overflow: scroll;
  background: ${(props) => props.theme.white};
  z-index: 1;
  ${media.atLeastTablet`
  top: 72px;
  margin-right: 20px;
  max-width: 320px;
  width: 25%;
`} > form {
    ${media.tablet`
    display: flex;
    > div {
      flex: 1;
    }
  `}
  }
`

export const LazyLoadWrapper = styled(LazyLoadContainer)`
  max-width: ${maxWidth};
  ${media.atLeastTabletL`
    width: 75%;
  `}
  > div {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: scroll;
    gap: 20px;
    margin-bottom: 20px;
  }
  ${media.atLeastLaptopL`
    > div {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  `}
`

export const GridWrapper = styled.div`
  display: flex;
  padding: 24px;
  padding-top: 0px;
  align-items: flex-start;
  border-top: 1px solid ${(props) => props.theme.grey000};
  ${media.tablet`
    padding: 0px;
  `}
`

export const Grid = styled.div`
  width: 100%;
  display: grid;
  overflow: scroll;
  gap: 20px;
  margin-bottom: 20px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  ${media.desktop`
  grid-template-columns: repeat(3, minmax(0, 1fr));
  `}
  ${media.tablet`
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 12px;
    box-sizing: border-box;
  `}
`

export const CTAWrapper = styled.div`
  padding: 8px;
`

// asset
export const Asset = styled.div`
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: ${(props) => `1px solid ${props.theme.grey100}`};
`

export const InfoStatsWrapper = styled.div`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.grey100};
  margin-bottom: 16px;
`

export const AssetImageContainer = styled.div<{
  background?: string
  backgroundColor?: string
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 100%;
  max-width: 100%;
  height: 216px;
  margin-top: 12px;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  cursor: pointer;
  background-image: ${(props) => props.background};
  background-color: ${(props) => props.backgroundColor};
`
export const AssetDetails = styled.div`
  padding: 12px 8px 0px 8px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.white};
  ${media.laptopL`
    padding-bottom: 4px;
  `}
`
export const AssetCollection = styled.div`
  overflow: hidden;
`
export const PriceCTA = styled.div`
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
export const StyledCoinDisplay = styled(CoinDisplay)`
  justify-content: flex-end;
`

// collection
export const CollectionHeader = styled.div<{ bgUrl?: string }>`
  height: 300px;
  display: flex;
  justify-content: space-between;
  background-size: cover;
  background-image: ${(props) => (props.bgUrl ? `url(${props.bgUrl})` : 'none')};
  position: relative;
  ${media.tablet`
    flex-direction: column;
  `}
`

export const CollectionImageSmall = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`

export const CollectionImage = styled.img`
  border-radius: 50%;
  position: absolute;
  height: 62px;
  width: 62px;
  top: 60px;
  left: calc(50% - 31px);
  ${media.tablet`
    height: 40px;
    width: 40px;
    top: 60px;
    left: calc(50% - 20px);
  `}
`

export const Centered = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const NftBannerWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 24px 40px;
  ${media.tablet`
    padding: 12px;
  `}
`

export const StatsWrapper = styled.div`
  display: flex;
  gap: 8px;
`

export const Stat = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  gap: 16px;
  background: rgba(255, 255, 255, 0.08);
  ${media.tablet`
    padding: 10px;
    > div {
      font-size: 12px;
    }
  `}
`
