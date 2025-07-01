# Sales Tax System

## Overview

This application is a TypeScript-based receipt and sales tax calculation system. It processes shopping baskets, applies tax rules, and generates formatted receipts. The project is designed with SOLID and OOP principles, ensuring maintainability, extensibility, and testability.

---

## Architecture Diagram

```
+-------------------+        +---------------------+        +---------------------+
|    InputParser    | -----> |    Item, Basket     | -----> |   ReceiptBuilder    |
+-------------------+        +---------------------+        +---------------------+
                                                              |         |
                                                              v         v
                                                      +---------------------+
                                                      |   TaxCalculator     |
                                                      +---------------------+
                                                              |
                                                              v
                                                      +---------------------+
                                                      |   Receipt           |
                                                      +---------------------+
                                                              |
                                                              v
                                                      +---------------------+
                                                      |   ReceiptPrinter    |
                                                      +---------------------+
```

---

## What Does the Application Do?

- **Parses input** describing purchased items (name, price, imported, exempt).
- **Calculates sales tax** and import duty according to business rules.
- **Groups identical items** and sums their quantities.
- **Builds a receipt** with itemized lines, total sales taxes, and total amount.
- **Prints the receipt** in a human-readable format.

---

## How Does It Work?

1. **Input Parsing:**  
   The `InputParser` reads raw input and converts it into `Item` objects, identifying imported and tax-exempt items using keywords.

2. **Tax Calculation:**  
   The `TaxCalculator` service computes basic sales tax and import duty for each item, using configurable rates and a utility for rounding up to the nearest 0.05.

3. **Receipt Building:**  
   The `ReceiptBuilder` service groups items, applies taxes, and creates a `Receipt` object with all lines and totals.

4. **Receipt Printing:**  
   The `ReceiptPrinter` service formats and prints the receipt to the console.

---

## Project Structure

```
src/
  models/         # Domain models (item, basket, receipt)
  services/       # Business logic (receipt-builder, tax-calculator, receipt-printer)
  interfaces/     # TypeScript interfaces for services
  constants/      # Domain constants
  utils/          # Utility functions
tests/
  unit/           # Unit tests for each business logic file
```

---

## Technical Decisions

- **SOLID Principles:**  
  - Each service has a single responsibility and is accessed via an interface.
  - Dependency inversion is achieved by programming to interfaces.
- **TypeScript:**  
  - All entities, services, and utilities are strongly typed.
  - Interfaces are used for contracts, not just for documentation.
- **Test Organization:**  
  - Unit tests are outside `src` for separation of concerns.
  - Each business logic file has a corresponding test file.
- **No Global State:**  
  - All logic is encapsulated in classes or functions.
- **No Framework Lock-in:**  
  - The codebase is framework-agnostic and can be adapted for CLI, web, or API use.

---

## Requirements

- Node.js (v18+ recommended)
- npm

---

## How to Run

1. Install dependencies:  
   `npm install`

2. Build the project:  
   `npm run build`

3. Run tests:  
   `npm test`

4. Run with sample input (see `src/index.ts` for CLI usage).

---

## Extensibility

- Add new tax rules by extending the `TaxCalculator` service and updating constants.
- Add new output formats by implementing the `IReceiptPrinter` interface.
- Integrate with web or API layers by reusing the service and model layers.

---

## Contact

For questions or contributions, please open an issue or pull request.
