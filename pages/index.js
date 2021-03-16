import React, { useEffect, useState } from 'react'
import { request } from 'graphql-request'
import { useViewport } from 'use-viewport'
import StakeModule from 'components/StakeModule/StakeModule'
import Header from 'components/RibbonModule/Header'
import Information from 'components/Information/Information'
import Steps from 'components/Steps/steps'
import styled from 'styled-components'
import './styles.scss'

const GQL_ENDPOINT = `${process.env.WEBSITE_BACKEND_URL}/graphql`

const POOLS = ['WBTC', 'ETH']

export default () => {
  const { below } = useViewport()
  const [socials, setSocials] = useState([])
  const [isCompact, setIsCompact] = useState(false)
  const [pool, setPool] = useState(undefined)
  const smallLayout = below(415)
  useEffect(() => {
    setTimeout(() => {
      setIsCompact(smallLayout)
    }, 0)
  }, [smallLayout])

  useEffect(() => {

    async function fetchSocials() {
      let response
      try {
        response = await request(
          GQL_ENDPOINT,
          `
              query SocialTypes {
                socialTypes {
                   name
                   icon {
                     url
                   }
                   socials {
                     title
                     url
                   }
                }
              }
          `
        )

        if (!response.socialTypes) {
          throw new Error('Wrong response')
        }

        setSocials(response.socialTypes.filter((item) => item.socials.length))
      } catch (err) {
        console.error('An error has occurred')
      }
    }

    fetchSocials()
  }, [])

  return (
    <div>
      <Header socials={socials} />
      <Information />
      <div
        css={`
          position: relative;
          min-height: 800px;
          padding: 6em 0;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        `}
      >
        <h4 css={`
          font-style: normal;
          font-weight: bold;
          font-size: 36px;
          line-height: 49px;
          color: #474955;
          margin-bottom: 12px;
          text-align: center;
        `}>INSTAR Liquidity Mining Rewards</h4>
        <p css={`
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 25px;
          color: #474955;
          margin-bottom: 60px;
          text-align: center;
        `}>Earn INSTAR on top of standard LP rewards for providing liquidity on Uniswap</p>
        {!pool &&
          (
            <section css={`
              text-align: center;
              color: #FFFFFF;
            `}>
              <div className="action-container">
                <div className="action-card">
                  <img src="market/w1.png" alt="" />
                  <h4>WBTC/INSTAR</h4>
                  <hr />
                  <div>
                    <p>Expiration Date</p>
                    <h5>Mar 31, 2021</h5>
                  </div>
                  <div>
                    <p>Total Liquidity</p>
                    <h5>$397,000</h5>
                  </div>
                  <div>
                    <p>Total Rewards</p>
                    <h5>3,000,000 INSTAR</h5>
                  </div>
                  <ActionButton onClick={() => setPool(POOLS[0])}>
                    Select
                  </ActionButton>
                </div>
                <div className="action-card">
                  <img src="market/w2.png" alt="" />
                  <h4>ETH/INSTAR</h4>
                  <hr />
                  <div>
                    <p>Expiration Date</p>
                    <h5>Mar 31, 2021</h5>
                  </div>
                  <div>
                    <p>Total Liquidity</p>
                    <h5>$397,000</h5>
                  </div>
                  <div>
                    <p>Total Rewards</p>
                    <h5>3,000,000 INSTAR</h5>
                  </div>
                  <ActionButton onClick={() => setPool(POOLS[1])}>
                    Select
                  </ActionButton>
                </div>
              </div>
            </section>
          )
        }
        {pool && (
          <div css={`
            text-align: center;
            margin-bottom: 2rem;
          `}>
            <h4 css={`color: #FFFFFF; margin-bottom: 1rem;`}>Selected Pool: INSTAR/{pool}</h4>
            <ActionButton onClick={() => location.reload()}>Go Back</ActionButton>
          </div>
        )}
        {pool && <StakeModule pool={pool} />}
      </div>
      <Steps />
    </div>
  )
}

const ActionButton = styled.button`
  position: relative;
  max-width: 11.25rem;
  align-self: center;
  margin-right: 0.4rem;
  margin-left: auto;
  background: #47bda4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 12px;
  font-weight: 700;
  line-height: 1rem;
  padding: 0.5rem 1rem;
  max-height: 32px;
  &:focus,
  &:hover {
    color: #FFFFFF;
    text-decoration: none;
    outline: none;
    background: #19a388;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2);
  }   
  
  @media (max-width: 640px) {
    font-size: 10px;
    line-height: 12px;
    padding: 0.375rem 1rem;
  }
  
  @media (min-width: 640px) {
    min-width: 7.5rem;
  }             
`
