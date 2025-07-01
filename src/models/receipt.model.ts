export interface ReceiptLine {
  quantity: number;
  description: string;
  priceWithTax: number;
}

export class Receipt {
  lines: ReceiptLine[];
  salesTaxes: number;
  total: number;

  constructor(lines: ReceiptLine[], salesTaxes: number, total: number) {
    this.lines = lines;
    this.salesTaxes = salesTaxes;
    this.total = total;
  }

  /**
   * Returns the itemized receipt lines.
   */
  getLines(): ReceiptLine[] {
    return this.lines;
  }

  /**
   * Returns the total sales taxes.
   */
  getSalesTaxes(): number {
    return this.salesTaxes;
  }

  /**
   * Returns the total price including taxes.
   */
  getTotal(): number {
    return this.total;
  }
}
