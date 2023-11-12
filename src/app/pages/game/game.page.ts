import { Component } from '@angular/core';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'jv-game',
  standalone: true,
  imports: [BoardComponent],
  template: `
    <div class="flex h-full w-full justify-center">
      <div class="container p-4">
        <div class="aspect-square max-h-full max-w-full">
          <jv-board />
        </div>
      </div>
    </div>
  `,
})
export class GamePage {}
