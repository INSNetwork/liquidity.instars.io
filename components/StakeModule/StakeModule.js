import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { utils as EthersUtils } from 'ethers'
import styled from 'styled-components'
import TokenAmount from 'token-amount'
import { useViewport } from 'use-viewport'
import AccountModule from 'components/AccountModule/AccountModule'
import ButtonGroup from 'components/ButtonGroup/ButtonGroup'
import Logo from 'components/Logo/Logo'
import Input from 'components/Input/Input'
import StatsRow from './StatsRow'
import Info from 'components/Info/Info'
import { bigNum } from 'lib/utils'
import { useWalletAugmented } from 'lib/wallet'
import {
  useClaim,
  useRewardsPaid,
  useStake,
  useBalanceOf,
  useTokenDecimals,
  useTokenUniswapInfo,
  useUniStaked,
  useWithdraw,
} from 'lib/web3-contracts'
import { parseUnits } from 'lib/web3-utils'

const SECTIONS = [
  { id: 'stake', copy: 'Stake', copyCompact: 'Stake' },
  { id: 'withdraw', copy: 'Withdraw', copyCompact: 'Withdraw' },
  { id: 'claim', copy: 'Claim rewards', copyCompact: 'Claim' },
]

const POOLS = ['WBTC', 'ETH']

// Filters and parse the input value of a token amount.
// Returns a BN.js instance and the filtered value.
function parseInputValue(inputValue, decimals) {
  if (decimals === -1) {
    return null
  }

  inputValue = inputValue.trim()

  // amount is the parsed value (BN.js instance)
  const amount = parseUnits(inputValue, { digits: decimals })

  if (amount.lt(0)) {
    return null
  }

  return { amount, inputValue }
}

function useConvertInputs() {
  const [inputValue, setInputValue] = useState('')
  const [amountUni, setAmountUni] = useState(bigNum(0))

  const handleSetInputValue = useCallback(e => {
    const parsedValue = parseInputValue(e.target.value, 18)
    if (parsedValue !== null) {
      setInputValue(parsedValue.inputValue)
      setAmountUni(parsedValue.amount)
    }
  }, [])

  const resetInputs = useCallback(() => {
    setInputValue('')
    setAmountUni(bigNum(0))
  }, [])

  const inputValues = useMemo(
    () => ({
      amountUni,
      handleSetInputValue,
      inputValue,
      resetInputs,
      setAmountUni,
      setInputValue,
    }),
    [
      amountUni,
      handleSetInputValue,
      inputValue,
      resetInputs,
      setAmountUni,
      setInputValue,
    ]
  )

  return inputValues
}

