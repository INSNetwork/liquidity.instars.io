import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { OverlayTrigger, Popover } from 'react-bootstrap'

function DropdownComponent({ dropdownPlacement, dropdownPopoverStyles, options, onOptionClick }) {
  const overlayRef = useRef()
  const handleDropdownOptionClick = useCallback(data => {
    overlayRef.current.handleHide()
    onOptionClick(data)
  }, [])

  return (
    <div css={`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `}>
      <OverlayTrigger
        ref={overlayRef}
        trigger="click"
        rootClose
        placement={dropdownPlacement}
        overlay={
          <StyledPopover css={dropdownPopoverStyles} >
            <div>
              {options.map((item, index) => {
                return <div
                  key={index}
                  onClick={ () => handleDropdownOptionClick(item) }
                  css={`
                    border-radius: 4px;
                    opacity: 0.5;
                    padding: 0.625rem 0.5rem;
                    text-align: left;

                    &:hover {
                      background-color: rgba(255, 255, 255, 0.1);
                      opacity: 1;
                      cursor: pointer;
                    }
                  `}
                >
                  {item.title}
                </div>
              })}
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
        />
      </OverlayTrigger>
    </div>
  )
}

const StyledPopover = styled(Popover)`
  position: absolute;
  background: #4c5585;
  border-radius: 4px;
  box-shadow: 0 9px 46px rgba(#000000, 0.12), 0 24px 38px rgba(#000000, 0.14), 0 20px 80px rgba(#000000, 0.25);
  font-size: 12px;
  line-height: 20px;
  color: #FFFFFF;
  min-width: 11.25rem;
  padding: 8px;

  &.bs-popover-bottom .arrow::after {
    border-bottom-color: #f9fafc;
  }
  &.bs-popover-bottom .arrow::before {
    border-bottom-color: transparent;
  }
`

export default DropdownComponent
