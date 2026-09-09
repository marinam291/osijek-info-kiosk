# Osijek Info Kiosk

Osijek Info Kiosk is a digital information kiosk for the city of Osijek. It presents tourism content, city services, events, map information, local weather, and a contact form for the mayor. The system is built as a React Native / Expo client app and an Express API connected to MySQL.

## Project overview

The application has three main layers:

- Client: Expo + React Native app used as the kiosk interface
- Server: Express API for retrieving structured content and sending contact emails
- Database: MySQL used to store items, locations, and related data

The stack is designed to run through Docker Compose for easy local deployment.

## Features

- Home screen with city branding and quick navigation
- Tourism and landmarks content
- Events listing and item detail views
- City services and directory information
- City map view
- Mayor contact form with email sending
- Screensaver and inactivity handling for kiosk mode
- Weather widget for Osijek
- Server status indicator
- Croatian and English language support

## Technology stack

### Client / frontend

- Expo SDK
- React Native
- React 19
- React Native Web
- Expo Router
- TypeScript
- Expo UI and icon libraries
- React Native Reanimated
- React Native Gesture Handler
- React Native SVG
- react-native-qrcode-svg
- expo-av
- expo-image
- expo-font
- expo-device
- expo-system-ui
- expo-web-browser
- expo-splash-screen
- expo-constants
- expo-linking

### Server / backend

- Node.js
- Express 5
- TypeScript
- Sequelize ORM
- MySQL 8 via mysql2
- dotenv
- CORS
- Zod validation
- Nodemailer
- express-rate-limit
- Winston logger
- validator

### Infrastructure and tooling

- Docker
- Docker Compose
- MySQL 8 Docker container
- npm
- tsx for local development
- ESLint
- @typescript-eslint/eslint-plugin and parser

### Project-specific features used

- Screensaver and inactivity timer for kiosk mode
- Weather API integration with Open-Meteo
- Server health status widget
- Contact form email sending through Gmail SMTP
- multilingual interface (Croatian / English)
- dynamic city content loading from MySQL-backed API

## Repository structure

```text
osijek-info-kiosk/
├── client/                  # Expo client application
│   ├── src/
│   ├── app.json
│   ├── Dockerfile
│   └── package.json
├── server/                  # Express + Sequelize backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── utils/
│   ├── Dockerfile
│   ├── server.ts
│   └── package.json
├── docker-compose.yml       # Multi-service local orchestration
├── README.md                # Project overview and setup guide
├── docs/                    # Additional documentation
│   ├── PROJECT_DOCUMENTATION.md
│   └── API.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Docker Desktop or Docker Engine
- Docker Compose
- Node.js 20+ and npm

## Environment configuration

Create a server environment file at `server/.env` with values similar to the following:

```env
PORT=5000
DB_HOST=database
DB_NAME=osijek_kiosk
DB_USER=root
DB_PASSWORD=root
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Notes:

- The Docker Compose setup passes `DB_HOST=database` to the server service.
- `DB_HOST` should be `localhost` when running the server outside Docker.
- `EMAIL_USER` and `EMAIL_PASS` are required for the mayor contact form.

## Running the project with Docker

From the project root:

```bash
docker compose up --build
```

This starts:

- MySQL on port `3307`
- Server on port `5000`
- Client on port `8081`

Open the client in a browser at:

```text
http://localhost:8081
```

## Running the client locally

```bash
cd client
npm install
npm start
```

For web mode:

```bash
cd client
npm run web
```

## Running the server locally

```bash
cd server
npm install
npm run dev
```

The server will start on port `5000` and initialize the MySQL database automatically if the configuration is valid.

## Optional database seeding

This project includes a seed script at `server/seed.ts` to populate the database with initial city content, tourism items, event records, and map locations for local development or demo use.

```bash
cd server
npx tsx seed.ts
```

This script clears the database and inserts sample data, so it should only be used in a development or test environment.

## API and data flow

The client fetches content from the API to populate the kiosk screens:

- Items and categories are loaded from `/api/items`
- Map locations are loaded from `/api/locations`
- Health status is available at `/api/health`
- Contact emails are sent to `/api/send-email`

## Developer notes

- The kiosk app uses inactivity tracking to enter screensaver mode after a period of no interaction.
- The app supports both Croatian and English text through the `language` state.
- The backend validates incoming contact form data with Zod and limits repeated submissions with Express rate limiting.
- Database synchronization is handled with Sequelize `sync({ alter: true })` during server startup.

## Troubleshooting

### Docker compose fails to start

- Check whether ports `3307`, `5000`, and `8081` are free.
- Ensure Docker is running.
- Confirm `server/.env` exists and contains the required MySQL and email settings.

### Database connection issues

- Ensure MySQL container is healthy and started before the server attempts to connect.
- Check `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` values.

### Email sending fails

- Verify Gmail app password setup for `EMAIL_PASS`.
- Confirm `EMAIL_USER` is valid and the account allows SMTP access.

## Documentation

Additional project documentation is available in the `docs` folder:

- [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)
- [docs/API.md](docs/API.md)

## License

This project is currently set up as an internal city kiosk application and does not include a formal public license declaration.
