import { TitleCard } from '@Src/components/Card';
import client from '@Src/utils/request';
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import News from 'squiz-backend/app/Models/News';

import HomeNewsItem from '../NewsItem';
import useHomeNewsStyle from './HomeNewsStyle';

export default function HomeNews() {
  const styles = useHomeNewsStyle();
  const [news, setNews] = useState<News[]>([]);

  async function fetchNews() {
    try {
      const news = await client('news', { method: 'GET' });
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
