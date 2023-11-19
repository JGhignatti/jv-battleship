import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'jv-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex h-full w-full justify-center">
      <main class="container flex flex-col items-center gap-8 px-4 py-9">
        <h1 class="px-4 text-4xl font-bold">JV Battleship</h1>
        <p>Choose a difficulty level to start the game:</p>

        <div class="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          @for (difficulty of difficulties; track $index) {
            <a
              role="button"
              class="flex flex-col items-center rounded-lg bg-neutral-700 p-6 shadow transition-colors hover:bg-neutral-600"
              [routerLink]="['/g']"
              [queryParams]="{ d: difficulty.code }"
            >
              <h3 class="text-lg">{{ difficulty.name }}</h3>
              <p>
                @for (star of arrayRef(4); track index; let index = $index) {
                  <span class="text-xl">{{ index <= difficulty.code ? '&starf;' : '&star;' }}</span>
                }
              </p>
            </a>
          }
        </div>
      </main>
    </div>
  `,
})
export class HomePage {
  readonly difficulties = [
    {
      name: 'Super Easy',
      code: 0,
    },
    {
      name: 'Easy',
      code: 1,
    },
    {
      name: 'Medium',
      code: 2,
    },
    {
      name: 'Hard',
      code: 3,
    },
  ];
  readonly arrayRef = Array;
}
