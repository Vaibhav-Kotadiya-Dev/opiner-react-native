import {useRef} from 'react';
import {useSelector} from 'react-redux';

import useLogout from 'hooks/useLogout';
import useUpdateUserProfile from 'hooks/useUpdateUserProfile';

import {AppState} from 'store/rootReducer';
import {UserStatus} from 'network/data/User';
import {showConfirmationModal} from 'utils/index';

const useAccountManagement = () => {
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const {emailAlert, newsletterSubscription} = user;
  const busyRef = useRef<'pause' | 'resume' | 'delete'>();
  const {logout} = useLogout();

  const {isBusy, handleUpdateProfile} = useUpdateUserProfile();

  const handleUpdateCommsManagement = async (
    update: Partial<{
      emailAlert: boolean;
      newsletterSubscription: boolean;
    }>,
  ) => {
    await handleUpdateProfile({
      method: 'savecommsmanagement',
      data: {
        emailAlert,
        newsletterSubscription,
        ...update,
      },
    });
  };

  const handlePause = () => {
    const pauseAccount = async () => {
      busyRef.current = 'pause';
      await handleUpdateProfile({
        method: 'pause',
        data: {userStatus: UserStatus.Paused},
        successMessageProps: {
          message: 'Account paused',
          description:
            'Your account has been paused. You can always resume your account by clicking the resume button.',
        },
      });
      busyRef.current = undefined;
    };

    showConfirmationModal({
      title: 'Pause your account',
      description:
        'Your account will be paused and you wont receive new questions until you unpause it. You will continue to have access to the app and previous questions.',
      buttonTitle: 'Pause account',
      cancelButtonTitle: 'Back',
      onConfirm: pauseAccount,
    });
  };

  const handleResume = () => {
    const resumeAccount = async () => {
      busyRef.current = 'resume';
      await handleUpdateProfile({
        method: 'resume',
        data: {userStatus: UserStatus.Normal},
        successMessageProps: {
          message: 'Account resumed',
          description:
            'Your account has been resumed. You will continue receiving new questions in the app.',
        },
      });
      busyRef.current = undefined;
    };

    showConfirmationModal({
      title: 'Resume your account',
      description:
        'Your account will be resumed and you will receive new questions.',
      buttonTitle: 'Resume account',
      cancelButtonTitle: 'Back',
      onConfirm: resumeAccount,
    });
  };

  const handleDelete = () => {
    const deleteAccount = async () => {
      busyRef.current = 'delete';
      await handleUpdateProfile({
        method: 'delete',
        data: {userStatus: UserStatus.Deleted},
      });
      busyRef.current = undefined;
      logout();
    };

    showConfirmationModal({
      title: 'Delete your account',
      description:
        'Your account will be permanently deleted. This cannot be undone.',
      buttonTitle: 'Delete account',
      cancelButtonTitle: 'Back',
      onConfirm: deleteAccount,
    });
  };

  return {
    handleUpdateCommsManagement,
    handlePause,
    handleDelete,
    handleResume,
    isPausing: isBusy && busyRef.current === 'pause',
    isResuming: isBusy && busyRef.current === 'resume',
    isDeleting: isBusy && busyRef.current === 'delete',
  };
};

export default useAccountManagement;
