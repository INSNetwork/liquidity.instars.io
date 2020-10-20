import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import styled from 'styled-components'
import { trackEvent } from 'lib/analytics'
import { useWalletAugmented } from 'lib/wallet'
import { shortenAddress } from 'lib/web3-utils'

import metamask from './provider-icons/metamask.svg'
import logout from './assets/log-out.svg'

function AccountModule() {
  const { account } = useWalletAugmented()
  return account ? <ConnectedMode /> : <DisconnectedMode />
}

AccountModule.propTypes = {
  compact: PropTypes.bool,
}

function DisconnectedMode() {
  const { activate } = useWalletAugmented()

  const activateAndTrack = useCallback(
    async providerId => {
      const ok = await activate(providerId)
      if (ok) {
        trackEvent('web3_connect', {
          segmentation: {
            provider: providerId,
          },
        })
      }
    },
    [activate]
  )

  const containerRef = useRef()

  return (
    <ButtonBase
      ref={containerRef}
      css={`
        position: relative;
        justify-content: flex-end;
        width: 136px;
        height: 32px;
        background: #47bda4;
        border-radius: 4px;
        margin-left: 0;
        color: white;
        &:active {
          top: 1px;
        }
        &:focus,
        &:hover {
          outline: none;
          background: #47bda4;
          box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2);
        }
      `}
    >
      <OverlayTrigger
          trigger="click"
          rootClose
          placement="bottom-end"
          overlay={
            <StyledPopover
              css={`
              position: absolute;
              left: 0;
            `}
            >
              <div
                css={`
                position: relative;
                width: 100%;
                height: 40px;
                color: #ffffff;
              `}
              >
              <span
                css={`
                  display: block;
                  width: 100%;
                  padding-top: 24px;
                  padding-left: 24px;
                  font-size: 16px;
                  line-height: 24px;
                  font-family: 'Inter', sans-serif;
                  font-weight: bold;
                `}
              >
                Use Account From:
              </span>
                <div
                  css={`
                  display: grid;
                  grid-gap: 12px;
                  grid-auto-flow: row;
                  grid-template-columns: repeat(2, 1fr);
                  padding: 16px 24px;
                `}
                >
                  <ProviderButton
                    name="Metamask"
                    onActivate={() => activateAndTrack('injected')}
                    image={metamask}
                  />
                </div>
              </div>
            </StyledPopover>
          }
        >
          <div
            css={`
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Inter;
            font-size: 12px;
            line-height: 16px;
            font-weight: bold;
            margin: 0;
            width: 100%;
            height: 100%;
            background: transparent;
          `}
          >
            Connect Wallet
          </div>
        </OverlayTrigger>
    </ButtonBase>
  )
}

function ProviderButton({ name, onActivate, image }) {
  return (
    <ButtonBase
      onClick={onActivate}
      css={`
        position: relative;
        display: flex;
        flex-direction: column;
        background: #4c5585;
        color: rgba(255, 255, 255, 0.5);
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90px;
        border-radius: 4px;
        text-transform: capitalize;
        &:active {
          top: 1px;
        }
        &:active,
        &:hover {
          background: #19a388;
          color: #ffffff;
        }
        &:active,
        &:hover,
        &:focus {
          outline: none;
        }
      `}
    >
      <img src={image} alt="" height="32px" css={`margin-top: 5.23px;`} />
      <div
        css={`
          font-family: 'Inter', sans-serif !important;
          font-size: 12px;
          line-height: 20px;
          margin-top: 13px;
        `}
      >
        {name}
      </div>
    </ButtonBase>
  )
}

ProviderButton.propTypes = {
  name: PropTypes.string,
  onActivate: PropTypes.func,
  image: PropTypes.string,
}

function ConnectedMode() {
  const { account, deactivate } = useWalletAugmented()
  const containerRef = useRef()

  return (
    <Container ref={containerRef}>
      <ButtonBase
        css={`
          background: rgba(255, 255, 255, 0.1);
          box-shadow: none;
          display: flex;
          flex-direction: row;
          position: relative;
          align-items: center;
          justify-content: center;
          cursor: default;
          &:active {
            top: 1px;
          }
          &:active,
          &:focus {
            outline: none;
          }
        `}
      >
        <Address>{shortenAddress(account)}</Address>
      </ButtonBase>
      <ButtonBase
        onClick={deactivate}
        css={`
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          margin-left: 8px;
          padding: 9px;
          &:active,
          &:focus {
            outline: none;
          }
        `}
      >
        <img src={logout} alt="Log out" height="16px" />
      </ButtonBase>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 32px;
`

const StyledPopover = styled(Popover)`
  top: 8px !important;
  overflow: hidden;
  background: #232026;
  border: 1px solid #45424A;
  border-radius: 4px;
  width: 388px;
  max-width: 90vw;
  height: 190px;
  right: 100px;

  &.bs-popover-bottom .arrow::after {
    border-bottom-color: #f9fafc;
  }
  &.bs-popover-bottom .arrow::before {
    border-bottom-color: transparent;
  }

  div.header {
    background: #f9fafc;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      line-height: 32px;
      padding: 0;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      text-align: right;
      color: #7fdfa6;
      margin: 0;
    }
    button {
      background: transparent;
      border: 0;
      cursor: pointer;
      color: #637381;
    }
    button:hover {
      color: #212b36;
    }
  }
  span {
    top: 0px;
  }
`

const Address = styled.div`
  font-family: 'Roboto Mono';
  font-size: 12px;
  line-height: 20px;
  font-weight: normal;
  color: #FFFFFF;
  padding: 8px 16px;
`

const ButtonBase = styled.button`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border: 0;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
`

export default AccountModule
