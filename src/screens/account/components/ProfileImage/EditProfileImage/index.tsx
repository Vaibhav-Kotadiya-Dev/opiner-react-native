import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {faCamera, faFileArrowUp} from '@fortawesome/pro-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker, {PickerErrorCode} from 'react-native-image-crop-picker';
import {RNCamera} from 'react-native-camera';

import Color from 'assets/colors';
import {rs, wp} from 'utils/ResponsiveScreen';
import {Container} from 'components/index';
import {AppState} from 'store/rootReducer';
import {ACCESS_TOKEN} from 'appConstants';
import ThemedButton from 'components/themed-button';
import {reportToRaygun} from 'utils/Raygun';
import Toast from 'utils/Toast';
import {useMainNavigation} from 'hooks/useNavigationHooks';
import uploadImageBackground from '../UploadImage';
import {Constant} from 'screens/upload/utils';
import {getUserProfile, updateUserProfile} from 'store/profile/actions';
import OpinerContent from 'network/methods/OpinerContent';
import ProfileImage from '../index';

const profileImageSize = wp(100) - rs(88);

const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: rs(44),
    marginTop: rs(44),
    marginBottom: rs(16),
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize / 2,
    overflow: 'hidden',
    backgroundColor: Color.Background.Light + '50',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    paddingHorizontal: rs(30),
  },
  camera: {
    alignSelf: 'center',
    width: profileImageSize,
    height: profileImageSize,
  },
});

type EditorState = 'capturing' | 'uploading';

const EditProfileImageScreen = () => {
  const {data: user} = useSelector((state: AppState) => state.userProfile);
  const cameraRef = useRef<RNCamera>(null);
  const navigation = useMainNavigation();
  const dispatch = useDispatch();

  const [token, setToken] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [updatedImage, setUpdatedImage] = useState<{
    isCamera?: boolean;
    uri: string | null;
  }>({uri: null, isCamera: false});
  const updatedImageSource = updatedImage.uri;

  useEffect(() => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(x => {
      if (x) {
        setToken(x);
      }
    });
  }, []);

  if (!user) {
    return null;
  }

  const resetState = () => {
    setIsEditMode(false);
    setUpdatedImage({uri: null});
    setEditorState(null);
  };

  const handleImagePicker = async (isCamera: boolean = false) => {
    const method = isCamera ? 'openCamera' : 'openPicker';
    try {
      const {path} = await ImageCropPicker[method]({
        width: 640,
        height: 640,
        cropping: true,
        showCropGuidelines: true,
        useFrontCamera: true,
      });
      setUpdatedImage({uri: path, isCamera});
      return path;
    } catch (error: any) {
      if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
        Toast.show({
          message:
            (error.code as PickerErrorCode) === 'E_NO_LIBRARY_PERMISSION'
              ? 'Photo library access is disabled'
              : error.message,
          type: 'danger',
        });
      }
      reportToRaygun(error, 'Error while picking image: handleImagePicker');
      if (!isCamera) {
        return;
      }
      Toast.show({
        type: 'danger',
        message: 'Upload failed!',
        description:
          'Error ocurred while trying to open camera. Make sure camera is not used by other apps. ' +
          error?.message,
      });
      return undefined;
    }
  };

  const handleImageCapture = () => {
    if (updatedImageSource) {
      setUpdatedImage({uri: null});
      return;
    }
    // setEditorState('capturing');
    cameraRef.current
      ?.takePictureAsync({
        fixOrientation: true,
        mirrorImage: true,
        forceUpOrientation: true,
        width: 640,
      })
      .then(response => {
        if (response.width !== response.height) {
          ImageCropPicker.openCropper({
            path: response.uri,
            width: 640,
            height: 640,
            cropping: true,
            showCropGuidelines: true,
            mediaType: 'photo',
          }).then(croppedImage => {
            setUpdatedImage({uri: croppedImage.path, isCamera: true});
          });
        } else {
          setUpdatedImage({uri: response.uri, isCamera: true});
        }
      })
      .catch(error => {
        Toast.show({
          type: 'danger',
          message: 'Capturing image failed!',
          description: error.message,
        });
        reportToRaygun(error, 'Capturing image');
      })
      .finally(() => {
        // setEditorState(null);
      });
  };

  const handleUpload = () => {
    if (!updatedImageSource) {
      return;
    }
    setEditorState('uploading');
    let imagePath = updatedImageSource.replace('file://', '');
    if (Constant.isIOS) {
      imagePath = `file://${imagePath}`;
    }
    uploadImageBackground({
      imagePath,
      token,
      onComplete: () => {
        setEditorState(null);
        setIsEditMode(false);
        dispatch(
          updateUserProfile({
            ...user,
            modified: new Date().toISOString(),
          }),
        );
        dispatch(getUserProfile());
      },
    });
  };

  const userProfileImage = OpinerContent.getCDNImageURL(user.cdnThumbUrlLarge);
  const imageSource = updatedImageSource || userProfileImage;

  return (
    <Container>
      <ScrollView>
        {Boolean(updatedImageSource) || !isEditMode ? (
          <ProfileImage
            key="profileImage"
            source={imageSource}
            hidePlusIcon
            size={profileImageSize}
          />
        ) : (
          <View style={styles.imageContainer}>
            <RNCamera
              key="camera"
              ref={cameraRef}
              type={RNCamera.Constants.Type.front}
              style={styles.camera}
              androidCameraPermissionOptions={{
                message: 'We need your camera access to continue',
                title: 'Camera use permission',
              }}
            />
          </View>
        )}
        <View style={styles.actions}>
          {isEditMode ? (
            <>
              {!updatedImage.isCamera && (
                <ThemedButton
                  title="Take photo"
                  iconLeft={faCamera}
                  type="danger"
                  onPress={handleImageCapture}
                />
              )}
              {Boolean(updatedImageSource) && (
                <ThemedButton
                  title="Save"
                  onPress={handleUpload}
                  isBusy={editorState === 'uploading'}
                  disabled={editorState === 'uploading'}
                />
              )}
              <ThemedButton
                title="Cancel"
                type="secondary"
                onPress={() => resetState()}
              />
              <ThemedButton
                iconLeft={faFileArrowUp}
                containerStyle={{marginVertical: rs(12)}}
                title="Select from device"
                type="hollow"
                onPress={() => {
                  handleImagePicker(false);
                }}
              />
            </>
          ) : (
            <>
              <ThemedButton
                title="Add photo"
                onPress={() => {
                  setIsEditMode(true);
                  setUpdatedImage({...updatedImage, isCamera: false});
                }}
              />
              <ThemedButton
                title="Cancel"
                type="secondary"
                onPress={() => navigation.goBack()}
              />
            </>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default EditProfileImageScreen;
