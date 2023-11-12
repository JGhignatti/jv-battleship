import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jv-board',
  standalone: true,
  template: `
    <div
      class="grid h-full w-full grid-cols-[auto,minmax(0,1fr)] grid-rows-[auto,minmax(0,1fr)] gap-2"
    >
      <div class="col-start-2 grid grid-cols-10 gap-[2px]">
        @for (_ of baseArray; track index; let index = $index) {
        <div>{{ stringRef.fromCharCode(index + 65) }}</div>
        }
      </div>
      <div class="grid-rows-10 row-start-2 grid gap-[2px]">
        @for (_ of baseArray; track index; let index = $index) {
        <div>{{ index }}</div>
        }
      </div>

      <div class="grid grid-cols-10 grid-rows-[repeat(1fr,10)] gap-[2px]">
        @for (_ of baseArray; track i; let i = $index) { @for (_ of baseArray; track j; let j =
        $index) {
        <div class="border border-neutral-700 hover:bg-neutral-100/5"></div>
        } }
      </div>
    </div>
  `,
})
export class BoardComponent {
  readonly stringRef = String;
  readonly baseArray = Array(10);
}
