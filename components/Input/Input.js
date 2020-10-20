import React, { useState, useEffect, useCallback, useRef } from 'react'
import uniswapSvg from './assets/uniswap.svg'

const noop = () => {}

function Input({
  disabled = true,
  inputValue,
  onBlur = noop,
  onChange = noop,
  onFocus = noop,
  onMax = noop,
  placeholder = 'Enter UNI-V2 Amount',
}) {
  const [opened, setOpened] = useState(false)
  const buttonRef = useRef()
  const menuRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    if (opened && menuRef.current) {
      menuRef.current.focus()
    }
  }, [opened])

  const handleButtonClick = useCallback(() => {
    setOpened(isOpen => !isOpen)
  }, [])

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div
        css={`
          position: relative;
          z-index: 1;
          width: 100%;
          height: 64px;
          margin: 12px 0 20px 0;
          display: flex;
          padding: 0;
          opacity: 1;
        `}
      >
        <input
          disabled={disabled}
          ref={inputRef}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          value={!disabled ? inputValue : ''}
          css={`
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 64px;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px 95px 20px 16px;
            color: rgba(255, 255, 255, 0.2);
            box-sizing: border-box;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            appearance: none;
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
            }
            -moz-appearance: textfield;

            @media (max-width: 640px) {
              font-size: 14px !important;
            }

            ${!disabled ? `
            &:hover {
              border: 1px solid rgba(255, 255, 255, 0.5);
              &:focus {
                border-color: #47bda4;
              }
              &::placeholder {
                color: #ffffff;
                opacity: 0.5;
              }
            }` : ''}
            ${inputValue ? `
              outline: none;
              font-family: 'Roboto Mono';
              font-style: normal;
              font-weight: normal;
              font-size: 28px;
              line-height: 36px;
              color: #ffffff;
              border-color: #47bda4;
              caret-color: #47bda4;
               &::placeholder {
                visibility: hidden;
               }
            `: ''}
            &:focus {
              outline: none;
              font-family: 'Roboto Mono';
              font-style: normal;
              font-weight: normal;
              font-size: 28px;
              line-height: 36px;
              color: #ffffff;
              border-color: #47bda4;
              caret-color: #47bda4;
               &::placeholder {
                visibility: hidden;
               }
            }
            &::placeholder {
              color: #ffffff;
              opacity: 0.2;
            }
            &:invalid {
              box-shadow: none;
            }
          `}
        />
        <DropdownButton
          disabled={disabled}
          ref={buttonRef}
          onClick={handleButtonClick}
          onMax={onMax}
          opened={opened}
        />
      </div>
    </div>
  )
}

const DropdownButton = React.forwardRef(function DropdownButton(
  { disabled, onMax, onClick },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      type="button"
      css={`
        position: absolute;
        right: 0;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64px;
        width: 150px;
        padding: 0 0 0 10px;
        color: #212b36;
        background: transparent;
        border-width: 0;
        outline: 0;
        transition: none;
        cursor: pointer;
        ${disabled &&
          `
          cursor: auto;
        `}
        &::-moz-focus-inner {
          border: 0;
        }
        &:focus {
          outline: 0;
        }
        &:focus:after {
          content: '';
        }
      `}
    >
      <div
        onClick={disabled ? undefined : onMax}
        css={`
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          position: absolute;
          right: 0;
          margin-right: 12px;
          &:active {
            ${disabled ? 'top: 0px' : ''};
          }
          &:hover {
            ${disabled ? '' : 'background: rgba(255, 255, 255, 0.2)'};
          }
        `}
      >
        <Adornment disabled={disabled} />
      </div>
    </button>
  )
})

function Adornment({ disabled}) {
  return (
    <div
      css={`
        padding: 8px 11.225px;
        opacity: ${disabled ? '0.2' : '1'};
      `}
    >
      <img src={uniswapSvg} alt="Token Logo" width={20.4} css={`margin-top: -3px;`} />
      <span css={`
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
        padding-left: 10px;
       `}
      >Max</span>
    </div>
  )
}

export default Input
