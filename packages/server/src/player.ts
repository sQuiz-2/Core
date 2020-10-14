/**
 * Player object
 */

type Props = {
  name: string;
  id: string;
};

export default class Player {
  id: string;
  name: string;
  score: number = 0;
  canGuess: boolean = true;
  avatar: number = 0;
  find: boolean = false;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.avatar = Math.floor(Math.random() * Math.floor(18));
  }

  addPoint = (point: number) => {
    this.score += point;
    this.find = true;
    this.canGuess = false;
  };

  reset = () => {
    this.score = 0;
    this.find = false;
  };

  setCanGuess = (canGuess: boolean) => {
    if (this.canGuess === !canGuess) {
      this.canGuess = canGuess;
    }
  };

  setFind = (find: boolean) => {
    if (this.find === !find) {
      this.find = find;
    }
  };
}
