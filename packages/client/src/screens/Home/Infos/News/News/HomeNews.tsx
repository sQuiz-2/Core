import { TitleCard } from '@Src/components/Card';
import { get } from '@Src/utils/wrappedFetch';
import { News } from '@squiz/shared';
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import HomeNewsItem from '../NewsItem';
import useHomeNewsStyle from './HomeNewsStyle';

export default function HomeNews() {
  const styles = useHomeNewsStyle();
  const [news, setNews] = useState<News[]>([]);

  async function fetchNews() {
    try {
      const news = await get<News[]>({ path: 'news' });
      if (!news) return;
      setNews(news);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (news.length > 0) return;
    fetchNews();
  }, []);

  return (
    <TitleCard title="ACTUALITÉS" containerStyle={styles.container}>
      <ScrollView style={styles.scroll}>
        {news.map((item, i) => (
          <View key={item.id} style={news[i + 1] && styles.separator}>
            <HomeNewsItem item={item} />
          </View>
        ))}
      </ScrollView>
    </TitleCard>
  );
}
