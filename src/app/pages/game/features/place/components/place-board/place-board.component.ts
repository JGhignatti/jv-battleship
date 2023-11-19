import { Component, EventEmitter, Input, Output, Signal, inject } from '@angular/core';

import { BoardComponent } from '../../../../components/board/board.component';
import { Directions } from '../../../../models/directions.enum';
import { HoverData } from '../../../../models/hover-data.model';
import { PlacedShip } from '../../../../models/placed-ship.model';
import { Ships } from '../../../../models/ships.enum';
import { SquareData } from '../../../../models/square-data.model';
import { PlaceStore } from '../../services/place.store';

@Component({
  selector: 'jv-place-board',
  standalone: true,
  imports: [BoardComponent],
  template: `
    <jv-board
      [placedShips]="placedShips()"
      [hoverData]="hoverData"
      (rightClicked)="onRightClick()"
      (squareClicked)="onSquareClicked($event)"
    />
  `,
})
export class PlaceBoardComponent {
  @Output() resetSelectedShip = new EventEmitter<void>();

  placedShips!: Signal<PlacedShip[]>;
  hoverData!: HoverData | null;

  private readonly placeStore = inject(PlaceStore);

  constructor() {
    this.placedShips = this.placeStore.placedShips;
  }

  @Input() set selectedShip(value: Ships | null) {
    this.hoverData = !!value
      ? {
          ship: value,
          direction: Directions.Right,
        }
      : null;
  }

  onRightClick(): void {
    if (!!this.hoverData) {
      const currentDirection = this.hoverData.direction;

      let nextDirection: Directions;
      switch (currentDirection) {
        case Directions.Up:
          nextDirection = Directions.Right;
          break;
        case Directions.Right:
          nextDirection = Directions.Down;
          break;
        case Directions.Down:
          nextDirection = Directions.Left;
          break;
        case Directions.Left:
          nextDirection = Directions.Up;
          break;
      }

      this.hoverData = {
        ...this.hoverData,
        direction: nextDirection,
      };
    }
  }

  onSquareClicked(square: SquareData): void {
    if (!!this.hoverData) {
      this.placeShip(square.index, this.hoverData.ship, this.hoverData.direction);
    } else if (!!square.ship) {
      this.placeStore.removeShip(square.head);
    }
  }

  private placeShip(index: number, ship: Ships, direction: Directions): void {
    const placedShip = {
      index,
      ship,
      direction,
    } satisfies PlacedShip;

    if (this.placeStore.placeShip(placedShip)) {
      this.resetSelectedShip.emit();
    }
  }
}
