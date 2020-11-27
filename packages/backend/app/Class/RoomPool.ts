import { EmitRoom } from '@squiz/shared';
import Game from 'App/Models/Game';
import Ws from 'App/Services/Ws';

import Quiz from './Quiz';
import Room from './Room';

class RoomPool {
  /**
   * Store all the rooms
   */
  rooms: Room[] = [];

  /**
   * Fetch Games and create a room for each games
   */
  public async init(): Promise<void> {
    const games = await Game.query();
    games.forEach((game) => {
      this.addRoom(game);
    });
  }

  /**
   * Create a new room and store it
   */
  public addRoom(game: Game): void {
    const roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    const roomData = {
      title: game.title,
      difficulty: game.difficulty,
      nameSpace: Ws.io.of(roomNumber),
      roomNumber,
    };
    const room = new Quiz(roomData);
    this.rooms.push(room);
  }

  /**
   * Return all rooms
   */
  public getRooms(): EmitRoom {
    const roomNames = this.rooms.map(({ title, id, players, difficulty }) => {
      return { title, id, players: players.length, difficulty };
    });
    return roomNames;
  }
}

export default new RoomPool();
