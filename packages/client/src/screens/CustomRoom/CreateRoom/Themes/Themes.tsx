import Text from '@Src/components/Text';
import { capitalizeFirstLetter } from '@Src/utils/text';
import { GetThemes } from '@squiz/shared/src/typings/Room';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import useThemeStyle from './ThemeStyle';

type ThemesProps = {
  themes: GetThemes;
  selectedThemes: number[];
  handleSelectedTheme: (selectedTheme: number) => void;
};

export default function Themes({ selectedThemes, handleSelectedTheme, themes }: ThemesProps) {
  const styles = useThemeStyle();

  return (
    <ScrollView style={styles.themeScrollView}>
      <View style={styles.themeContainer}>
        {themes.map(({ title, id }) => (
          <Pressable
            key={id}
            style={[styles.themeButton, selectedThemes.includes(id) && styles.themeSelected]}
            onPress={() => handleSelectedTheme(id)}>
            <Text style={styles.themeText}>{capitalizeFirstLetter(title)}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
