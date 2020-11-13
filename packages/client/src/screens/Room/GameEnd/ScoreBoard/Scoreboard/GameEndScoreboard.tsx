import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useGameEndScoreboardStyle from './GameEndScoreboardStyle';

export default function GameEndScoreBoard() {
  const [displayTop, setDisplayTop] = useState(true);
  const styles = useGameEndScoreboardStyle();

  return (
    <View>
      <TouchableOpacity>
        <Text>Hello World</Text>
      </TouchableOpacity>
    </View>
  );
}
