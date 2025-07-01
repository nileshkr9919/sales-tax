import {Receipt} from '../models/receipt.model';

export interface IReceiptPrinter {
  print(receipt: Receipt): void;
}
