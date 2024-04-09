import React, {useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import useThemeContext from 'hooks/useThemeContext';
import IconTitle, {IconTitleProps} from 'components/icon-title';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rs(30),
    borderBottomWidth: rs(1),
    marginBottom: rs(6),
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rs(24),
  },
  line: {
    width: 4,
    height: '100%',
    marginLeft: rs(4),
  },
  details: {
    paddingLeft: rs(24),
    flex: 1,
  },
});

export interface ExpanderProps extends IconTitleProps {
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}
const Expander = ({
  title,
  children,
  defaultExpanded = false,
}: ExpanderProps) => {
  const {theme} = useThemeContext();
  const [showContent, setShowContent] = useState(defaultExpanded);

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowContent(!showContent);
        }}
        activeOpacity={0.85}
      >
        <IconTitle
          title={title}
          titleStyle={{color: theme.colors.accent}}
          iconProps={{
            icon: showContent ? faCaretDown : faCaretRight,
            color: theme.colors.accent,
          }}
          style={{paddingVertical: rs(26)}}
        />
      </TouchableOpacity>

      {showContent && (
        <View style={styles.detailContainer}>
          <View style={[styles.line, {backgroundColor: theme.colors.border}]} />
          <View style={styles.details}>{children}</View>
        </View>
      )}
    </View>
  );
};

export default Expander;
