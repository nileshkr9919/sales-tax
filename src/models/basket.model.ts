import {Item} from './item.model';

export class Basket {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  getItems(): Item[] {
    return this.items;
  }
}
