import Text from '@Src/components/Text';
import questionState from '@Src/global/Room/question';
import roomInfosState from '@Src/global/Room/roomInfos';
import roomStatusState from '@Src/global/Room/roomStatus';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import roomSocketState from '@Src/global/roomSocket';
import { FontAwesome5 } from '@expo/vector-icons';
import { GameEvent, RoomStatus } from '@squiz/shared';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import useAdminGameButtonStyle from './AdminGameButtonsStyle';

export default function AdminGameButtons() {
  const roomInfos = useRecoilValue(roomInfosState);
  const roomStatus = useRecoilValue(roomStatusState);
  const roomSocket = useRecoilValue(roomSocketState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);
  const question = useRecoilValue(questionState);
  const styles = useAdminGameButtonStyle();

  function startGame() {
    roomSocket?.emit(GameEvent.RoomAdminStartGame);
  }
  function nextRound() {
    roomSocket?.emit(GameEvent.RoomAdminStartRound);
  }
  function pause() {
    roomSocket?.emit(GameEvent.Pause);
  }

  let isLastQuestion = false;
  if (question && question.currentRound + 1 >= question.maxRound) {
    isLastQuestion = true;
  }

  if (!roomInfos) return null;

  if (!roomInfos.isRoomAdmin && roomStatus.status === RoomStatus.Paused) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <FontAwesome5 name="pause" size={14} color="white" />
          <Text style={styles.text}>La partie est en pause</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {roomInfos.isRoomAdmin && (
        <View>
          {roomStatus.status === RoomStatus.Waiting && (
            <Pressable onPress={startGame} style={styles.buttonContainer}>
              <FontAwesome5 name="play" size={14} color="white" />
              <Text style={styles.text}>Démarrer la partie</Text>
            </Pressable>
          )}
          {!isQuestionTime &&
            roomStatus.status !== RoomStatus.Waiting &&
            roomInfos.startRoundManually && (
              <Pressable onPress={nextRound} style={styles.buttonContainer}>
                <FontAwesome5 name="step-forward" size={14} color="white" />
                <Text style={styles.text}>
                  {isLastQuestion ? 'Afficher les résultats' : 'Prochaine question'}
                </Text>
              </Pressable>
            )}
          {!isQuestionTime &&
            roomStatus.status !== RoomStatus.Waiting &&
            roomStatus.status !== RoomStatus.Starting &&
            !roomInfos.startRoundManually && (
              <Pressable onPress={pause} style={styles.buttonContainer}>
                <FontAwesome5
                  name={roomStatus.status === RoomStatus.Paused ? 'play' : 'pause'}
                  size={14}
                  color="white"
                />
                <Text style={styles.text}>
                  {roomStatus.status === RoomStatus.Paused ? 'Reprise' : 'Pause'}
                </Text>
              </Pressable>
            )}
        </View>
      )}
    </View>
  );
}
