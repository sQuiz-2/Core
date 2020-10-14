import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

import request from './request';

export async function uploadFile(
  document: DocumentPicker.DocumentResult,
  answers: { answer: string }[],
  selectedTheme: number,
  description: string
) {
  if (document.type !== 'success') return;
  const bodyFormData = new FormData();
  if (Platform.OS === 'web' && document.output) {
    bodyFormData.append('file', document.output[0]);
  } else if (document.uri) {
    bodyFormData.append('file', {
      // @ts-ignore
      uri: document.uri,
      name: document.name,
      type: 'audio/mpeg',
    });
  }
  bodyFormData.append('answers', JSON.stringify(answers));
  // @ts-ignore
  bodyFormData.append('theme_id', selectedTheme);
  bodyFormData.append('description', description);
  try {
    await request('rounds', { method: 'POST', body: bodyFormData });
  } catch (e) {
    throw e;
  }
}
