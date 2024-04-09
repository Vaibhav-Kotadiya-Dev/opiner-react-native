import React from 'react';

import AppText from 'components/app-text';
import Expander, {ExpanderProps} from 'components/expander';

interface CommunityDetailSectionProps extends Omit<ExpanderProps, 'children'> {
  details?: string | null;
}
const CommunityDetailSection = ({
  title,
  details,
  ...rest
}: CommunityDetailSectionProps) => {
  if (!details) {
    return null;
  }

  return (
    <Expander title={title} {...rest}>
      <AppText size="h3">{details}</AppText>
    </Expander>
  );
};

export default CommunityDetailSection;
