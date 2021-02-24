import React, { useState } from 'react';
import { Picker } from 'react-native';

import useDifficultyPickerStyle from './DifficultyPickerStyle';

type DifficultyPickerProps = {
  onChange: (value: string) => void;
};

export default function DifficultyPicker({ onChange }: DifficultyPickerProps) {
  const styles = useDifficultyPickerStyle();
  const [picked, setPicked] = useState('0');

  function handleChange(itemValue: string) {
    setPicked(itemValue);
    onChange(itemValue);
  }

  return (
    <Picker onValueChange={handleChange} selectedValue={picked} style={styles.picker}>
      <Picker.Item label="Tout niveaux" value="0" />
      <Picker.Item label="Initié" value="1" />
      <Picker.Item label="Confirmé" value="2" />
      <Picker.Item label="Expert" value="3" />
    </Picker>
  );
}
