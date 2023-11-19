import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect, signal } from '@angular/core';

import { Directions } from '../../models/directions.enum';
import { HoverData } from '../../models/hover-data.model';
import { PlacedShip } from '../../models/placed-ship.model';
import { Ships } from '../../models/ships.enum';
import { SquareData } from '../../models/square-data.model';
import { getDefaultBoard, getMultiplierFromDirection, isWithinBounderies } from '../../utils/board';
import { getShipSize } from '../../utils/ships';

@Component({
  selector: 'jv-board',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="grid h-full w-full grid-cols-[auto,minmax(0,1fr)] grid-rows-[auto,minmax(0,1fr)] gap-2"
    >
      <div class="col-start-2 grid grid-cols-10 gap-[2px]">
        @for (_ of baseArray; track index; let index = $index) {
          <div>{{ index }}</div>
        }
      </div>
      <div class="grid-rows-10 row-start-2 grid gap-[2px]">
        @for (_ of baseArray; track index; let index = $index) {
          <div>{{ stringRef.fromCharCode(index + 65) }}</div>
        }
      </div>

      <div
        class="grid grid-cols-10 grid-rows-[repeat(1fr,10)]"
        (contextmenu)="rightClicked.emit(); $event.preventDefault()"
      >
        @for (square of boardArray; track square.index) {
          <div
            class="p-[2px]"
            (click)="squareClicked.emit(square)"
            (mouseleave)="onMouseLeave()"
            (mouseenter)="onMouseEnter(square.index)"
          >
            <div
              class="h-full w-full border border-neutral-700"
              [ngClass]="{
                'cursor-pointer bg-rose-300 hover:bg-rose-300': square.color === 'full',
                'cursor-pointer bg-rose-300/30': square.color === 'hover'
              }"
            ></div>
          </div>
        }
      </div>
    </div>
  `,
})
export class BoardComponent {
  @Output() rightClicked = new EventEmitter<void>();
  @Output() squareClicked = new EventEmitter<SquareData>();

  boardArray = getDefaultBoard();

  readonly stringRef = String;
  readonly baseArray = Array(10);

  private readonly _mouseAtIndex = signal<number | null>(null);
  private readonly _hoverData = signal<HoverData | null>(null);

  constructor() {
    effect(() => {
      const index = this._mouseAtIndex();
      const hoverData = this._hoverData();

      if (!!index && !!hoverData) {
        const { ship, direction } = hoverData;

        this.paintShip(index, ship, direction, 'hover');
      }
    });
  }

  @Input() set placedShips(value: PlacedShip[]) {
    this.boardArray = getDefaultBoard();

    value.forEach(({ index, ship, direction }) => this.paintShip(index, ship, direction, 'full'));
  }

  @Input() set hoverData(value: HoverData | null) {
    this._hoverData.set(value);

    this.clearHover();
  }

  onMouseLeave(): void {
    this._mouseAtIndex.set(null);

    this.clearHover();
  }

  onMouseEnter(index: number): void {
    this._mouseAtIndex.set(index);
  }

  private clearHover(): void {
    this.boardArray = this.boardArray.map(square => {
      if (square.color !== 'hover') {
        return square;
      }

      return {
        ...square,
        color: 'none',
      };
    });
  }

  private paintShip(
    index: number,
    ship: Ships,
    direction: Directions,
    color: 'full' | 'hover',
  ): void {
    const size = getShipSize(ship);
    const multiplier = getMultiplierFromDirection(direction);

    let previousIndex: number = -1;
    Array(size)
      .fill(0)
      .every((_, n) => {
        const calculatedIndex = index + n * multiplier;

        if (!isWithinBounderies(calculatedIndex, previousIndex)) {
          return false;
        }

        const currentData = this.boardArray[calculatedIndex];
        const data: SquareData = {
          ...currentData,
          color: currentData.color === 'full' ? 'full' : color,
          head: index,
          ship,
        };

        this.boardArray[calculatedIndex] = data;
        previousIndex = calculatedIndex;

        return true;
      });
  }
}
