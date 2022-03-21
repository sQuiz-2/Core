import { TrophyNotification } from '@Src/components/Notification';
import { useSound } from '@Src/utils/hooks/sound';
import useListener from '@Src/utils/hooks/useListener';
import { allChallenges, AllChallengesIds, AllChallengesTypes, GameEvent } from '@squiz/shared';
import React from 'react';
import toast from 'react-hot-toast';

export default function useTrophiesListener() {
  const trophySound = useSound({ source: require('@Assets/sounds/trophy.mp3') });
  useListener(GameEvent.PlayerTrophies, displayTrophies);

  function displayTrophy(challenge: AllChallengesTypes) {
    const { title, description } = challenge;
    toast.custom(
      ({ duration }) => (
        <TrophyNotification description={description} duration={duration} title={title} />
      ),
      {
        position: 'bottom-right',
        duration: 3000,
      }
    );
    trophySound?.play();
  }

  function displayTrophies(challenges: AllChallengesIds) {
    const unlockedChallenges = allChallenges.filter(({ id }) => challenges.includes(id));

    unlockedChallenges.forEach((challenge, i) => {
      setTimeout(() => displayTrophy(challenge), i * 1000);
    });
  }
}
