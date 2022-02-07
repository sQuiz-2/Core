import correctImage from '@Assets/images/answer/correct.png';
import incorrectImage from '@Assets/images/answer/failed.png';
import Text from '@Src/components/Text';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, View } from 'react-native';

import { Guess, GuessStatus } from '../GameInProgress/GameInProgress';
import useGuessesStyle from './GuessesStyle';

type GuessesProps = {
  guesses: Guess[];
};

export default function Guesses({ guesses }: GuessesProps) {
  const styles = useGuessesStyle();

  return (
    <View style={styles.container}>
      {guesses.map(({ guess, guessStatus, timeToAnswer }, index) => {
        return (
          <View style={styles.cardContainer} key={index}>
            <View style={styles.card}>
              <View style={styles.cardLeftInfo}>
                {guessStatus === GuessStatus.Correct && (
                  <Image source={correctImage} style={styles.image} />
                )}
                {guessStatus === GuessStatus.Incorrect && (
                  <Image source={incorrectImage} style={styles.image} />
                )}
                <Text
                  //@ts-ignore
                  numberOfLines={3}
                  style={styles.guessText}>
                  {guess}
                </Text>
              </View>
              {timeToAnswer && (
                <View style={styles.cardRightInfo}>
                  <FontAwesome5 name="clock" size={16} color="white" />
                  <Text style={styles.textTime}>{timeToAnswer}</Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
