# Copilot Instructions

## Product Overview

This project is a static, client-side prototype for a fruit shopping app. The goal is to demonstrate a simple e-commerce flow with product browsing, product details, shopping cart management, and a basic checkout screen. The prototype should be easy for GitHub Copilot Agent to generate and should focus on core functionality rather than production-ready features.

## Target Audience

The prototype is intended for online shoppers interested in ordering fruit products. The experience should be simple, clear, and usable on both desktop and phone screens.

## Prototype Goal

The goal of the prototype is to validate the basic shopping journey and page structure using HTML, CSS, and JavaScript only. The app should demonstrate:

- Basic use case functionality
- Simple navigation between pages
- A sample dataset
- Basic styling
- A layout that scales correctly on small and large screens

## Scope

The app must include these pages:

- Products
- ProductDetails
- ShoppingCart
- Checkout

The app must support:

- Browsing products
- Viewing product details
- Adding items to a cart with quantity selection
- Updating cart quantities
- Removing items from the cart
- Reviewing the order summary
- Simulating order processing with a Process Order action

## User Interface Requirements

The interface should include a left-side navigation menu that allows navigation between all pages.

The navigation menu should:

- Stay visible on the left side of the screen on normal layouts
- Collapse to a compact form showing an emoji when the display width drops below 600 pixels
- Continue to provide access to the app pages after collapsing

Additional UI requirement:

- Each navigation item must include a representative emoji visible in the nav bar. When the nav is collapsed (below 600px), the emoji should be centered horizontally inside the nav link and the text label should be hidden, preserving navigation access via the emoji buttons.

The UI should be visually appealing with basic styling, but it does not need to be fully polished. The layout should automatically scale to look correct on desktop and phone devices.

## Product Dataset

The prototype should use a simple local dataset with 10 fruit products.

Each product should include:

- Product name
- Description
- Price per unit
- Unit type, such as each, ounce, pound, or other simple unit
- A simple image representation, preferably an emoji

The dataset should be sufficient to power all pages without any backend dependency.

## Page Requirements

### Products Page

The Products page should display a list of products with basic information, including:

- Product name
- Price per unit
- Emoji image

The page should also let the user:

- Select a quantity for a product
- Add the selected item to the shopping cart
- Open the ProductDetails page for a selected product

### ProductDetails Page

The ProductDetails page should display detailed information for a selected product from the Products page, including:

- Product name
- Description
- Price per unit
- Emoji image

The page should also provide a way to navigate back to the Products page.

### ShoppingCart Page

The ShoppingCart page should display products added to the cart, including:

- Product name
- Quantity
- Total price for that product

The page should also let the user:

- Update the quantity of each product in the cart
- Remove products from the cart

### Checkout Page

The Checkout page should display a summary of the products being purchased, including:

- Product name
- Quantity
- Price

The total price should be clearly displayed.

The page should include a Process Order button that simulates completing the order.

## Low-Fidelity Wireframes

The layouts below describe the intended page structure and navigation behavior. They are intentionally simple and text-based so GitHub Copilot Agent can translate them into a basic prototype without overdesigning the UI.

### Desktop Layout with Expanded Navigation

```text
---------------------------------------------------------------
| Nav |                   App Header / Title                  |
|---- |--------------------------------------------------------|
| P   |  Page Content Area                                     |
| r   |  ----------------------------------------------------  |
| o   |  | Page-specific content goes here                  |  |
| d   |  |                                                  |  |
| u   |  | Products / Details / Cart / Checkout content     |  |
| c   |  |                                                  |  |
| t   |  ----------------------------------------------------  |
| s   |                                                        |
| D   |  Optional footer or spacing                            |
| e   |                                                        |
| t   |                                                        |
| a   |                                                        |
| i   |                                                        |
| l   |                                                        |
| s   |                                                        |
| C   |                                                        |
| a   |                                                        |
| r   |                                                        |
| t   |                                                        |
| C   |                                                        |
| h   |                                                        |
| e   |                                                        |
| c   |                                                        |
| k   |                                                        |
| o   |                                                        |
| u   |                                                        |
| t   |                                                        |
---------------------------------------------------------------
```

### Desktop or Mobile Layout with Collapsed Navigation

When the available width drops below 600 pixels, the left navigation should collapse to a compact abbreviated form while preserving access to all pages.

Note: the collapse breakpoint was updated from 300px to 600px to provide a better experience on small laptops and larger phones/tablets; ensure the implementation uses 600px as the threshold for both CSS and JS logic.

```text
---------------------------------------------
| P  | App Title or Compact Header         |
| D  |                                     |
| C  |  Page Content Area                  |
| O  |  - Products                         |
|    |  - ProductDetails                   |
|    |  - ShoppingCart                     |
|    |  - Checkout                         |
---------------------------------------------
```

