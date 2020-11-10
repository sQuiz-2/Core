import React from 'react';

import { TitleCard } from '../../../components/Card';
import Text from '../../../components/Text';
import useHomeNewsStyle from './HomeNewsStyle';

export default function HomeNews() {
  const styles = useHomeNewsStyle();

  return (
    <TitleCard title="ACTUALITÉS" containerStyle={styles.container}>
      <Text>Hello World</Text>
    </TitleCard>
  );
}
