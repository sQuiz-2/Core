import React from 'react';
import { View } from 'react-native';

import Text from '../../Text';
import Notification from '../Notification';
import useAlertStyle from './AlertStyle';

type AlertProps = {
  user: string;
  message: string;
  duration: number | undefined;
};

export default function AlertNotification({ user, message, duration }: AlertProps) {
  const styles = useAlertStyle();

  return (
    <Notification
      duration={duration}
      title={user + ':'}
      image={require('@Assets/images/alert.png')}
      pictureStyle={{ width: 64, height: 64 }}>
      <View style={styles.textContainer}>
        <Text fontSize="sm">{message}</Text>
      </View>
    </Notification>
  );
}
