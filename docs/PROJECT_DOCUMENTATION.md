# Project Documentation

## 1. Purpose

Osijek Info Kiosk is a public-facing digital information system for the city of Osijek. It is intended to function as an interactive terminal that presents city information, services, events, tourism content, a map, weather, and an official contact form.

The system is built for kiosk usage, which means the application should remain visually simple, easy to navigate, and resilient to inactivity.

## 2. System architecture

The solution consists of three principal parts:

### 2.1 Client application

The client is implemented with Expo and React Native. It runs as a kiosk-style application and uses:

- a screensaver mode when idle
- a language toggle for Croatian and English
- dynamic content loading from the backend API
- tab-based navigation for tourism, services, map, and mayor contact
- weather, clock, and server uptime widgets
- a custom kiosk inactivity timer and activity detection

The main entry point is `client/src/app/index.tsx`. This file initializes the kiosk UI, handles inactivity timeout logic, and renders the active screen.

### Relevant technologies used on the client side

- Expo SDK and Expo Router
- React Native + React 19
- TypeScript
- Native UI components and animations
- React Native Reanimated and Gesture Handler
- React Native SVG and QR code rendering
- Expo Image, Font, AV, Device, System UI, and Web Browser plugins
- local asset-based branding and background images

### 2.2 Backend API

The backend is implemented in Express and serves data to the client. It is responsible for:

- serving city items and locations
- returning system health information
- validating and sending contact emails
- exposing a simple API layer for kiosk content

The server entry point is `server/server.ts`.

### Relevant technologies used on the server side

- Node.js
- Express 5
- TypeScript
- Sequelize ORM
- MySQL2 database driver
- dotenv for environment variables
- CORS middleware
- Zod validation
- Nodemailer for outgoing email
- express-rate-limit for request throttling
- Winston for logging

### 2.3 Database layer

MySQL is used as the persistent data store. Sequelize is used as the ORM layer and performs model-based database access.

The database is created automatically during startup if it does not already exist. Data models include items, galleries, lines, departures, and map locations.

## 3. Tools and infrastructure used

The project is set up for local containerized development and deployment:

- Docker
- Docker Compose
- MySQL 8 container
- npm package manager
- tsx for rapid backend development
- ESLint for static code checking
- TypeScript compiler for build validation

This combination allows the kiosk app to run as a full stack environment with a single startup command from the project root.

### Database seeding and initialization

The backend includes a seed script in `server/seed.ts` that initializes the database with example city content, attractions, events, and map/location data. This is useful for local development and demo environments.

Typical usage:

```bash
cd server
npx tsx seed.ts
```

The application also initializes the database automatically during startup through the `initializeDatabase()` function, and Sequelize then synchronizes model tables using `sync({ alter: true })`.

## 3. Main functional areas

### 3.1 Home

The home screen acts as the kiosk landing page. It displays:

- the city logo and header
- time and date
- weather summary
- navigation cards for main categories
- an animated news ticker

### 3.2 Tourism and landmarks

This section presents cultural and tourist information. It groups items into categories such as landmarks and museums and allows selection of specific entries in a card grid.

### 3.3 Events

The events screen loads event-related content from the backend and renders it using a dedicated event view component.

### 3.4 Services and directory

This section organizes information into service categories such as:

- healthcare
- transport
- taxi services
- city services
- accommodation
- shopping

### 3.5 City map

The map view loads map location records from the API and presents them in a dedicated map tab.

### 3.6 Mayor contact form

The contact form allows users to send requests or messages through the backend to an email provider. The backend validates the payload, applies rate limiting, and sends mail via SMTP.

## 4. Data model overview

The backend uses Sequelize models for structured data access. The most important ones are:

- Item: general content records used across the app
- ItemGallery: image references linked to items
- GppLine: public transport line metadata
- GppDeparture: transport departure times
- MapLocation: city map points

These models are connected through relationships and are loaded from the API using `include` statements.

## 5. API responsibilities

The backend provides the following main endpoints:

- `GET /` - basic welcome endpoint
- `GET /api/items` - returns all structured content items with supporting relations
- `GET /api/locations` - returns city map locations
- `GET /api/health` - health check endpoint
- `POST /api/send-email` - validates and sends a contact email

## 6. Client behavior

The client is designed as a kiosk experience. Key behavior includes:

- auto-activation of screensaver after inactivity
- return to the home screen after a timeout
- activity detection based on mouse, touch, and keyboard events
- home header and content overlay styling for large-screen display
- layered modal views for item details and enlarged media

## 7. Security and validation

The backend uses:

- Zod schema validation for admin or citizen contact requests
- rate limiting on the email route
- logging with Winston
- server-side checks before sending external email

These safeguards help prevent bad payloads and excessive abuse of the contact endpoint.

## 8. Local development workflow

The development process is split into backend and frontend workflows:

- Client: Expo app running via `npm start` or `npm run web`
- Server: Express app running via `npm run dev`
- Database: MySQL container created with Docker Compose

## 9. Deployment model

The application is intended to be deployed with Docker Compose in a single environment. This keeps the database, API, and kiosk interface together while simplifying startup and shutdown.

## 10. Operational considerations

- The kiosk should be launched in full-screen mode or a dedicated browser environment.
- The client should run on a persistent display device or kiosk hardware.
- The server should have stable access to the MySQL container and email credentials.
- If the database is not ready yet, the server retries connection attempts before failing.

## 11. Future improvements

Potential enhancements include:

- admin panel for managing content without direct database edits
- CMS integration for city content updates
- stronger deployment automation and environment checks
- support for additional languages and accessibility features
- offline caching for kiosk resilience

## 12. Summary

This project combines a visually rich kiosk front end with a structured backend that serves city information and contact functionality. It meets the needs of a public information terminal that presents up-to-date content while remaining easy to maintain and operate in a local deployment environment.
