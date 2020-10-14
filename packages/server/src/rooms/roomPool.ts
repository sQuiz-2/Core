/**
 * RoomPool object
 */

import { Server } from 'socket.io';
import Game from 'squiz-api/app/Models/Game';

import Quiz from '../games/quiz';
import Room from './room';

type Props = {
  games: Game[];
  server: Server;
};

export default class RoomPool {
  rooms: Room[] = [];
  server: Server;

  constructor({ games, server }: Props) {
    this.server = server;
    // Init RoomPool with one room of each themes
    for (let i = 0; i < games.length; i++) {
      this.addRoom(games[i]);
    }
  }

  addRoom = (game: Game): void => {
    const roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    const roomData = {
      title: game.title,
      difficulty: game.difficulty,
      nameSpace: this.server.of(roomNumber),
      roomNumber,
    };
    const room = new Quiz(roomData);
    room.roomLoop();
    room.initGame();
    this.rooms.push(room);
  };

  getRooms = () => {
    const roomNames = this.rooms.map(({ title, id, players, difficulty }) => {
      return { title, id, players: players.length, difficulty: difficulty.title };
    });
    return roomNames;
  };
}
