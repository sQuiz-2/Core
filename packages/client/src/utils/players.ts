import { Player } from '@squiz/shared';

import { DisplayPlayer } from '../global/playerInfoState';

export function setPlayersPosition(players: Player[]) {
  const displayPlayers: DisplayPlayer[] = [];
  for (let i = 0, position = 1; i < players.length; i++) {
    const player: DisplayPlayer = { ...players[i], position };
    if (players[i + 1] && players[i + 1].score < player.score) {
      position++;
    }
    displayPlayers.push(player);
  }
  return displayPlayers;
}
