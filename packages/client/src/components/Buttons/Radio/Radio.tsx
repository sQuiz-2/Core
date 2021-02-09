import Text from '@Src/components/Text';
import React from 'react';
import { Pressable, View } from 'react-native';

import useRadioStyle from './RadioStyle';

type RadioProps = {
  choices: string[];
  selected: string | null;
  onSelect: (newSelected: string) => void;
};

export default function Radio({ choices, selected, onSelect }: RadioProps) {
  const styles = useRadioStyle();

  return (
    <>
      {choices.map((choice) => (
        <View key={choice} style={styles.container}>
          <Pressable style={styles.button} onPress={() => onSelect(choice)}>
            {selected === choice ? <View style={styles.buttonCenter} /> : null}
          </Pressable>
          <Text>{choice}</Text>
        </View>
      ))}
    </>
  );
}
