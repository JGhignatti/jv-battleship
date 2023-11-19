import { Directions } from './directions.enum';
import { Ships } from './ships.enum';

export interface PlacedShip {
  index: number;
  ship: Ships;
  direction: Directions;
}
