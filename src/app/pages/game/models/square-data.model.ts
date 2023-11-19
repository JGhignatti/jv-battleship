import { Ships } from './ships.enum';

export interface SquareData {
  index: number;
  color: 'full' | 'hover' | 'none';
  head: number;
  ship: Ships | null;
}
