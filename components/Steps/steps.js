import React from 'react'
import './style.scss'

function Steps() {
  return (
    <div className="steps-container">
      <div className="container">
        <h4 className="container-title">Follow The Steps</h4>
        <div className="steps">
          <div className="step-content">
            <div className="step-img1">
              <img src="market/step1.png" alt="" />
            </div>
            <h4>Connect Wallet</h4>
            <p>On a desktop browser install the MetaMask wallet extension from</p>
            <a href="https://Metamask.io">Metamask.io</a>
          </div>
          <div className="step-content">
            <div className="step-img2">
              <img src="market/step2.png" alt="" />
            </div>
            <h4>Buy INSTAR & ETH or WBTC</h4>
            <p>You can purchase INSTAR, ETH, and WBTC in many places</p>
          </div>
          <div className="step-content">
            <div className="step-img3">
              <img src="market/step3.png" alt="" />
            </div>
            <h4>Earn Trading Fees</h4>
            <p>Deposit INSTAR + ETH or WBTC to the liquidity pool of your choice and earn a share of fees from every trade and LP bonuses</p>
          </div>
          <div className="step-content">
            <div className="step-img4">
              <img src="market/step4.png" alt="" />
            </div>
            <h4>Get Rewarded</h4>
            <a className="learn-more" target="_blank" href="https://blog.instars.com/instarbridge-powered-by-mpc-oracles-is-now-live/">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steps