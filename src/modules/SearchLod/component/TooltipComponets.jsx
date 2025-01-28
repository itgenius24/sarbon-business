import { CeckStatusIcon, ClockIconStatus } from '@/assets/icons/icons'
import { Tooltip } from '@chakra-ui/react'
import React from 'react'

const TooltipComponets = ({cls,label,color,status}) => {
  return (
    <Tooltip
        borderRadius={`4px`}
        background={color}
        placement="top-start"
        padding={`7px 9px`}
        hasArrow
        label={label}
      >
        <div className={cls.statusWrap} style={{ borderColor: `${color} transparent transparent transparent`}}>
          <div className={cls.icon}>
           {
            status === `check` ? <CeckStatusIcon /> : <ClockIconStatus />
           }
            
          </div>
        </div>
      </Tooltip>
  )
}

export default TooltipComponets