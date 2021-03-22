import React from 'react'
import './style.scss'

function UniswapContainer() {
  return (
    <div className="uniswap-container" id="uniswap-container">
      <div className="container">
        <h2>
          <img src="market/uniswap.png" alt="" />
          UNISWAP
        </h2>
        <h3>Buy INSTAR with Uniswap</h3>
        <div className="swap-forms">
          <iframe
            src="https://app.uniswap.org/#/swap?inputCurrency=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&outputCurrency=0x8193711b2763bc7dfd67da0d6c8c26642eafdaf3"
            height="660px"
            width="100%"
            css={`
              border: 0;
              margin: 0 auto;
              display: block;
              border-radius: 10px;
              max-width: 600px;
              min-width: 300px;
            `}
            id="myId"
          ></iframe>
          <iframe
            src="https://app.uniswap.org/#/swap?inputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&outputCurrency=0x8193711b2763bc7dfd67da0d6c8c26642eafdaf3"
            height="660px"
            width="100%"
            css={`
              border: 0;
              margin: 0 auto;
              display: block;
              border-radius: 10px;
              max-width: 600px;
              min-width: 300px;
            `}
            id="myId"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default UniswapContainer
