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
            <h4>CONNECT WALLET</h4>
            <p>SIMPLY CREATE OR CONNECT YOUR TORUS WALLET</p>
          </div>
          <div className="step-content">
            <div className="step-img2">
              <img src="market/step2.png" alt="" />
            </div>
            <h4>PURCHASE ETH or WBTC</h4>
            <p>PURCHASE ETH or WBTC TO START Liquidity</p>
          </div>
          <div className="step-content">
            <div className="step-img3">
              <img src="market/step3.png" alt="" />
            </div>
            <h4>EARN TRADING FEES</h4>
            <p>DEPOSIT INSTAR and ETH or WBTC TO EARN A % OF CRYPTO OFF EVERY TRADE and rewards</p>
          </div>
          <div className="step-content">
            <div className="step-img4">
              <img src="market/step4.png" alt="" />
            </div>
            <h4>GET REWARDED</h4>
            <a className="learn-more" target="_blank" href="https://blog.instars.com/instarbridge-powered-by-mpc-oracles-is-now-live/">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steps