export default function StakeModule() {
  const [activeKey, setActiveKey] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [notification, setNotification] = useState('')
  const [pool, setPool] = useState(undefined)

  const {
    inputValue,
    handleSetInputValue,
    amountUni: amount,
    resetInputs,
    setAmountUni,
    setInputValue,
  } = useConvertInputs()
  const { account, connected } = useWalletAugmented()
  const selectedTokenBalance = useBalanceOf('TOKEN_UNI')
  const { loading: loadingStaked, staked } = useUniStaked(account)
  const decimalsUni = useTokenDecimals('UNI-V2')
  const claim = useClaim()
  const stake = useStake()
  const withdraw = useWithdraw()
  const { below } = useViewport()
  // Super ugly Next.js workaround to let us have differences between SSR & client
  const [isCompact, setIsCompact] = useState(false)
  const smallLayout = below(640)

  useEffect(() => {
    setTimeout(() => {
      setIsCompact(smallLayout)
    }, 0)
  }, [smallLayout])

  // Reset all values on connection change
  useEffect(() => {
    resetInputs()
  }, [activeKey, connected, resetInputs])

  // Reset notification on connection change
  useEffect(() => {
    setNotification('');
  }, [activeKey, connected])

  const handleMax = useCallback(() => {
    const newInputValue = EthersUtils.formatEther(
      selectedTokenBalance.toString()
    )
    setAmountUni(selectedTokenBalance)
    setInputValue(newInputValue)
  }, [selectedTokenBalance, setAmountUni, setInputValue])

  const handleSubmit = useCallback(async () => {
    try {
      setNotification('')
      setDisabled(true)

      if (SECTIONS[activeKey].id === 'stake') {
        await stake(amount)
        setNotification(`${amount && amount['_hex'] ? TokenAmount.format(amount['_hex'], 18, {symbol: 'UNI-V2', digits: 18}) : 'UNI-V2'} have been staked.`)
      }

      if (SECTIONS[activeKey].id === 'withdraw') {
        await withdraw()
        setNotification(`${TokenAmount.format(staked, 18, {symbol: 'UNI-V2', digits: 18 })} have been withdrawn.`)
      }

      if (SECTIONS[activeKey].id === 'claim') {
        await claim()
        setNotification(`${TokenAmount.format(paid, 4, { symbol: 'INSTAR', digits: 17 })} have been claimed.`)
      }
    } catch (err) {
    } finally {
      setDisabled(false)
      resetInputs()

      setTimeout( () => {
        setNotification('');
      }, 7000);
    }
  }, [activeKey, amount, claim, resetInputs, stake, withdraw])

  const inputError = useMemo(
    () =>
      amount.gt(selectedTokenBalance) ||
      (amount.eq(bigNum(0)) && SECTIONS[activeKey].id === 'stake') ||
      disabled,
    [activeKey, amount, disabled, selectedTokenBalance]
  )

  const { paid } = useRewardsPaid(account)

  return (
    <div
      css={`
        width: 100%;
        max-width: 940px;
        min-height: 492px;
        padding: 0 32px;
      `}
    >
      <section>
        <button onClick={() => setPool(POOLS[0])}>
          {POOLS[0]}
        </button>
        <button onClick={() => setPool(POOLS[1])}>
          {POOLS[1]}
        </button>
      </section>
      {pool && (
      <main
        css={`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: 100%;
          height: 100%;
          background: #FFFFFF;
          mix-blend-mode: normal;
          padding: 0 20px 20px;
          border: 1px solid #4c5585;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.25), 0 24px 38px rgba(0, 0, 0, 0.14), 0 9px 46px rgba(0, 0, 0, 0.12);
          border-radius: 8px;
          ${isCompact &&
            `
            max-height: 100%;
            padding: 0 10px 10px;
            justify-content: flex-start;
            overflow: hidden;
          `}
        `}
      >
        <div css={`
            position: relative;
            margin: 0 -20px;
            background: #ffffff;
            border-bottom: 1px solid #55525F;
        `}>
          <div css={`
              position: absolute;
              right: 20px;
              top: 20px;

              @media (max-width: 920px) {
                position: relative;
                right: 0;
                max-width: calc(100% - 40px);
                margin: 0 auto 40px;
                display: flex;
                justify-content: flex-end;
              }
           `}>
            <AccountModule css={`justify-content: flex-end;`} />
          </div>
          <ButtonGroup
            activeKey={activeKey}
            disabled={disabled}
            elements={SECTIONS}
            isCompact={isCompact}
            onSetActiveKey={setActiveKey}
          />
        </div>

        {connected && notification &&
          (
            <Info mode="success" padding="16" isCompact={isCompact}>
              <div>
                <p css={`margin-bottom: 0;`}>{notification}</p>
                <p css={`margin-bottom: 0;`}>Please, wait a bit until transaction is confirmed (see on Etherscan)</p>
              </div>
            </Info>
          )
        }

        {SECTIONS[activeKey].id === 'stake' && (
          <Info mode="info" height="40" padding="0" isCompact={isCompact}>
            <p css={`margin-bottom: 0;`}>
              <span>Learn </span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://blog.instars.com/instar-uniswap-pool-live/"
                css={`
                    &,
                    &:hover {
                     color: #7bcab5;
                    }
                `}
              >
                {' '}
                how to obtain UNI-V2
              </a>
              <span> to participate in the rewards program.</span>
            </p>
          </Info>
        )}
        {SECTIONS[activeKey].id === 'withdraw' && (
          <Info mode="info" padding="0" isCompact={isCompact}>
            Withdraw all of your staked UNI-V2.
          </Info>
        )}
        {SECTIONS[activeKey].id === 'claim' && (
          <Info mode="info" padding="0" isCompact={isCompact}>
            Claim all of your rewards from your staked UNI-V2.
          </Info>
        )}
        {!connected && (
          <Info padding="16" isCompact={isCompact}>
            Please, connect your wallet to get started
          </Info>
        )}
        {SECTIONS[activeKey].id !== 'claim' && (
          <StatsRow
            balanceUni={selectedTokenBalance}
            decimalsUni={decimalsUni}
            isCompact={isCompact}
            isStake={SECTIONS[activeKey].id === 'stake'}
          />
        )}
        {SECTIONS[activeKey].id === 'stake' && (
          <Input
            disabled={!connected || disabled}
            inputValue={inputValue}
            onChange={handleSetInputValue}
            onMax={handleMax}
          />
        )}
        {SECTIONS[activeKey].id === 'stake' && (
          <ActionButton
            type="button"
            disabled={disabled || inputError}
            onClick={disabled ? undefined : handleSubmit}
            css={`
              ${disabled ||
              (inputError &&
              `
                background: #afe4da;
                color: rgba(255, 255, 255, 1);
                cursor: default;
                &:active {
                  top: 0px;
                }
              `)}
               ${disabled || inputError || !connected ? '': `
                 &:hover {
                    background: #19a388;
                  }
               `}
            `}
          >
            {SECTIONS[activeKey].copy}
          </ActionButton>
        )}
        {SECTIONS[activeKey].id === 'stake' && (
          <div css={
            `background: #55525F;
            height: 1px;
            margin-top: 20px;
          `} />
        )}
        {SECTIONS[activeKey].id === 'stake' && (
          <StakeSection
            loading={loadingStaked}
            isCompact={isCompact}
            staked={staked}
          />
        )}
        {SECTIONS[activeKey].id === 'withdraw' && (
          <WithdrawSection
            loading={loadingStaked}
            isCompact={isCompact}
            staked={staked}
          />
        )}
        {SECTIONS[activeKey].id === 'claim' && (
          <ClaimSectionReward isCompact={isCompact} />
        )}
        {SECTIONS[activeKey].id !== 'stake' && (
          <ActionButton
            type="button"
            disabled={disabled || inputError}
            onClick={disabled ? undefined : handleSubmit}
            css={`
              margin-top: 20px;
              ${disabled ||
                (inputError &&
                  `
                background: #afe4da;
                color: rgba(255, 255, 255, 1);
                cursor: default;
                &:active {
                  top: 0px;
                }
              `)}
                ${disabled || !connected ? '': `
                 &:hover {
                    background: #19a388;
                  }
               `}
            `}
          >
            {SECTIONS[activeKey].copy}
          </ActionButton>
        )}
        {SECTIONS[activeKey].id === 'claim' && (
          <ClaimSectionLiquidityPool isCompact={isCompact} />
        )}
      </main>
      )}
   </div>
  )
}

