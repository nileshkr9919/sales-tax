import sinon from 'sinon';
import assert from 'assert';
import {ReceiptPrinter, TaxCalculator} from '../../src/services';
import {Basket, Item} from '../../src/models';
import {roundUpToNearest005} from '../../src/utils';
import {ItemCategory} from '../../src/enums';

describe('ReceiptPrinter', function () {
  let basket: Basket;
  let taxCalculator: TaxCalculator;
  let builder: any;

  beforeEach(function () {
    basket = new Basket();
    taxCalculator = new TaxCalculator();
    builder = {
      setBasket: function () {
        return this;
      },
      setTaxCalculator: function () {
        return this;
      },
      build: function () {
        return {
          getLines: () => [{quantity: 1, description: 'music CD', priceWithTax: 16.49}],
          getSalesTaxes: () => 1.5,
          getTotal: () => 16.49,
        };
      },
    };
  });

  it('prints receipt output', function () {
    const receipt = builder.build();
    const printer = new ReceiptPrinter();
    const logSpy = sinon.spy(console, 'log');
    printer.print(receipt);
    assert(logSpy.calledWith('1 music CD: 16.49'));
    assert(logSpy.calledWith('Sales Taxes: 1.50'));
    assert(logSpy.calledWith('Total: 16.49'));
    logSpy.restore();
  });
});

describe('TaxCalculator', function () {
  it('covers calculate and roundUpToNearest005 edge cases', function () {
    const taxCalculator = new TaxCalculator();
    // Exempt and not imported
    const item1 = new Item('book', 10, false, ItemCategory.BOOK);
    assert.strictEqual(taxCalculator.calculate(item1), 0);
    // Not exempt, not imported
    const item2 = new Item('music CD', 14.99, false, ItemCategory.OTHER);
    assert.strictEqual(taxCalculator.calculate(item2), 1.5);
    // Exempt, imported
    const item3 = new Item('chocolate', 10, true, ItemCategory.FOOD);
    assert.strictEqual(taxCalculator.calculate(item3), 0.5);
    // Not exempt, imported
    const item4 = new Item('perfume', 47.5, true, ItemCategory.OTHER);
    assert.strictEqual(taxCalculator.calculate(item4), 7.15);
    // Directly test roundUpToNearest005
    assert.strictEqual(roundUpToNearest005(0.562), 0.6);
    assert.strictEqual(roundUpToNearest005(1.0), 1.0);
  });
});
