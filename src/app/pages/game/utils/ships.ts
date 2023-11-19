import { Ships } from '../models/ships.enum';

export const ships = [
  {
    ship: Ships.Carrier,
    name: 'Carrier',
    size: 5,
  },
  {
    ship: Ships.Battleship,
    name: 'Battleship',
    size: 4,
  },
  {
    ship: Ships.Destroyer,
    name: 'Destroyer',
    size: 3,
  },
  {
    ship: Ships.Submarine,
    name: 'Submarine',
    size: 3,
  },
  {
    ship: Ships.PatrolBoat,
    name: 'Patrol Boat',
    size: 2,
  },
];

export function getShipSize(ship: Ships): number {
  return ships.find(value => value.ship === ship)?.size!;
}
