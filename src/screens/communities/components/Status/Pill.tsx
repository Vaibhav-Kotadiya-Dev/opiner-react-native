import React from 'react';

import StatusPill, {
  StatusPillProps,
  StatusPillType,
} from 'components/status-pill';
import {CommunityResponseStatusType} from 'network/data/Community';

const getPillTypeByCommunityStatus = (
  status: CommunityResponseStatusType,
): StatusPillType => {
  switch (status) {
    case 'Pending review':
      return 'info';
    case 'Active':
      return 'success';
    case 'Paused':
      return 'warning';
    case 'Deleted':
      return 'danger';
    default:
      return 'info';
  }
};

const CommunityStatusPill = (
  props: Partial<StatusPillProps> & {
    status: CommunityResponseStatusType;
  },
) => {
  if (props.status === 'None') {
    return null;
  }
  return (
    <StatusPill type={getPillTypeByCommunityStatus(props.status)} {...props} />
  );
};

export default CommunityStatusPill;
