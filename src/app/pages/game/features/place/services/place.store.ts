import { Injectable, computed, signal } from '@angular/core';

import { PlacedShip } from '../../../models/placed-ship.model';
import { SimplifiedSquareData } from '../../../models/simplified-square-data.model';
import {
  getMultiplierFromDirection,
  getdDefaultSimplifieBoard,
  isWithinBounderies,
} from '../../../utils/board';
import { getShipSize } from '../../../utils/ships';

@Injectable()
export class PlaceStore {
  placedShips = computed(() => this._placedShips());

  private readonly _placedShips = signal<PlacedShip[]>([]);

  placeShip(placedShip: PlacedShip): boolean {
    const index = placedShip.index;
    const size = getShipSize(placedShip.ship);
    const multiplier = getMultiplierFromDirection(placedShip.direction);

    let previousIndex: number = -1;
    const canPlace = Array(size)
      .fill(0)
      .every((_, n) => {
        const board = this.buildSimplifiedBoardState();
        const calculatedIndex = index + n * multiplier;

        if (
          board[calculatedIndex]?.hasShip ||
          !isWithinBounderies(calculatedIndex, previousIndex)
        ) {
          return false;
        }

        previousIndex = calculatedIndex;

        return true;
      });

    if (canPlace) {
      this._placedShips.update(value => [...value, placedShip]);

      return true;
    }

    return false;
  }

  removeShip(index: number): void {
    this._placedShips.update(placedShips => placedShips.filter(ship => ship.index !== index));
  }

  private buildSimplifiedBoardState(): SimplifiedSquareData[] {
    const board = getdDefaultSimplifieBoard();

    this._placedShips().forEach(({ index, ship, direction }) => {
      const size = getShipSize(ship);
      const multiplier = getMultiplierFromDirection(direction);

      Array(size)
        .fill(0)
        .forEach((_, n) => {
          const calculatedIndex = index + n * multiplier;

          board[calculatedIndex].hasShip = true;
        });
    });

    return board;
  }
}
