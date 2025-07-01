import assert from 'assert';
import {Basket, Item} from '../../src/models';
import {TaxCalculator, ReceiptBuilder} from '../../src/services';
import {ItemCategory} from '../../src/enums';

describe('ReceiptBuilder', function () {
  let basket: Basket;
  let taxCalculator: TaxCalculator;
  let builder: ReceiptBuilder;

  beforeEach(function () {
    basket = new Basket();
    taxCalculator = new TaxCalculator();
    builder = new ReceiptBuilder();
  });

  it('throws error if basket or taxCalculator is not set', function () {
    const builder = new ReceiptBuilder();
    assert.throws(() => builder.build(), /Basket and TaxCalculator must be set/);
    builder.setBasket(new Basket());
    assert.throws(() => builder.build(), /Basket and TaxCalculator must be set/);
    builder.setTaxCalculator(new TaxCalculator());
    builder.build();
  });

  it('generates receipt for exempt, non-imported item', function () {
    basket.addItem(new Item('book', 12.49, false, ItemCategory.BOOK));
    const receipt = builder.setBasket(basket).setTaxCalculator(taxCalculator).build();
    assert.deepStrictEqual(receipt.getLines(), [
      {quantity: 1, description: 'book', priceWithTax: 12.49},
    ]);
    assert.strictEqual(receipt.getSalesTaxes(), 0);
    assert.strictEqual(receipt.getTotal(), 12.49);
  });

  it('generates receipt for non-exempt, non-imported item', function () {
    basket.addItem(new Item('music CD', 14.99, false, ItemCategory.OTHER));
    const receipt = builder.setBasket(basket).setTaxCalculator(taxCalculator).build();
    assert.deepStrictEqual(receipt.getLines(), [
      {quantity: 1, description: 'music CD', priceWithTax: 16.49},
    ]);
    assert.strictEqual(receipt.getSalesTaxes(), 1.5);
    assert.strictEqual(receipt.getTotal(), 16.49);
  });

  it('generates receipt for exempt, imported item', function () {
    basket.addItem(new Item('chocolate bar', 10.0, true, ItemCategory.FOOD));
    const receipt = builder.setBasket(basket).setTaxCalculator(taxCalculator).build();
    assert.deepStrictEqual(receipt.getLines(), [
      {quantity: 1, description: 'imported chocolate bar', priceWithTax: 10.5},
    ]);
    assert.strictEqual(receipt.getSalesTaxes(), 0.5);
    assert.strictEqual(receipt.getTotal(), 10.5);
  });

  it('generates receipt for non-exempt, imported item', function () {
    basket.addItem(new Item('perfume', 47.5, true, ItemCategory.OTHER));
    const receipt = builder.setBasket(basket).setTaxCalculator(taxCalculator).build();
    assert.deepStrictEqual(receipt.getLines(), [
      {quantity: 1, description: 'imported perfume', priceWithTax: 54.65},
    ]);
    assert.strictEqual(receipt.getSalesTaxes(), 7.15);
    assert.strictEqual(receipt.getTotal(), 54.65);
  });

  it('groups identical items and sums quantities', function () {
    basket.addItem(new Item('book', 12.49, false, ItemCategory.BOOK));
    basket.addItem(new Item('book', 12.49, false, ItemCategory.BOOK));
    const receipt = builder.setBasket(basket).setTaxCalculator(taxCalculator).build();
    assert.deepStrictEqual(receipt.getLines(), [
      {quantity: 2, description: 'book', priceWithTax: 24.98},
    ]);
    assert.strictEqual(receipt.getSalesTaxes(), 0);
    assert.strictEqual(receipt.getTotal(), 24.98);
  });
});
