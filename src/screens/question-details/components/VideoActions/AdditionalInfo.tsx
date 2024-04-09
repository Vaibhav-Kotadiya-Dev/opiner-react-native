import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Question} from 'network/data/Question';
import useThemeContext from 'hooks/useThemeContext';
import AppText from 'components/app-text';
import tailwindColors from 'theme/tailwindColors';
import {rs} from 'utils/ResponsiveScreen';

const {slate} = tailwindColors;

const styles = StyleSheet.create({
  container: {
    padding: rs(16),
    borderRadius: 6,
    marginTop: rs(16),
  },
  title: {fontWeight: 'bold'},
  description: {fontWeight: 'normal'},
});

interface QuestionDetailExtraInfoProps {
  question: Question;
}

const QuestionDetailExtraInfo = ({question}: QuestionDetailExtraInfoProps) => {
  const {theme} = useThemeContext();
  const isDark = theme.name === 'Dark';
  const {
    socialMediaConsentRequired,
    showOtherResponses,
    companyName,
  } = question;

  if (!socialMediaConsentRequired && !showOtherResponses) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? slate[800] : slate[200]},
      ]}>
      {socialMediaConsentRequired && (
        <>
          <AppText size="small" style={styles.title}>
            Additional usage request
          </AppText>
          <AppText size="small" style={styles.description}>
            {companyName} requests permission to share your response, or part
            of, publicly (example: on social media).
          </AppText>
        </>
      )}
      {true && (
        <>
          <AppText
            size="small"
            style={[
              styles.title,
              socialMediaConsentRequired && {marginTop: rs(6)},
            ]}>
            Response visible to peers
          </AppText>
          <AppText size="small" style={styles.description}>
            Your response will be visible to others answering this question.
          </AppText>
        </>
      )}
    </View>
  );
};

export default QuestionDetailExtraInfo;
