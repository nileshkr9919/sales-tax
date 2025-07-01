import {ItemCategory} from '../enums';

export class Item {
  name: string;
  price: number;
  imported: boolean;
  category: ItemCategory;

  constructor(name: string, price: number, imported: boolean, category: ItemCategory) {
    this.name = name;
    this.price = price;
    this.imported = imported;
    this.category = category;
  }

  isImported(): boolean {
    return this.imported;
  }

  isExempt(): boolean {
    return [ItemCategory.BOOK, ItemCategory.FOOD, ItemCategory.MEDICAL].includes(this.category);
  }
}
