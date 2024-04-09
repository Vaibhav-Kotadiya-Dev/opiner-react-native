import {ProcessingStatus, ProcessingType} from 'utils/VideoStateStore';

interface StatusAction {
  status: ProcessingStatus;
  action: ProcessingType;
}

const isUploading = ({status, action}: StatusAction): boolean => {
  return (
    status === ProcessingStatus.Processing &&
    action === ProcessingType.Uploading
  );
};

const hasUploadFailed = ({status, action}: StatusAction): boolean => {
  return (
    status === ProcessingStatus.Failed && action === ProcessingType.Uploading
  );
};

const hasUploadCompleted = ({status, action}: StatusAction): boolean => {
  return (
    status === ProcessingStatus.Success && action === ProcessingType.Uploading
  );
};

const isCompressing = ({status, action}: StatusAction): boolean => {
  return (
    status === ProcessingStatus.Processing &&
    action === ProcessingType.Compressing
  );
};

const hasCompressFailed = ({status, action}: StatusAction): boolean => {
  return (
    status === ProcessingStatus.Failed && action === ProcessingType.Compressing
  );
};

const hasCompressCompleted = ({status, action}: StatusAction): boolean => {
  return (
    status === ProcessingStatus.Success && action === ProcessingType.Compressing
  );
};

export {
  isCompressing,
  hasCompressCompleted,
  hasCompressFailed,
  isUploading,
  hasUploadCompleted,
  hasUploadFailed,
};
