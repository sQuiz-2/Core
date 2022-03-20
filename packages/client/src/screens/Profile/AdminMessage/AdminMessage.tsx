import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { post } from '@Src/utils/wrappedFetch';
import React, { useState } from 'react';
import { Pressable, View, TextInput } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './AdminMessageStyle';

export default function AdminMessage() {
  const user = useRecoilValue(userState);
  const [message, setMessage] = useState('');

  function sendMessage() {
    if (!user.token) return;
    try {
      post({ path: 'send-message', token: user.token, body: { message } });
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text fontSize="md">Envoyer un message aux joueurs en ligne:</Text>
      <TextInput style={styles.input} value={message} onChangeText={setMessage} />
      <Pressable style={styles.sendButton} onPress={sendMessage}>
        <Text>Envoyer</Text>
      </Pressable>
    </View>
  );
}
