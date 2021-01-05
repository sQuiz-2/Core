import { GameRank } from '@squiz/shared';
import { atom } from 'recoil';

const playerRankState = atom<GameRank[]>({
  key: 'playerRankState',
  default: Array(15).fill(GameRank.RoundComing),
});

export default playerRankState;
