import {Item} from '../models/item.model';
import {BASIC_TAX_RATE, IMPORT_DUTY_RATE} from '../constants/tax.constants';
import {ITaxCalculator} from '../interfaces/tax-calculator.interface';
import {roundUpToNearest005} from '../utils/round.util';

export class TaxCalculator implements ITaxCalculator {
  /**
   * Calculates the total tax for a given item, applying basic and import taxes as needed.
   * @param item - The item to calculate tax for.
   * @returns The total tax for the item, rounded up to the nearest 0.05.
   */
  calculate(item: Item): number {
    let tax = 0;
    if (!item.isExempt()) {
      tax += item.price * BASIC_TAX_RATE;
    }
    if (item.isImported()) {
      tax += item.price * IMPORT_DUTY_RATE;
    }
    return roundUpToNearest005(tax);
  }
}
