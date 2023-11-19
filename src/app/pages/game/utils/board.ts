import { Directions } from '../models/directions.enum';
import { SimplifiedSquareData } from '../models/simplified-square-data.model';
import { SquareData } from '../models/square-data.model';

const defaultBoardArray: SquareData[] = Array(100)
  .fill(0)
  .map(
    (_, index) =>
      ({
        index,
        color: 'none',
        head: -1,
        ship: null,
      }) satisfies SquareData,
  );

const defaultSimplifiedBoardArray: SimplifiedSquareData[] = Array(100)
  .fill(0)
  .map(
    (_, index) =>
      ({
        index,
        hasShip: false,
      }) satisfies SimplifiedSquareData,
  );

export function getDefaultBoard(): SquareData[] {
  return JSON.parse(JSON.stringify(defaultBoardArray));
}

export function getdDefaultSimplifieBoard(): SimplifiedSquareData[] {
  return JSON.parse(JSON.stringify(defaultSimplifiedBoardArray));
}

export function getMultiplierFromDirection(direction: Directions): number {
  let multiplier: number;

  switch (direction) {
    case Directions.Up:
      multiplier = -10;
      break;
    case Directions.Right:
      multiplier = 1;
      break;
    case Directions.Down:
      multiplier = 10;
      break;
    case Directions.Left:
      multiplier = -1;
      break;
  }

  return multiplier;
}

export function isWithinBounderies(currentIndex: number, previousIndex: number): boolean {
  const previousIndexString = previousIndex.toString(10);
  const currentIndexString = currentIndex.toString(10);

  return (
    currentIndex >= 0 &&
    currentIndex <= 99 &&
    (!previousIndexString.endsWith('0') || !currentIndexString.endsWith('9')) &&
    (!previousIndexString.endsWith('9') || !currentIndexString.endsWith('0'))
  );
}
