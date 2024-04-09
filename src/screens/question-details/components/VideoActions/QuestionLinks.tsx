import React from 'react';
import {Linking, View} from 'react-native';
import {faFile, faLink} from '@fortawesome/pro-solid-svg-icons';

import SectionTitle from 'components/section-title';
import {QuestionLink} from 'network/data/Question';
import RedirectItem from 'components/redirect-item';

const QuestionLinks = ({links = []}: {links?: QuestionLink[]}) => {
  if (!links.length) {
    return null;
  }
  return (
    <View>
      <SectionTitle
        title="Links"
        iconProps={{
          icon: faLink,
        }}
      />
      {links.map((link, index) => (
        <RedirectItem
          isSmall
          key={index}
          title={link.linkText}
          iconProps={{icon: faFile}}
          onPress={() => Linking.openURL(link.linkUrl).catch()}
        />
      ))}
    </View>
  );
};

export default QuestionLinks;
