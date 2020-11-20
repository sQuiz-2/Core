import bronze from '@Assets/images/medals/bronze.png';
import gold from '@Assets/images/medals/gold.png';
import gray from '@Assets/images/medals/gray.png';
import green from '@Assets/images/medals/green.png';
import silver from '@Assets/images/medals/silver.png';
import { GameRank } from '@squiz/shared';

export function getMedalWithRank(rank: number) {
  const images = [gray, gold, silver, bronze];
  let image;
  if (rank >= GameRank.NotAnswered && rank <= GameRank.Third) {
    image = images[rank];
  } else if (rank > GameRank.Third) {
    image = green;
  }
  return image;
}
