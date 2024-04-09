import IUser, {UserStatus} from 'network/data/User';

export type UserStatusTextType =
  | 'Paused'
  | 'Deleted'
  | 'Disabled'
  | 'Unverified'
  | 'Waiting List'
  | 'Active'
  | 'Retired'
  | 'On Hold';

export const getUserStatusText = (status: UserStatus): UserStatusTextType => {
  switch (status) {
    case UserStatus.Paused:
      return 'Paused';
    case UserStatus.Deleted:
      return 'Deleted';
    case UserStatus.Disabled:
      return 'Disabled';
    case UserStatus.Unverified:
      return 'Unverified';
    case UserStatus.WaitingList:
      return 'Waiting List';
    case UserStatus.Normal:
      return 'Active';
    case UserStatus.Retired:
      return 'Retired';
    case UserStatus.OnHold:
      return 'On Hold';
  }
};

export const getStatusPillTypeByUserStatus = (status: UserStatus) => {
  switch (status) {
    case UserStatus.Paused:
      return 'warning';
    case UserStatus.Deleted:
      return 'danger';
    case UserStatus.Disabled:
      return 'danger';
    case UserStatus.Unverified:
      return 'warning';
    case UserStatus.WaitingList:
      return 'info';
    case UserStatus.Normal:
      return 'success';
    case UserStatus.Retired:
      return 'info';
    case UserStatus.OnHold:
      return 'info';
  }
};

export const getUserHasSocialLinks = (user: IUser) =>
  Boolean(user.linkedIn) || Boolean(user.instagram) || Boolean(user.twitter);
