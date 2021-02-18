import soundVolumeState, { soundVolumeFromStore } from '@Src/global/soundVolume';
import { useSound } from '@Src/utils/hooks/sound';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import styles from './SoundVolumeStyle';

export default function SoundVolume() {
  const { colors } = useTheme();
  const setSoundVolume = useSetRecoilState(soundVolumeFromStore);
  const soundVolume = useRecoilValue(soundVolumeState);
  const testSound = useSound({ source: require('@Assets/sounds/right.mp3') });
  const [display, setDisplay] = useState(false);

  function updateSound(volume: number) {
    setSoundVolume(volume);
    testSound?.play();
  }

  return (
    <>
      <TouchableOpacity onPress={() => setDisplay(!display)}>
        <FontAwesome5 name="volume-up" size={18} color={colors.text} style={styles.leaveDoor} />
      </TouchableOpacity>
      {display && (
        <Slider
          style={{ width: 100, height: 10, paddingRight: 10 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={colors.text}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.text}
          value={soundVolume}
          onSlidingComplete={updateSound}
        />
      )}
    </>
  );
}
