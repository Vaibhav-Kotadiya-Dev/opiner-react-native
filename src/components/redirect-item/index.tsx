import React from 'react';
import {faUpRightFromSquare} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import CTAButton from 'components/cta-button';
import {statusColors} from 'theme/colors';
import {CTAButtonProps} from 'components/cta-button/helpers';

export interface LinkProps extends CTAButtonProps {
  isSmall?: boolean;
}

const RedirectItem = ({isSmall, iconProps, style, ...props}: LinkProps) => {
  return (
    <CTAButton
      iconRightProps={{
        icon: faUpRightFromSquare,
        size: isSmall ? rs(18) : rs(20),
        color: statusColors.info,
      }}
      iconProps={
        iconProps
          ? {
              ...iconProps,
              size: iconProps.size || (isSmall ? rs(18) : rs(20)),
            }
          : undefined
      }
      style={isSmall ? [{minHeight: undefined}, style] : style}
      {...props}
    />
  );
};

export default RedirectItem;
