import { Component } from '@angular/core';

import { BoardComponent } from './components/board/board.component';
import { PlaceComponent } from './features/place/place.component';

@Component({
  selector: 'jv-game',
  standalone: true,
  imports: [PlaceComponent, BoardComponent],
  template: ` <jv-place /> `,
})
export class GamePage {}
