import React from 'react'
import './style.scss'

function ExchangeContainer() {
  return (
    <div className="exchange-container">
      <div className="container">
        <h2 className="top-title">Transfer and Store INSTAR Tokens</h2>
        <p className="top-desc">
          Store your INSTAR in metamask or send them to INSTAR Blockchain
          Mainnet and put them to use. Learn How
        </p>
        <div className="exchanges top-exchanges">
          <a className="exchange" href="https://instars.com/">
            <img src="market/instars.png" alt="" />
          </a>
          <a className="exchange" href="https://greymass.com/en/anchor/">
            <img src="market/anchor.png" alt="" />
          </a>
          <a className="exchange" href="https://get-scatter.com/">
            <img src="market/scatter.png" alt="" />
          </a>
          <a className="exchange" href="https://metamask.io/">
            <img src="market/metamask1.png" alt="" />
          </a>
        </div>
        <h2>Buy INSTAR with Centralized Exchanges</h2>
        <p>Buy INSTAR Mainnet tokens with centralized exchanges</p>
        <div className="exchanges">
          <a
            className="exchange"
            href="https://global.bittrex.com/Market/Index?MarketName=BTC-INSTAR"
          >
            <img src="market/bittrex.png" alt="" />
          </a>
          <a className="exchange" href="https://www.bibox.com/">
            <img src="market/bibox.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ExchangeContainer
