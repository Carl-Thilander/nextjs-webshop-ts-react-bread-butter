# Entity Relationship Diagram

## Database Schema Overview

```
+------------------+ +------------------+ +------------------+
| Category         | | Product          | | OrderItem        |
+------------------+ +------------------+ +------------------+
| PK CategoryId    |<------| PK ProductId | | PK OrderItemId   |
| category_name    |       | FK CategoryId| | FK OrderId       |
+------------------+       | title        | | FK ProductId     |
                           | description  | | quantity         |
                           | image_url    | | price            |
                           | price        | +------------------+
                           | stock        |
                           | created_at   |
                           +------------------+

+------------------+ +------------------+ +------------------+
| User             | | Order            | | Address          |
+------------------+ +------------------+ +------------------+
| PK UserId        |<------| PK OrderId   |<------| PK AddressId |
| name             |       | FK UserId    |       | street       |
| email            |       | FK AddressId |       | zipcode      |
| password         |       | status       |       | city         |
| isAdmin: boolean |       | created_at   |       | country      |
| orders: Order[]  |       +------------------+   | phone        |
+------------------+                               | orders: Order[] |
                                                   +------------------+
```

## Key Relationships

- **User** → **Order**: One-to-Many (A user can have multiple orders)
- **Order** → **OrderItem**: One-to-Many (An order contains multiple items)
- **Product** → **OrderItem**: One-to-Many (A product can be in multiple order items)
- **Category** → **Product**: Many-to-Many (Products can have multiple categories)
- **Address** → **Order**: One-to-Many (An address can be used for multiple orders)

## Order Status Flow

```
PENDING → CONFIRMED → SHIPPED → DELIVERED
                   ↘ CANCELLED
```

## Business Rules

1. Users must be authenticated to place orders
2. Admin users can manage products and view all orders
3. Stock levels are automatically decremented when orders are placed
4. Order items store snapshot data (price, title) to preserve historical information
5. Multiple categories per product are supported for better filtering
