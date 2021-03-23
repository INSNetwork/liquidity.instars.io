import React, { useCallback } from 'react'
import styled from 'styled-components'
import './style.scss'
import { useInstarUniswapInfo } from 'lib/web3-contracts'

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


function Information() {
  const [loadingInstarInfo, instarInfo] = useInstarUniswapInfo()
  const marketCap = Number(instarInfo?.cryptoResult?.usd_price_current) * Number(instarInfo?.totalSupply); 
  const stakedPercentage = Number(instarInfo?.totalStaked) / Number(instarInfo?.totalSupply) * 100;
  return (
    <div className="instar-features">
      <div className="feature-title">
        <div className="f-title">
          <img src="market/logo-banner.png" alt="" />
          INSTAR Currently has
          <span>
            {loadingInstarInfo || !instarInfo ? '' : '$' + nFormatter(Number(instarInfo?.dayData?.totalLiquidityUSD ? instarInfo.dayData.totalLiquidityUSD * 2 : 0)) ?? '$0'}
          </span>
          of Liquidity on Uniswap
        </div>
        <p>Access INSTAR liquidity on Uniswap</p>
        <div className="actions">
          <a href="https://info.uniswap.org/pair/0xfa309661aa46a5ed9fa6556fff07f9a74a4894c6" target="_blank">
            <img src="market/wbtc.svg" alt="" />
            INSTAR/WBTC
          </a>
          <a href="https://info.uniswap.org/pair/0x645b2fec49bc950cbcffb37abbfe80fe1e545b5a" target="_blank">
            <img src="market/eth.svg" alt="" />
            INSTAR/ETH
          </a>
        </div>
      </div>
      <div className="features container">
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>INSTAR Price</p>
            <h4>${loadingInstarInfo || !instarInfo ? '' : Number(instarInfo?.cryptoResult?.usd_price_current ? instarInfo?.cryptoResult.usd_price_current : 0).toFixed(4) ?? '0'}</h4>
          </div>
        </a>
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>Total supply of 300M maximum</p>
            <h4>{loadingInstarInfo || !instarInfo ? '' : Math.trunc(Number(instarInfo?.totalSupply ? instarInfo.totalSupply : 0)).toLocaleString('en-US') ?? '0'}</h4>
          </div>
        </a>
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>Market Cap</p>
            <h4>${loadingInstarInfo || !instarInfo ? '' : Math.trunc(marketCap).toLocaleString('en-US') ?? '0'}</h4>
          </div>
        </a>
      </div>
      <div className="features container">
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>INSTAR Wallets in 166 Countries</p>
            <h4>{loadingInstarInfo || !instarInfo ? '' : Number(instarInfo.totalWallets).toLocaleString('en-US') ?? '0'}</h4>
          </div>
        </a>
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>Will be burned from fees</p>
            <h4>Up to 50%</h4>
          </div>
        </a>
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>Staked</p>
            <h4>{loadingInstarInfo || !instarInfo ? '' : Math.trunc(stakedPercentage) ?? '0'}%</h4>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Information
