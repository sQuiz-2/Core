import React from 'react';
import { View, Image, ScrollView, Pressable, Platform, Linking } from 'react-native';

import useStreamsStyle from './StreamStyle';

type StreamsProps = {
  streams: string[];
};

export default function Streams({ streams }: StreamsProps) {
  const styles = useStreamsStyle();

  function openStream(stream: string) {
    if (Platform.OS === 'web') {
      window.open('https://www.twitch.tv/' + stream, '_blank');
    } else {
      Linking.openURL('https://www.twitch.tv/' + stream);
    }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.streamsContainer}>
        {streams.map((stream) => (
          <View key={stream} style={styles.streamCard}>
            <Pressable onPress={() => openStream(stream)}>
              <Image
                source={{
                  uri: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.toLocaleLowerCase()}-330x186.jpg`,
                }}
                style={styles.image}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
