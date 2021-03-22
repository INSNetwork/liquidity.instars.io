import React, { useEffect, useState, useCallback }  from 'react'
import { useViewport } from 'use-viewport'
import styled from 'styled-components'
import instarLogo from 'components/Logo/logo-instars.svg'
import './style.scss'

function Header({ tab, change }) {
  const { below } = useViewport()
  const [socialsInNav, setSocialsInNav] = useState(false)
  const [isSmallLayout, setIsSmallLayout] = useState(false)
  const [isGtNormalDesktop, setIsGtNormalDesktop] = useState(false)
  const smallLayout = below(920)
  const normalDesktopLayout = !below(1352)

  useEffect(() => {
    setTimeout(() => {
      setIsSmallLayout(smallLayout)
    }, 0)
  }, [smallLayout])

  useEffect(() => {
    setTimeout(() => {
      setIsGtNormalDesktop(normalDesktopLayout)
    }, 0)
  }, [normalDesktopLayout])

  const handleSignUpClick = useCallback(data => {
    location.replace(`https://instars.com`, "_self")
  }, [])

  const handleConnect = useCallback(() => {

    let elem = document.getElementById('mining-form');

    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      elem = document.getElementById('uniswap-container');
      elem.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [])

  return (
    <div>
      <div className="page-header" css={` background: #FFFFFF; `}>
        <PageBackdrop />
        <div className="container">
          <nav>
            <div className="main-navigation-wrapper">
              <div className="main-navigation"
                   css={`
                      display: flex;
                      flex-direction: row;
                   `}
              >
                <section
                  className="logotype-component logotype"
                  css={`align-self: center;`}
                >
                  <a href={`${process.env.WEBSITE_FRONTEND_URL}`}
                     aria-label="Instars Logotype"
                     css={`
                        display: flex;
                        flex-direction: row;
                        align-content: center;
                        align-items: center;
                        justify-content: center;
                        margin: 0.75rem 1.2rem;
                        @media (max-width: 920px) {
                          margin: 1.4rem 1rem;
                        }
                        &:hover {
                          text-decoration: none;
                        }
                     `}
                  >
                    <img src={instarLogo} alt="Instar Logotype Icon" width={32} css={`height: 2rem;`} />
                    <span css= {`
                      color: #303864;
                      margin-left: .5rem;
                      letter-spacing: 4px;
                      white-space: normal;
                      word-break: break-all;
                      font-size: 1.125rem;
                      font-weight: 700;
                      letter-spacing: .04rem;
                    `}>instars.com</span>
                  </a>
                </section>
                <div className="header-menus">
                  <a className={tab === 0 ? 'active' : ''} onClick={() => change(0)}>Buy INSTAR</a>
                  <a className={tab === 1 ? 'active' : ''} onClick={() => change(1)}>Liquidity Mining</a>
                  <a href="https://instars.com/instartoken">Explore INSTAR</a>
                </div>
                <ButtonBase onClick={handleConnect}>
                  Connect Wallet
                </ButtonBase>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

const PageBackdrop = styled.div`
  background-size: cover;
  position: absolute;
  z-index: 0;
  height: 980px;
`

const ButtonBase = styled.a`
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
  color: white !important;
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

export default Header
