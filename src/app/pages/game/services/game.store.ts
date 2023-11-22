import { Injectable, computed, signal } from '@angular/core';

import { GameSteps } from '../models/game-steps.enum';
import { PlacedShip } from '../models/placed-ship.model';

@Injectable()
export class GameStore {
  gameStep = computed(() => this._gameStep());

  private _gameStep = signal<GameSteps>(GameSteps.Place);
  private _playerShips = signal<PlacedShip[]>([]);

  start(playerShips: PlacedShip[]): void {
    this._playerShips.set(playerShips);

    this._gameStep.set(GameSteps.Play);
  }
}
