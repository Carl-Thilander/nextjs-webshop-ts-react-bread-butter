# ☕ Bean & Leaf

<div align="center">

**A premium coffee & tea e-commerce platform built with Next.js**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8.2-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Material-UI](https://img.shields.io/badge/MUI-6.4.7-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](https://opensource.org/licenses/ISC)

</div>

## 🌟 About

**Bean & Leaf** is a full-stack e-commerce platform specializing in premium coffee beans and tea leaves. Built with modern web technologies, it provides a seamless shopping experience with robust authentication, admin management, and responsive design.

### 🎯 Business Concept

A curated marketplace for coffee enthusiasts and tea lovers, offering:

- **Premium Coffee Beans** - Carefully selected single-origin and specialty blends
- **Artisan Tea Leaves** - Traditional and contemporary tea varieties
- **Decaf Options** - Full-flavor experiences without the caffeine
- **Limited Sales** - Exclusive deals on seasonal favorites

## ✨ Features

### 🛒 **E-commerce Core**

- **Product Catalog** - Browse premium coffee beans and tea leaves with detailed descriptions
- **Shopping Cart** - Add/remove items with persistent localStorage storage
- **Category Filtering** - Filter products by Coffee, Tea, Decaf, and Sale categories
- **Stock Management** - Real-time stock tracking and low-stock warnings
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile

### 🔐 **Authentication & Security**

- **NextAuth.js Integration** - Secure authentication with Google OAuth and credentials
- **Password Security** - bcrypt hashing for secure password storage
- **Role-based Access** - Admin and customer role management
- **Session Management** - JWT-based session handling with configurable expiry

### 🛍️ **Shopping Experience**

- **Product Details** - Comprehensive product pages with high-quality images
- **Cart Management** - Update quantities, remove items, view totals
- **Checkout Process** - Multi-step checkout with address validation
- **Order Confirmation** - Detailed order receipts with tracking numbers

### 📝 **Form Validation & UX**

- **Zod Schema Validation** - Type-safe form validation throughout the app
- **Real-time Feedback** - Instant validation feedback on form inputs
- **Auto-fill Support** - Browser autofill compatibility for faster checkout
- **Toast Notifications** - User-friendly success and error messages

### 📊 **Admin Dashboard**

- **Product Management** - Full CRUD operations for products
- **Order Management** - View all orders with status updates
- **Stock Control** - Update inventory levels and track availability
- **Category Management** - Organize products with multiple categories

### 👤 **Customer Account Features**

- **Order History** - View past orders with detailed breakdowns
- **Order Status Tracking** - Track order progress from pending to shipped
- **Profile Management** - Update personal information and preferences
- **Address Management** - Save delivery addresses for faster checkout

## 🏗️ **Technical Architecture**

### **Frontend Stack**

- **Next.js 15.2.1** - React framework with App Router for optimal performance
- **TypeScript 5.8.2** - Type-safe development with enhanced developer experience
- **Material-UI 6.4.7** - Comprehensive component library with theming support
- **React Hook Form** - Efficient form handling with minimal re-renders

### **Backend & Database**

- **Prisma 6.8.2** - Type-safe database ORM with migration support
- **PostgreSQL** - Production-ready relational database
- **NextAuth.js 5.0** - Complete authentication solution
- **Server Actions** - Type-safe server-side operations

### **Data Validation & Security**

- **Zod 3.25.20** - Runtime type validation for forms and API endpoints
- **bcryptjs** - Secure password hashing
- **Rate Limiting** - API protection against abuse
- **CSRF Protection** - Built-in security features

### **Development & Testing**

- **ESLint** - Code quality and consistency enforcement
- **TypeScript Strict Mode** - Maximum type safety
- **Hot Module Replacement** - Fast development feedback

## 📋 Database Schema

The application uses a comprehensive relational database schema:

### **Core Entities**

- **Users** - Customer accounts with authentication and admin roles
- **Products** - Coffee and tea inventory with categories and stock levels
- **Orders** - Purchase records with items and delivery information
- **Categories** - Product organization system
- **Addresses** - Customer delivery information

### **Key Relationships**

- Users can have multiple Orders
- Orders contain multiple OrderItems
- Products belong to multiple Categories (many-to-many)
- Orders are linked to delivery Addresses

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn package manager
- PostgreSQL database (or compatible provider)

### **Installation**

1. **Clone the repository**

```bash
git clone <repository-url>
cd nextjs-webshop-ts-react-bread-butter
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"
DIRECT_URL="your-direct-database-url"

# NextAuth.js
AUTH_SECRET="your-secret-key"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Admin
ADMIN_EMAIL="admin@example.com"
```

4. **Database Setup**

```bash
# Synchronize Prisma schema with database
npm run push

# Populate database with sample data
npm run seed
```

### **Development Server**

```bash
# Start development server with Turbopack
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### **Database Management**

```bash
# View and edit data in Prisma Studio
npm run studio

# Create and apply migrations
npx prisma migrate dev

# Reset database (careful!)
npx prisma migrate reset
```

### **Admin Setup**

```bash
# Make a user admin by email
npx tsx scripts/make-admin.ts user@example.com
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart functionality
│   ├── checkout/          # Checkout process
│   ├── components/        # Reusable UI components
│   ├── confirmation/      # Order confirmation
│   ├── orders/            # Customer order history
│   └── product/           # Product detail pages
├── actions/               # Server actions
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── scripts/               # Utility scripts
└── types/                 # TypeScript type definitions
```

## 🛡️ Security Features

- **Password Hashing** - bcrypt with salt rounds for secure storage
- **Session Security** - JWT tokens with configurable expiration
- **Input Validation** - Comprehensive Zod schemas on all endpoints
- **Rate Limiting** - Protection against API abuse
- **Role-based Access** - Admin-only routes and operations
- **CSRF Protection** - Built-in Next.js security features

## 🌐 API Endpoints

### **Authentication**

- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints
- Server actions for user registration and profile management

### **Products**

- Server actions for product CRUD operations (admin only)
- Public product fetching through Prisma queries

### **Orders**

- Server actions for order creation and management
- Customer order history retrieval

## 🧪 Testing Strategy

The application includes comprehensive testing:

- **Component Testing** - React component behavior validation
- **API Testing** - Server action and database operation testing
- **Type Safety** - TypeScript compile-time validation

## 📈 Performance Optimizations

- **Next.js App Router** - Optimized routing and rendering
- **Image Optimization** - Next.js built-in image optimization
- **Bundle Splitting** - Automatic code splitting for faster loads
- **Caching Strategy** - Prisma query optimization and Next.js caching
- **Responsive Design** - Mobile-first approach for all devices

## 🚀 Deployment

### **Vercel Deployment**

The application is optimized for Vercel deployment:

```bash
npm run build
```

**Note**: For production deployment, you'll need a PostgreSQL database provider (not SQLite) as Vercel doesn't support file-based databases.

### **Environment Variables**

Ensure all production environment variables are configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by the Bread & Butter development team.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Review the documentation above
3. Create a new issue with detailed information

---

<div align="center">

**[🌟 Star this repository](../../stargazers) if you found it helpful!**

</div>
