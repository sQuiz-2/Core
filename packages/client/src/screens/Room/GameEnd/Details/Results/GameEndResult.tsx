import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import React from 'react';

import useGameEndResultStyle from './GameEndResultStyle';

export default function RoomGameEndResult() {
  const styles = useGameEndResultStyle();

  return (
    <TitleCard title="RÉSULTATS" containerStyle={styles.container}>
      <Text>6/135</Text>
    </TitleCard>
  );
}
