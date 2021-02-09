import React from 'react';
import { Pressable, View } from 'react-native';

import useCheckBoxStyle from './CheckBoxStyle';

type CheckBoxProps = {
  selected: boolean;
  onSelect: (choice: boolean) => void;
};

export default function CheckBox({ selected, onSelect }: CheckBoxProps) {
  const styles = useCheckBoxStyle();

  return (
    <Pressable style={styles.button} onPress={() => onSelect(!selected)}>
      {selected ? <View style={styles.buttonCenter} /> : null}
    </Pressable>
  );
}
