-- Create tables for your Next.js webshop schema

-- Create enum type for OrderStatus if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OrderStatus') THEN
        CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
    END IF;
END
$$;

-- Create Product table
CREATE TABLE IF NOT EXISTS "Product" (
  "id" TEXT PRIMARY KEY,
  "articleNumber" TEXT UNIQUE,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "stock" INTEGER NOT NULL DEFAULT 0
);

-- Create Category table
CREATE TABLE IF NOT EXISTS "Category" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL
);

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT,
  "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- Create Address table
CREATE TABLE IF NOT EXISTS "Address" (
  "id" TEXT PRIMARY KEY,
  "address" TEXT NOT NULL,
  "zipcode" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "phone" TEXT NOT NULL
);

-- Create Order table
CREATE TABLE IF NOT EXISTS "Order" (
  "id" TEXT PRIMARY KEY,
  "orderNr" TEXT,
  "userId" TEXT,
  "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "addressId" TEXT,
  "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
  FOREIGN KEY ("userId") REFERENCES "User"("id"),
  FOREIGN KEY ("addressId") REFERENCES "Address"("id")
);

-- Create OrderItem table
CREATE TABLE IF NOT EXISTS "OrderItem" (
  "id" TEXT PRIMARY KEY,
  "image" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "quantity" INTEGER NOT NULL,
  "orderId" TEXT NOT NULL,
  FOREIGN KEY ("orderId") REFERENCES "Order"("id")
);

-- Create junction table for Product and Category (many-to-many)
CREATE TABLE IF NOT EXISTS "_ProductCategories" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL,
  FOREIGN KEY ("A") REFERENCES "Product"("id"),
  FOREIGN KEY ("B") REFERENCES "Category"("id"),
  UNIQUE ("A", "B")
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX IF NOT EXISTS "_ProductCategories_A_idx" ON "_ProductCategories"("A");
CREATE INDEX IF NOT EXISTS "_ProductCategories_B_idx" ON "_ProductCategories"("B");
