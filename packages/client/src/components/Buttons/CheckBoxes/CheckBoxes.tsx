import Text from '@Src/components/Text';
import React from 'react';
import { View } from 'react-native';

import CheckBox from '../CheckBox';
import useCheckBoxStyle from './CheckBoxesStyle';

type CheckBoxProps = {
  choices: string[];
  selected: string[];
  onSelect: (newSelected: string[], pressed: string) => void;
};

export default function CheckBoxes({ choices, selected, onSelect }: CheckBoxProps) {
  const styles = useCheckBoxStyle();

  function handlePress(pressed: string) {
    let newSelected: string[] = [];
    if (selected.includes(pressed)) {
      newSelected = selected.filter((select) => select !== pressed);
    } else {
      newSelected = [...selected, pressed];
    }
    onSelect(newSelected, pressed);
  }

  return (
    <>
      {choices.map((choice) => (
        <View key={choice} style={styles.container}>
          <CheckBox onSelect={() => handlePress(choice)} selected={selected.includes(choice)} />
          <Text>{choice}</Text>
        </View>
      ))}
    </>
  );
}
