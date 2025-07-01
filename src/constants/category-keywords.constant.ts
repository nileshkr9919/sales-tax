import {ItemCategory} from '../enums';

export const CATEGORY_KEYWORDS: Record<ItemCategory, string[]> = {
  [ItemCategory.BOOK]: ['book'],
  [ItemCategory.FOOD]: ['chocolate', 'chocolates'],
  [ItemCategory.MEDICAL]: ['pill', 'pills', 'headache'],
  [ItemCategory.OTHER]: [],
};
