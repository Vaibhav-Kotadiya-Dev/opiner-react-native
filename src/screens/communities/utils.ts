import {CommunityResponseStatusType, ICommunity} from 'network/data/Community';
import {getConfig} from 'network/OpinerApi';

export enum LinkResponderCommunityStatus {
  Deleted = 0,
  None,
  Pending,
  Paused,
  Approved,
}

export const getCommunityStatus = (
  status: LinkResponderCommunityStatus,
): CommunityResponseStatusType => {
  switch (status) {
    case LinkResponderCommunityStatus.Deleted:
      return 'Deleted';
    case LinkResponderCommunityStatus.None:
      return 'None';
    case LinkResponderCommunityStatus.Pending:
      return 'Pending review';
    case LinkResponderCommunityStatus.Paused:
      return 'Paused';
    case LinkResponderCommunityStatus.Approved:
      return 'Active';
    default:
      return 'None';
  }
};

export const getCommunityResourceUrl = (
  type: 'logo' | 'header' | 'background' | 'terms',
  id: number,
) =>
  // TODO: Change this for other configs
  `${getConfig().ASSETS_URL}assets/gfx/community/${id}/${type}.${
    type === 'terms' ? 'pdf' : 'jpg'
  }`;

export const getUserHasJoinedCommunity = (community: ICommunity) => {
  const status = getCommunityStatus(community.linkResponderCommunityStatus);
  return !['None', 'Deleted'].includes(status);
};

export const getCommunityTermsUrl = (community: ICommunity) =>
  `${getConfig().ASSETS_URL}x/${community.url}/terms`;
