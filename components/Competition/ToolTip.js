import { Button, Tooltip } from '@mantine/core'
import React from 'react'

const ToolTipCustome = ({text}) => {
  return (
          <Tooltip
          multiline
          width={220}
          withArrow
          transition="fade"
          transitionDuration={200}
          label={text}
        >
          <Button >
            {" "}
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M7.75259 0.772461C3.52441 0.772461 0.0800781 4.21679 0.0800781 8.44497C0.0800781 12.6732 3.52441 16.1175 7.75259 16.1175C11.9808 16.1175 15.4251 12.6732 15.4251 8.44497C15.4251 4.21679 11.9808 0.772461 7.75259 0.772461ZM7.75259 1.95285C11.3445 1.95285 14.2447 4.85309 14.2447 8.44497C14.2447 12.0369 11.3445 14.9371 7.75259 14.9371C4.16071 14.9371 1.26046 12.0369 1.26046 8.44497C1.26046 4.85309 4.16071 1.95285 7.75259 1.95285ZM7.1624 4.31362V5.49401H8.34279V4.31362H7.1624ZM7.1624 6.67439V12.5763H8.34279V6.67439H7.1624Z"
                fill="#2525BB"
              />
            </svg>
          </Button>
        </Tooltip>
  )
}

export default ToolTipCustome