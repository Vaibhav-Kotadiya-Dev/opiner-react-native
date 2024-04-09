import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/pro-solid-svg-icons';

import {rs} from 'utils/ResponsiveScreen';
import AppText from 'components/app-text';
import useThemeContext from 'hooks/useThemeContext';

const styles = StyleSheet.create({
  container: {marginTop: rs(24), paddingHorizontal: 16},
  title: {
    marginBottom: rs(8),
  },
  note: {
    flexDirection: 'row',
    marginBottom: rs(8),
  },
  dot: {
    marginEnd: rs(12),
    marginTop: rs(12),
  },
});

const defaultNotes = [
  'Find somewhere quiet and well lit',
  'Start with your first name and location',
  'Video can be reviewed before upload',
  'There are no right or wrong answers',
];

interface NoteViewProps {
  notes?: string[];
  title?: string;
  color?: string;
}

const NoteView = ({notes = defaultNotes, color, title}: NoteViewProps) => {
  const {theme} = useThemeContext();
  const textStyle = {color: color ?? theme.colors.text};
  return (
    <View style={styles.container}>
      {title !== undefined && (
        <AppText size="h4" style={[styles.title, textStyle]}>
          {title}
        </AppText>
      )}
      {notes.map((note, index) => (
        <View key={`note_${index}`} style={styles.note}>
          <FontAwesomeIcon
            color={textStyle.color}
            size={4}
            icon={faCircle}
            style={styles.dot}
          />
          <AppText style={textStyle}>{note}</AppText>
        </View>
      ))}
    </View>
  );
};

export default NoteView;
