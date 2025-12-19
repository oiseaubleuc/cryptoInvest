# Crypto Invest - Angular Application

A modern cryptocurrency investment management application built with Angular.

## Features

- **Real-time Market Data**: View live cryptocurrency prices using CoinGecko API
- **Portfolio Management**: Track your investments and calculate profits/losses
- **Modern UI**: Unique design with black, white, and olive green color scheme
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before starting this project, make sure you have installed:

- **Node.js** (version 18 or higher)
- **npm** (usually included with Node.js)
- **Angular CLI** (will be installed globally or via npx)

## Installation

### 1. Install Angular CLI globally (optional)

```bash
npm install -g @angular/cli
```

Or use `npx` to run Angular commands without global installation.

### 2. Install project dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`.

## Getting Started

### Start the development server

```bash
npm start
```

Or with Angular CLI:

```bash
ng serve
```

The application will be accessible at: **http://localhost:4200**

The server will automatically reload when you modify source files.

### Build for production

```bash
npm run build
```

Compiled files will be generated in the `dist/crypto-invest` folder.

## Project Structure

```
crypto-invest/
├── src/
│   ├── app/
│   │   ├── components/          # Application components
│   │   │   ├── home/            # Home page
│   │   │   ├── portfolio/       # Portfolio management
│   │   │   └── market/          # Market display
│   │   ├── services/            # Services (API, business logic)
│   │   ├── models/              # TypeScript models
│   │   ├── app.component.ts     # Root component
│   │   ├── app.config.ts        # Application configuration
│   │   └── app.routes.ts        # Application routes
│   ├── assets/                  # Static resources
│   ├── index.html               # HTML entry point
│   ├── main.ts                  # TypeScript entry point
│   └── styles.css               # Global styles
├── angular.json                 # Angular configuration
├── package.json                 # npm dependencies
└── tsconfig.json                # TypeScript configuration
```

## Available Commands

### Generate a new component

```bash
ng generate component components/component-name
```

Or in short form:

```bash
ng g c components/component-name
```

### Generate a service

```bash
ng generate service services/service-name
```

### Run tests

```bash
npm test
```

### Lint code

```bash
npm run lint
```

## API Integration

This application uses the **CoinGecko API** for real-time cryptocurrency data:
- Top cryptocurrencies by market cap
- Real-time price updates
- 24h price changes
- Market capitalization data

No API key required for basic usage.

## Technologies Used

- **Angular 17**: Frontend framework
- **TypeScript**: Programming language
- **RxJS**: Reactive programming
- **CSS**: Styling with custom design system
- **CoinGecko API**: Cryptocurrency data

## Design

The application features a unique design with:
- **Black background** (#000000)
- **White text** (#ffffff)
- **Olive green accents** (#6B7F3A)
- **Military/tactical style** with sharp edges
- **Glow effects** on interactive elements

## Future Enhancements

1. **Charts**: Add charts to visualize performance (Chart.js, ng2-charts)
2. **Authentication**: Add user authentication system
3. **Backend Integration**: Connect to a backend API for data persistence
4. **Notifications**: Price alerts and notifications
5. **Advanced Analytics**: Detailed portfolio analytics
6. **Unit Tests**: Add tests for components and services

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [CoinGecko API](https://www.coingecko.com/en/api)

## License

This project is open source and available under the MIT License.

## Support

For any questions or issues, please refer to the official Angular documentation.
