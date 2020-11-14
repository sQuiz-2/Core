import Text from '@Src/components/Text';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import useGameEndScoreboardSwitchStyle from './GameEndScoreboardSwitchStyle';

type GameEndScoreboardSwitchProps = {
  displayTop: boolean;
  setDisplayTop: (displayTop: boolean) => void;
};

export default function GameEndScoreboardSwitch({
  displayTop,
  setDisplayTop,
}: GameEndScoreboardSwitchProps) {
  const { colors } = useTheme();
  const styles = useGameEndScoreboardSwitchStyle();

  const topFontColor = displayTop ? colors.notification : colors.text;
  const topBgColor = displayTop ? colors.border : colors.background;
  const boardFontColor = displayTop ? colors.text : colors.notification;
  const boardBgColor = displayTop ? colors.background : colors.border;

  return (
    <View style={styles.switch}>
      <TouchableOpacity
        style={[styles.switchItemLeft, { backgroundColor: topBgColor }]}
        onPress={() => setDisplayTop(true)}>
        <FontAwesome5 name="trophy" size={20} color={topFontColor} />
        <Text style={[styles.switchText, { color: topFontColor }]} fontSize="lg">
          PODIUM
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.switchItemRight, { backgroundColor: boardBgColor }]}
        onPress={() => setDisplayTop(false)}>
        <FontAwesome5 name="users" size={20} color={boardFontColor} />
        <Text style={[styles.switchText, { color: boardFontColor }]} fontSize="lg">
          CLASSEMENT
        </Text>
      </TouchableOpacity>
    </View>
  );
}