Suggested abbreviations for the collapsed navigation:

- P = Products
- D = ProductDetails
- C = ShoppingCart
- O = Checkout

### Products Page Wireframe

```text
---------------------------------------------------------------
| Left Nav | Products                                           |
|----------|----------------------------------------------------|
|          | [Product Card 1]  🍎 Apple                          |
|          |                $1.25 / each                        |
|          |                Qty [ - 1 + ]  [Add to Cart]         |
|          |                [View Details]                       |
|          |----------------------------------------------------|
|          | [Product Card 2]  🍌 Banana                         |
|          |                $0.75 / each                        |
|          |                Qty [ - 1 + ]  [Add to Cart]         |
|          |                [View Details]                       |
|          |----------------------------------------------------|
|          | ... repeat for 10 fruit products ...               |
---------------------------------------------------------------
```

### ProductDetails Page Wireframe

```text
---------------------------------------------------------------
| Left Nav | Product Details                                    |
|----------|-----------------------------------------------------|
|          | 🍇 Grape Fruit Name                                |
|          | Description: Detailed product information here.    |
|          | Price: $2.10 / pound                               |
|          | Unit: pound                                        |
|          |                                                    |
|          | [Back to Products]   [Add to Cart]                 |
---------------------------------------------------------------
```

### ShoppingCart Page Wireframe

```text
---------------------------------------------------------------
| Left Nav | Shopping Cart                                      |
|----------|-----------------------------------------------------|
|          | Product        Qty     Unit Price   Total          |
|          |-----------------------------------------------------|
|          | Apple          [ 2 ]   $1.25       $2.50           |
|          |                [-][+]   [Remove]                   |
|          | Banana         [ 3 ]   $0.75       $2.25           |
|          |                [-][+]   [Remove]                   |
|          |-----------------------------------------------------|
|          | Cart Total: $4.75                                  |
|          | [Continue Shopping]   [Go to Checkout]             |
---------------------------------------------------------------
```

### Checkout Page Wireframe

```text
---------------------------------------------------------------
| Left Nav | Checkout                                           |
|----------|-----------------------------------------------------|
|          | Order Summary                                      |
|          |-----------------------------------------------------|
|          | Apple      Qty 2   $2.50                           |
|          | Banana     Qty 3   $2.25                           |
|          |-----------------------------------------------------|
|          | Total: $4.75                                       |
|          |                                                    |
|          | [Process Order]                                    |
---------------------------------------------------------------
```

## Technical Requirements

The prototype must be implemented as a client-side web app using:

- HTML
- CSS
- JavaScript

Additional technical constraints:

- No backend functionality
- No user authentication
- No payment processing
- No database integration
- Static prototype only

The app should still maintain basic shopping state across navigation so the cart and selected product behavior works as expected.

## Navigation and State Behavior

Navigation between pages should be simple and clear.

The app should support:

- Clicking a product to view its details
- Navigating between Products, ProductDetails, ShoppingCart, and Checkout
- Keeping cart contents available while moving through the app
- Showing the current cart contents in the shopping flow

## Use Cases

The prototype should satisfy these high-level use cases:

- A user browses the list of fruit products
- A user opens the details for a selected product
- A user selects a quantity and adds a product to the cart
- A user reviews the items in the cart
- A user changes quantities or removes items from the cart
- A user reviews the checkout summary
- A user clicks Process Order to simulate purchase completion

## Acceptance Criteria

The prototype is complete when:

- The four requested pages exist
- The left navigation menu works
- The navigation menu collapses below 300 pixels wide
- The Products page shows 10 fruit products from a sample dataset
- Each product includes a name, description, price per unit, unit type, and emoji image
- The ProductDetails page shows information for the selected product
- The ShoppingCart page shows product name, quantity, and total price
- Cart quantities can be updated
- Cart items can be removed
- The Checkout page shows an order summary and total price
- The Process Order action is present and works as a simulated completion step
- The app uses only HTML, CSS, and JavaScript
- The app runs as a static client-side prototype with no backend dependencies

## Out of Scope

The prototype does not need to include:

- Authentication
- Real payment processing
- Backend APIs
- Database integration
- User accounts
- Advanced search or filtering
- Production-grade responsiveness or polish

## Implementation Guidance for Copilot Agent

When generating the prototype, prioritize:

- A clean file structure
- Clear page-level navigation
- Simple and understandable JavaScript
- Small, reusable data structures for the 10 fruit products
- Basic but attractive styling
- Behavior that works reliably on desktop and mobile screen sizes

Keep the implementation lightweight and focused on the required prototype features rather than overengineering.
