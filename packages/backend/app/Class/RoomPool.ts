import { Difficulty, EmitRooms } from '@squiz/shared';
import Game from 'App/Models/Game';
import { EventEmitter } from 'events';

import Quiz from './Quiz/Quiz';
import Room from './Room';

export type RoomConfig = {
  difficulty: Difficulty;
  title: string;
  private: boolean;
  antiCheat: boolean;
  maxPlayers: number;
};

class RoomPool {
  /**
   * Store all rooms
   */
  rooms: Room[] = [];

  /**
   * EventEmitter to communicate with rooms
   */
  eventEmitter: EventEmitter = new EventEmitter();

  /**
   * Fetch Games and create a room for each games
   */
  public async init(): Promise<void> {
    const games = await Game.query().orderBy('id', 'asc');
    games.forEach((game) => {
      this.addRoom({
        difficulty: game.difficulty,
        title: game.title,
        private: false,
        antiCheat: true,
        maxPlayers: 200,
      });
    });
  }

  /**
   * Create a new room and store it
   */
  public addRoom(roomConfig: RoomConfig): string {
    let roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    while (this.idUsed(roomNumber)) {
      roomNumber += 1;
    }
    const room = new Quiz({ ...roomConfig, roomNumber });
    this.rooms.push(room);
    return roomNumber;
  }

  /**
   * Return all rooms
   */
  public getRooms(): EmitRooms {
    const publicRooms = this.rooms.filter(({ isPrivate }) => !isPrivate);
    const rooms = publicRooms.map(({ id, players, difficulty, title, isFull }) => {
      return { id, players: players.length, difficulty, title, isFull };
    });
    return rooms;
  }

  /**
   * Get a private room with it's code
   */
  public getRoomIdWithCode(code: string): string | undefined {
    const exist = this.rooms.find(({ title }) => title === code);
    return exist?.id;
  }

  /**
   * Check if a room already use this id
   */
  private idUsed(roomId: string): boolean {
    const room = this.rooms.find(({ id }) => id === roomId);
    return !!room;
  }

  /**
   * Remove room from the room pool
   */
  public removeRoom(): void {
    this.rooms = this.rooms.filter(({ players, isPrivate }) => {
      if (isPrivate && players.length <= 0) {
        return false;
      }
      return true;
    });
  }

  /**
   * Kick user from the room pool
   */
  public kickUser(playerName: string): void {
    this.rooms.forEach((room) => {
      room.kickPlayer(playerName);
    });
  }
}

export default new RoomPool();
