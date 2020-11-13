import { TitleCard } from '@Src/components/Card';
import React from 'react';
import { ScrollView } from 'react-native';

import useGameEndQuestionStyle from './GameEndQuestionStyle';

export default function GameEndQuestion() {
  const styles = useGameEndQuestionStyle();

  return (
    <TitleCard title="QUESTIONS" containerStyle={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* {news.map((item, i) => (
          <View key={item.id} style={news[i + 1] && styles.separator}>
            <HomeNewsItem item={item} />
          </View>
        ))} */}
      </ScrollView>
    </TitleCard>
  );
}
