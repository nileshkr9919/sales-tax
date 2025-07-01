import {Receipt} from '../models/receipt.model';
import {IReceiptPrinter} from '../interfaces/receipt-printer.interface';

export class ReceiptPrinter implements IReceiptPrinter {
  /**
   * Prints the receipt to the console.
   * @param receipt - The Receipt to print.
   */
  print(receipt: Receipt): void {
    for (const line of receipt.getLines()) {
      console.log(`${line.quantity} ${line.description}: ${line.priceWithTax.toFixed(2)}`);
    }
    console.log(`Sales Taxes: ${receipt.getSalesTaxes().toFixed(2)}`);
    console.log(`Total: ${receipt.getTotal().toFixed(2)}`);
  }
}
