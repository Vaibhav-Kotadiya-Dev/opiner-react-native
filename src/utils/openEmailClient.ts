import {Alert, Linking} from 'react-native';

const openEmailClient = async ({
  body,
  subject,
  to = '',
}: {
  body: string;
  subject: string;
  to?: string;
}) => {
  try {
    await Linking.openURL(
      `mailto:${to}?subject=${encodeURIComponent(
        subject || '',
      )}&body=${encodeURIComponent(body || '')}`,
    );
  } catch (e) {
    Alert.alert('Error', 'Unable to open email client ' + (e as Error).message);
  }
};

export default openEmailClient;
