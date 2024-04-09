import React, {useLayoutEffect, useRef, useState} from 'react';
import {Image, StyleProp} from 'react-native';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';

let ratio: number;

interface AspectRatioPreservedImageProps
  extends Omit<FastImageProps, 'source'> {
  uri: string;
  style: StyleProp<ImageStyle>;
  fallbackUri?: string | null;
}

const AspectRatioPreservedImage = ({
  uri,
  style,
  fallbackUri,
  ...rest
}: AspectRatioPreservedImageProps) => {
  const [aspectRatio, setAspectRatio] = useState<number>(ratio ?? 1);
  const [isBusy, setBusy] = useState(true);
  const unmounted = useRef(false);
  const [currentUri, setCurrentUri] = useState(uri);

  useLayoutEffect(() => {
    if (!currentUri || unmounted.current) {
      return;
    }
    Image.getSize(
      currentUri,
      (width, height) => {
        const calculated = width / height;
        if (!isNaN(calculated) && !unmounted.current) {
          ratio = calculated;
          setAspectRatio(calculated);
        }
        setBusy(false);
      },
      () => {
        !unmounted.current && setBusy(false);
      },
    );
    return () => {
      unmounted.current = true;
    };
  }, [currentUri]);

  if (isBusy) {
    return null;
  }

  return (
    <FastImage
      {...rest}
      source={{uri: currentUri}}
      style={[{aspectRatio}, style]}
      onError={() => {
        if (fallbackUri && fallbackUri !== currentUri) {
          setCurrentUri(fallbackUri);
        }
      }}
    />
  );
};

export default AspectRatioPreservedImage;
