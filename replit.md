# 2 Days Early Investment Syndicate

## Overview

This is a full-stack web application for "2 Days Early", an investment syndicate focused on operator-led investments. The platform serves as a marketing website to showcase the syndicate's purpose, principles, portfolio companies, and partners, while providing a way for interested operators to join through an integrated form system.

The application features a neobrutalism design aesthetic with bold colors, sharp borders, and dramatic shadows to create a distinctive visual identity that reflects the syndicate's bold investment approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript for type safety and modern development practices.

**Routing**: Wouter for lightweight client-side routing, chosen for its minimal bundle size and simple API.

**State Management**: TanStack Query (React Query) for server state management and caching, providing efficient data fetching and synchronization.

**Styling**: 
- Tailwind CSS for utility-first styling
- Custom neobrutalism components with bold borders, shadows, and vibrant colors
- Radix UI components for accessible, unstyled primitives
- shadcn/ui component library for consistent design patterns

**Animation**: Framer Motion for smooth page transitions and scroll-based animations, enhancing user experience without compromising performance.

**Build System**: Vite for fast development server and optimized production builds, with hot module replacement for rapid development.

### Backend Architecture

**Server Framework**: Express.js running on Node.js for handling API requests and serving static files.

**Development Setup**: The server runs alongside Vite in development mode, with middleware integration for seamless hot reloading.

**Static File Serving**: Express serves the built client files in production, with proper routing fallback for single-page application behavior.

### Data Architecture

**Database**: PostgreSQL with Drizzle ORM for type-safe database operations and schema management.

**Schema Design**: Simple user table structure with username/password fields, designed for future authentication expansion.

**Database Connection**: Neon serverless PostgreSQL with WebSocket support for optimal performance.

**Migrations**: Drizzle Kit for database schema migrations and synchronization.

### UI/UX Design System

**Design Philosophy**: Neobrutalism with high contrast, bold typography, and geometric shapes to convey strength and reliability.

**Typography**: Courier New monospace font throughout for consistency with the technical, operator-focused brand.

**Color Scheme**: Vibrant primary colors (red #ef4444) with high contrast backgrounds and accent colors for different sections.

**Component Library**: Comprehensive set of reusable components built on Radix UI primitives for accessibility and consistency.

### Performance Optimizations

**Code Splitting**: React lazy loading and dynamic imports for optimal bundle sizes.

**Image Optimization**: Custom Image component with fallback handling and loading states.

**Animation Performance**: Framer Motion's LazyMotion for reduced bundle size and optimized animations.

**Caching Strategy**: React Query provides intelligent caching and background updates for server data.

## External Dependencies

### Form Integration
- **Tally Forms**: Embedded form widget for collecting operator applications and contact information
- Integration includes custom styling and event handling for seamless user experience

### Development Tools
- **TypeScript**: Full type safety across the application
- **ESLint/Prettier**: Code quality and formatting (implicit in modern React setup)
- **PostCSS**: CSS processing for Tailwind CSS

### UI Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Lucide React**: Modern icon library for consistent iconography
- **shadcn/ui**: Pre-built component library based on Radix UI

### Animation and Interaction
- **Framer Motion**: Declarative animations and gesture handling
- **Embla Carousel**: Lightweight carousel component for portfolio showcase

### Utilities
- **clsx**: Conditional CSS class composition
- **class-variance-authority**: Type-safe variant API for component styling
- **date-fns**: Date manipulation and formatting utilities

### Database and Backend
- **Drizzle ORM**: Type-safe database toolkit with excellent TypeScript integration
- **Neon**: Serverless PostgreSQL database with WebSocket support
- **ws**: WebSocket library for database connections

The architecture prioritizes developer experience, type safety, and performance while maintaining a clean separation of concerns between the presentation layer, business logic, and data persistence.