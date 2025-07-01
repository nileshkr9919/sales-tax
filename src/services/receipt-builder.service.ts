import {Basket} from '../models/basket.model';
import {Item} from '../models/item.model';
import {Receipt, ReceiptLine} from '../models/receipt.model';
import {TaxCalculator} from './tax-calculator.service';
import {IReceiptBuilder} from '../interfaces/receipt-builder.interface';

export class ReceiptBuilder implements IReceiptBuilder {
  private basket?: Basket;
  private taxCalculator?: TaxCalculator;

  /**
   * Sets the basket for the receipt.
   * @param basket - The Basket containing items.
   * @returns The ReceiptBuilder instance.
   */
  setBasket(basket: Basket): this {
    this.basket = basket;
    return this;
  }

  /**
   * Sets the tax calculator for the receipt.
   * @param taxCalculator - The TaxCalculator instance.
   * @returns The ReceiptBuilder instance.
   */
  setTaxCalculator(taxCalculator: TaxCalculator): this {
    this.taxCalculator = taxCalculator;
    return this;
  }

  /**
   * Builds and returns a Receipt based on the basket and tax calculator.
   * @returns The constructed Receipt.
   */
  build(): Receipt {
    if (!this.basket || !this.taxCalculator) {
      throw new Error('Basket and TaxCalculator must be set');
    }

    const lines: ReceiptLine[] = [];
    let totalTaxes = 0;
    let total = 0;

    // Group items by description and price for correct receipt output
    const grouped: {[key: string]: {item: Item; quantity: number; totalTax: number}} = {};

    for (const item of this.basket.getItems()) {
      const tax = this.taxCalculator.calculate(item);
      const priceWithTax = item.price + tax;
      const desc = (item.imported ? 'imported ' : '') + item.name;
      const key = `${desc}|${item.price}`;
      if (!grouped[key]) {
        grouped[key] = {item, quantity: 0, totalTax: 0};
      }
      grouped[key].quantity += 1;
      grouped[key].totalTax += tax;
      totalTaxes += tax;
      total += priceWithTax;
    }

    for (const key in grouped) {
      const {item, quantity, totalTax} = grouped[key];
      const desc = (item.imported ? 'imported ' : '') + item.name;
      const priceWithTax = Number(((item.price + totalTax / quantity) * quantity).toFixed(2));
      lines.push({
        quantity,
        description: desc,
        priceWithTax,
      });
    }

    return new Receipt(lines, Number(totalTaxes.toFixed(2)), Number(total.toFixed(2)));
  }
}
