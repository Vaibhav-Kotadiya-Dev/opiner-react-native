import React, {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';

import {Container} from 'components';
import {rs} from 'utils/ResponsiveScreen';
import ProgressBar from 'components/ProgressBar';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rs(30),
    paddingTop: rs(256),
  },
  title: {
    marginTop: rs(8),
    fontSize: rs(24),
  },
});

const BusyView = ({
  title,
  progress = 0,
  step,
  size,
}: {
  title: string;
  progress?: number;
  step: number;
  size?: number;
}): ReactElement => {
  const {theme} = useThemeContext();
  const {top} = useSafeAreaInsets();
  return (
    <Container>
      <View style={styles.container}>
        <AppText size="extraSmall" style={{color: theme.colors.secondaryText}}>
          Step {step} of 2
        </AppText>
        <AppText size="h1" style={styles.title}>
          {title}
        </AppText>
        <ProgressBar size={size} progress={progress} />
      </View>
    </Container>
  );
};

export default BusyView;
