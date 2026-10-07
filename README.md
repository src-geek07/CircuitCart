# CircuitCart

A simple electronics e-commerce app built with **React Native + Expo**. No backend, no real payment — product data comes from a local JSON file, and the cart/wishlist/orders are stored on-device using AsyncStorage.

## Features

- Browse electronics (phones, laptops, audio, accessories, computer gear)
- Product detail screen with description, rating, and stock
- Search products by name
- Add to Cart (quantity +/-, remove item)
- Wishlist (save/remove items)
- Simple checkout flow with payment method selection (UPI / Card / COD)
- Order history (saved locally)
- Profile screen

## Tech Stack

- **React Native** + **Expo**
- **TypeScript** (`.tsx`)
- **Expo Router** — file-based navigation (routes = files in `app/`)
- **Context API** (`useState`, no reducers) for Cart and Wishlist state
- **AsyncStorage** — persists cart, wishlist, and orders on-device
- **Local JSON file** (`src/data/products.json`) — no API, no backend

## Project Structure

```
circuitcart/
├── app.json, package.json, tsconfig.json, babel.config.js
└── src/
    ├── app/                       
    │   ├── _layout.tsx              
    │   ├── checkout.tsx
    │   ├── order-confirmation.tsx
    │   ├── order-history.tsx
    │   ├── product/[id].tsx
    │   └── (tabs)/
    │       ├── _layout.tsx          ← bottom tab bar config
    │       ├── index.tsx             ← Home tab
    │       ├── cart.tsx
    │       ├── wishlist.tsx
    │       └── profile.tsx
    ├── screens/                    ← the actual screen UI (imported by app/ routes)
    │   ├── HomeScreen.tsx
    │   ├── ProductDetailScreen.tsx
    │   ├── CartScreen.tsx
    │   ├── WishlistScreen.tsx
    │   ├── CheckoutScreen.tsx
    │   ├── OrderConfirmationScreen.tsx
    │   ├── OrderHistoryScreen.tsx
    │   └── ProfileScreen.tsx
    ├── components/
    │   ├── ProductCard.tsx
    │   ├── CartItem.tsx
    │   └── RatingStars.tsx
    ├── context/
    │   ├── CartContext.tsx          ← useCart() hook
    │   └── WishlistContext.tsx      ← useWishlist() hook
    └── data/
        └── products.json            ← all product data lives here, edit directly
```

## Data Flow

1. `src/data/products.json` holds every product — no fetching, just imported directly.
2. `CartContext` and `WishlistContext` hold cart/wishlist state using `useState`, and save to AsyncStorage every time they change.
3. Any screen can read/update the cart or wishlist with `useCart()` / `useWishlist()`.
4. Checkout builds an order object, saves it into an `orders` list in AsyncStorage, clears the cart, then navigates to the confirmation screen.
5. Order History reads that `orders` list back out whenever the screen is focused.

## Getting Started

```bash
npx create-expo-app circuitcart --template expo-template-blank-typescript
cd circuitcart

npx expo install @expo/vector-icons @react-native-async-storage/async-storage expo-router react-native-safe-area-context react-native-screens

npx expo start
```

Scan the QR code with Expo Go, or press `a` / `i` for an emulator.

## Notes

- No backend, no real authentication, no real payments — everything runs on-device.
- Product images are placeholder images (`placehold.co`) labeled with each product name — swap in real photos later by changing the `image` URL in `products.json`, or using local assets with `require()`.
- `strict` is turned off in `tsconfig.json` so that there is no need to type every prop.
