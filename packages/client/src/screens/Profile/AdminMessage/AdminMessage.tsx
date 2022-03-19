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
      <Text fontSize="md">Envoyer un message au joueurs en ligne:</Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 4,
          marginVertical: 10,
        }}
        value={message}
        onChangeText={setMessage}
      />
      <Pressable onPress={sendMessage}>
        <Text>Envoyer</Text>
      </Pressable>
    </View>
  );
}
