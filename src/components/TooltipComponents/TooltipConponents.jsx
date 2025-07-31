
import { Tooltip } from "@chakra-ui/react";
import React from "react";

const TooltipComponents = ({ label,children }) => {
  return (
    <Tooltip
      boxShadow={`none`}
      hasArrow
      placement="top"
      fontWeight={400}
      fontSize={`14px`}
      background={`rgba(219, 216, 227, 1)`}
      borderRadius={`4px`}
      color={`black`}
      textAlign={`center`}
      label={label}
    >
      <div style={{ lineHeight:0 }}>
        {children}
      </div>
    </Tooltip>
  );
};

export default TooltipComponents;
