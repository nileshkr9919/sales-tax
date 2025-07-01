export class Item {
  name: string;
  price: number;
  imported: boolean;
  exempt: boolean;

  constructor(name: string, price: number, imported: boolean, exempt: boolean) {
    this.name = name;
    this.price = price;
    this.imported = imported;
    this.exempt = exempt;
  }

  isImported(): boolean {
    return this.imported;
  }

  isExempt(): boolean {
    return this.exempt;
  }
}
