import {Basket} from './models';
import {InputParser} from './parsers';
import {TaxCalculator, ReceiptBuilder, ReceiptPrinter} from './services';
import readline from 'readline';

/**
 * Processes a shopping basket input string, builds a receipt, and prints it.
 * @param input - Multiline string representing basket items.
 */
function processInput(input: string): void {
  const parser = new InputParser();
  const items = parser.parse(input);
  const basket = new Basket();
  items.forEach((item) => basket.addItem(item));
  const taxCalculator = new TaxCalculator();
  const receipt = new ReceiptBuilder().setBasket(basket).setTaxCalculator(taxCalculator).build();
  new ReceiptPrinter().print(receipt);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLines: string[] = [];

console.log('Enter basket(s), separated by an empty line. Press Enter twice to finish:');

rl.on('line', (line: string) => {
  inputLines.push(line);
  // If two consecutive empty lines, finish input
  if (
    inputLines.length >= 2 &&
    inputLines[inputLines.length - 1].trim() === '' &&
    inputLines[inputLines.length - 2].trim() === ''
  ) {
    rl.close();
  }
});

rl.on('close', () => {
  // Split input into baskets by double newlines
  const baskets = inputLines
    .join('\n')
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  baskets.forEach((basketInput, idx) => {
    if (basketInput) {
      processInput(basketInput);
      if (idx < baskets.length - 1) {
        console.log('');
      }
    }
  });
});
