import {Item} from '../models/item.model';

export interface ITaxCalculator {
  calculate(item: Item): number;
}
