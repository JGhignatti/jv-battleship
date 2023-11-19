import { NgClass } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';

import { Ships } from '../../models/ships.enum';
import { ships } from '../../utils/ships';
import { PlaceBoardComponent } from './components/place-board/place-board.component';
import { PlaceStore } from './services/place.store';

@Component({
  selector: 'jv-place',
  standalone: true,
  imports: [NgClass, PlaceBoardComponent],
  providers: [PlaceStore],
  template: `
    <div class="flex h-full w-full justify-center overflow-auto">
      <div class="container h-fit p-4">
        <h1 class="mb-6 text-3xl font-bold">Place your ships</h1>

        <div class="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3">
          <div>
            <h2 class="mb-2 text-xl">Ships</h2>
            <p class="mb-6">
              Click a ship in the list, than hover over the board and click to position it. Before
              positioning, right click to rotate it, once positioned, click it to remove.
            </p>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
              @for (item of shipsList; track $index) {
                <div
                  class="relative flex cursor-pointer flex-col gap-2 rounded-lg bg-neutral-700 px-6 py-4 shadow transition-colors hover:bg-neutral-600"
                  [ngClass]="{
                    'outline outline-4 outline-rose-300': selectedShip === item.ship,
                    'cursor-not-allowed text-neutral-400 hover:bg-neutral-700':
                      !remainingShips().includes(item.ship)
                  }"
                  (click)="onShipClick(item.ship)"
                >
                  <span>{{ item.name }}</span>

                  <div class="grid w-fit grid-cols-5">
                    @for (_ of arrayRef(item.size); track j; let j = $index) {
                      <div class="h-10 w-10 border-4 border-neutral-500"></div>
                    }
                  </div>

                  <span class="absolute right-2 top-2 text-lg text-white accent-white">
                    {{
                      selectedShip === item.ship
                        ? '&#9930;'
                        : !remainingShips().includes(item.ship)
                          ? '&check;'
                          : '&#9929;'
                    }}
                  </span>
                </div>
              }
            </div>
          </div>

          <div class="aspect-square max-h-full max-w-full lg:col-span-2">
            <jv-place-board
              [selectedShip]="selectedShip"
              (resetSelectedShip)="selectedShip = null"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PlaceComponent {
  selectedShip: Ships | null = null;
  remainingShips!: Signal<Ships[]>;

  readonly arrayRef = Array;
  readonly shipsList = ships;

  private readonly placeStore = inject(PlaceStore);

  constructor() {
    this.remainingShips = computed(() =>
      Object.values(Ships).filter(
        ship =>
          !this.placeStore
            .placedShips()
            .map(placedShip => placedShip.ship)
            .includes(ship),
      ),
    );
  }

  onShipClick(ship: Ships): void {
    if (!this.remainingShips().includes(ship)) {
      return;
    }

    let toSetShip: Ships | null = ship;

    if (ship === this.selectedShip) {
      toSetShip = null;
    }

    this.selectedShip = toSetShip;
  }
}
