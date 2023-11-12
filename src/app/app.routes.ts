import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { GamePage } from './pages/game/game.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'g',
    component: GamePage,
  },
];
