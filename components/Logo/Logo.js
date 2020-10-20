import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTransition, animated } from 'react-spring'

import logo from './logo.svg'
import logoAnt from './logo-ant.svg'
import logoAnj from './logo-anj.svg'
import uniswapSvg from '../Input/assets/uniswap.svg'
import logoInstar from './logo-instars.svg'

function getImage(mode) {
  if (mode === 'instar') {
    return logoInstar
  }
  if (mode === 'ant') {
    return logoAnt
  }
  if (mode === 'anj') {
    return logoAnj
  }
  if (mode === 'uni') {
    return uniswapSvg
  }
  return logo
}

function getOpacity(mode) {
  return { opacity: mode === 'instar' ? 1 : 0.5 }
}

function Logo({
  label = 'Instars Liquidity Rewards',
  onClick = () => {},
  mode = 'normal',
  mini = false,
}) {
  // Don’t animate initially
  const animate = useRef(false)
  useEffect(() => {
    animate.current = true
  }, [])

  const modeTransition = useTransition(mode, null, {
    immediate: !animate.current,
    from: { opacity: 0 },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
    config: {
      mass: 0.1,
      tension: 120,
      friction: 14,
    },
  })

  return (
    <button
      onClick={onClick}
      css={`
        position: relative;
        display: flex;
        width: 64px;
        min-width: 64px;
        height: 64px;
        padding: 0;
        white-space: nowrap;
        border: 0;
        cursor: pointer;
        outline: 0 !important;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        overflow: hidden;
        &::-moz-focus-inner {
          border: 0;
        }
        &:active {
          transform: translateY(1px);
        }
        ${mini &&
          `
          width: 32px;
          height: 32px;
        `}
      `}
    >
      {modeTransition.map(({ item: mode, key }) => (
        <animated.img
          key={key}
          alt={label}
          src={getImage(mode)}
          style={getOpacity(mode)}
          css={`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        />
      ))}
    </button>
  )
}

Logo.propTypes = {
  label: PropTypes.string,
  mode: PropTypes.oneOf(['instar', 'ant', 'anj', 'normal', 'uni']),
  onClick: PropTypes.func,
}

export default Logo