function StakeSection({ loading, staked }) {
  const { connected } = useWalletAugmented()

  return (
    <Card
      css={`
        display: flex;
        align-items: center;
        margin-top: 20px;
      `}
    >
      <Logo mode={'uni'} />
      <div
        css={`
          display: flex;
          flex-direction: column;
          margin-left: 20px;

          @media (max-width: 640px) {
             margin-left: 12px;
          }
        `}
      >
        <span
          css={`
            display: block;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.5);
            margin-bottom: 10px;

            @media (max-width: 640px) {
              font-size: 14px;
            }
          `}
        >
          Amount of UNI-V2 staked
        </span>
        <span
          css={`
            font-family: Roboto Mono;
            font-size: 28px;
            line-height: 36px;
            color: #FFFFFF;
            display: block;
            @media (max-width: 640px) {
              font-size: 14px;
            }
          `}
        >
          {!connected
            ? '0 UNI-V2'
            : loading
            ? 'loading...'
            : TokenAmount.format(staked, 18, {
                symbol: 'UNI-V2',
                digits: 18,
              })}
        </span>
      </div>
    </Card>
  )
}

function WithdrawSection({ loading, isCompact, staked }) {
  const { connected } = useWalletAugmented()

  return (
    <div
      css={`
        display: flex;
        margin-top: 12px;
        ${isCompact &&
          `
          flex-direction: column;
        `}
      `}
    >
      <Card
        css={`
        display: flex;
        align-items: center;
      `}
      >
        <Logo mode={'uni'} />
        <div
          css={`
          display: flex;
          flex-direction: column;
          margin-left: 20px;
        `}
        >
        <span
          css={`
            display: block;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.5);
            margin-bottom: 10px;
            @media (max-width: 640px) {
              font-size: 14px;
            }
          `}
        >
          Amount available to withdraw:
        </span>
          <span
            css={`
            font-family: Roboto Mono;
            font-size: 28px;
            line-height: 36px;
            color: #FFFFFF;
            display: block;
            @media (max-width: 640px) {
              font-size: 14px;
            }
          `}
          >
          {!connected
            ? '0 UNI-V2'
            : loading
              ? 'loading...'
              : TokenAmount.format(staked, 18, {
                symbol: 'UNI-V2',
                digits: 18,
              })}
        </span>
        </div>
      </Card>
    </div>
  )
}

