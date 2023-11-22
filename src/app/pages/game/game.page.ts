import { Component } from '@angular/core';

import { BoardComponent } from './components/board/board.component';
import { PlaceComponent } from './features/place/place.component';
import { GameStore } from './services/game.store';

@Component({
  selector: 'jv-game',
  standalone: true,
  imports: [PlaceComponent, BoardComponent],
  providers: [GameStore],
  template: ` <jv-place /> `,
})
export class GamePage {}
