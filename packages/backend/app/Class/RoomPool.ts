import { EmitRooms } from '@squiz/shared';
import Game from 'App/Models/Game';

import Quiz from './Quiz';
import Room from './Room';

class RoomPool {
  /**
   * Store all rooms
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
      difficulty: game.difficulty,
      roomNumber,
    };
    const room = new Quiz(roomData);
    this.rooms.push(room);
  }

  /**
   * Return all rooms
   */
  public getRooms(): EmitRooms {
    const rooms = this.rooms.map(({ id, players, difficulty }) => {
      return { id, players: players.length, difficulty };
    });
    return rooms;
  }
}

export default new RoomPool();
