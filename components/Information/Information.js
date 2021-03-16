import React, { useCallback } from 'react'
import styled from 'styled-components'
import './style.scss'

function Information() {
  return (
    <div className="instar-features">
      <div className="feature-title">
        <div className="f-title">
          <img src="market/logo-banner.png" alt="" />
          INSTAR Currently has <span>$896k</span> of Liquidity on Uniswap
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
            <h4>$0.021706</h4>
          </div>
        </a>
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>Total supply of 300M maximum</p>
            <h4>283,740,372</h4>
          </div>
        </a>
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>Market Cap</p>
            <h4>$3,872,000</h4>
          </div>
        </a>
      </div>
      <div className="features container">
        <a className="feature">
          <img src="market/feature-circle.svg" alt="" />
          <div>
            <p>INSTAR Wallets in 166 Countries</p>
            <h4>213,264</h4>
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
            <h4>41%</h4>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Information
