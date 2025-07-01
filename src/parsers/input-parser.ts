import {Item} from '../models/item.model';
import {detectCategory} from '../utils/category.util';

export class InputParser {
  parse(input: string): Item[] {
    const lines = input
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const items: Item[] = [];

    for (const line of lines) {
      // Example: "1 imported box of chocolates at 10.00"
      const match = line.match(/^(\d+)\s(.+)\sat\s([\d.]+)$/);
      if (!match) continue;

      const quantity = parseInt(match[1], 10);
      const description = match[2];
      const price = parseFloat(match[3]);
      const imported = /imported/.test(description);
      const category = detectCategory(description);

      for (let i = 0; i < quantity; i++) {
        items.push(
          new Item(
            description.replace('imported ', '').replace('imported', '').trim(),
            price,
            imported,
            category,
          ),
        );
      }
    }

    return items;
  }
}
