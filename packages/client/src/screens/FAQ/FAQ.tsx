import { ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import faq from '@Src/constant/faq.json';
import React from 'react';
import { View } from 'react-native';

import styles from './FAQStyle';

export default function FAQ() {
  return (
    <ResponsiveContainer>
      <View style={{ flex: 1 }}>
        {faq.map(({ question, answer }) => (
          <>
            <Text fontSize="xl" style={styles.question}>
              {question}
            </Text>
            <Text fontSize="lg">{answer}</Text>
          </>
        ))}
      </View>
    </ResponsiveContainer>
  );
}
