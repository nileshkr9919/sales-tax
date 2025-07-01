import {CATEGORY_KEYWORDS} from '../constants/category-keywords.constant';
import {ItemCategory} from '../enums';

export function detectCategory(description: string): ItemCategory {
  const lowerDesc = description.toLowerCase();
  for (const category of Object.values(ItemCategory)) {
    if (CATEGORY_KEYWORDS[category].some((keyword) => lowerDesc.includes(keyword))) {
      return category;
    }
  }
  return ItemCategory.OTHER;
}
