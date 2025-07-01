import {Basket} from '../models/basket.model';
import {TaxCalculator} from '../services/tax-calculator.service';
import {Receipt} from '../models/receipt.model';

export interface IReceiptBuilder {
  setBasket(basket: Basket): this;
  setTaxCalculator(taxCalculator: TaxCalculator): this;
  build(): Receipt;
}