function ClaimSectionReward() {
  const { account } = useWalletAugmented()
  const { loading, paid } = useRewardsPaid(account)

  return (
    <div>
      <Card
        css={`
          display: flex;
          align-items: center;
          margin-top: 40px;
        `}
      >
        <Logo mode="instar" opacity={1} />
        <div
          css={`
            display: flex;
            flex-direction: column;
            margin-left: 20px;
          `}
        >
          <span
            css={`
              display: block;
              font-weight: 300;
              color: rgba(255, 255, 255, 0.5);
              margin-bottom: 10px;
              @media (max-width: 640px) {
                font-size: 14px;
              }
            `}
          >
            Rewards
          </span>
          <span
            css={`
              display: block;
            `}
          >
            <span
              css={`
                font-family: Roboto Mono;
                font-size: 28px;
                line-height: 36px;
                color: #FFFFFF;
                display: block;
                @media (max-width: 640px) {
                  font-size: 14px;
                }
              `}
            >
              {loading
                ? 'loading...'
                : TokenAmount.format(account && paid || 0, 4, { symbol: 'INSTAR', digits: 17 })}
            </span>
          </span>
        </div>
      </Card>
    </div>
  )
}

function ClaimSectionLiquidityPool({ isCompact }) {
  const [loadingUniswapInfo, uniswapInfo] = useTokenUniswapInfo('INSTAR')

  return (
    <div>
      <div css={`
        background: #55525F;
        height: 1px;
        margin-top: 20px;
      `} />
      <Card
        css={`
          display: flex;
          align-items: center;
          margin-top: 20px;
        `}
      >
        <Logo mode="instar" />
        <div
          css={`
            display: flex;
            flex-direction: column;
            margin-left: 20px;
          `}
        >
          <span
            css={`
              display: block;
              font-weight: 300;
              color: rgba(255, 255, 255, 0.5);
              margin-bottom: 10px;
              @media (max-width: 640px) {
                font-size: 14px;
              }
            `}
          >
            {isCompact ? 'Total $ USD liquidity' : `Total $ USD liquidity in the INSTAR/ETH Uniswap liquidity pool`}
          </span>
          <span
            css={`
              font-family: Roboto Mono;
              font-size: 28px;
              line-height: 36px;
              color: #FFFFFF;
              display: block;
              @media (max-width: 640px) {
                font-size: 14px;
              }
            `}
          >
            {loadingUniswapInfo || !uniswapInfo
              ? 'loading...'
              : '$' + Math.trunc(Number(uniswapInfo?.reserveUSD ? uniswapInfo.reserveUSD : 0))?.toLocaleString(
              'en-US'
              ) ?? '$0'}{' '}
          </span>
        </div>
      </Card>
    </div>
  )
}

const Card = styled.div`
  width: 100%;
  height: 104px;
  background: #4c5585;
  border-radius: 4px;
  padding: 20px 24px;
  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`

const ActionButton = styled.button`
  position: relative;
  border: 0;
  border-radius: 4px;
  padding: 0;
  width: 100%;
  height: 44px;
  cursor: pointer;
  background: #47bda4;
  color: #ffffff;
  font-weight: bold;
  mix-blend-mode: normal;
  box-shadow: 0px 2px 2px rgba(87, 95, 119, 0.15);
  &:active {
    top: 1px;
  }
`
