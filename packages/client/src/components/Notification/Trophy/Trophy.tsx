import React from 'react';
import { View } from 'react-native';

import Text from '../../Text';
import Notification from '../Notification';
import useTrophyStyle from './TrophyStyle';

type NotificationProps = {
  title: string;
  description: string;
  duration: number | undefined;
};

export default function TrophyNotification({ title, description, duration }: NotificationProps) {
  const styles = useTrophyStyle();

  return (
    <Notification
      duration={duration}
      title="NOUVEAU TROPHÉE DÉBLOQUÉ !"
      image={require('@Assets/images/trophy.png')}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} fontSize="sm">
          {description}
        </Text>
      </View>
    </Notification>
  );
}
