# PostHaste

PostHaste is a cross-platform desktop application built with Wails (Go) and React, designed for managing and creating blog posts with a modern, user-friendly interface.

## Features

- Cross-platform desktop application (Windows, macOS)
- Markdown support for content creation
- Real-time preview
- Category and tag management
- DynamoDB integration for data storage
- Modern, responsive UI

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Go
- **Framework**: Wails v2
- **Database**: AWS DynamoDB
- **Styling**: CSS Modules
- **Package Management**: npm (frontend), Go modules (backend)

## Prerequisites

- Go 1.21 or later
- Node.js and npm
- Wails CLI
- AWS credentials configured for DynamoDB access

## Installation

1. Clone the repository
2. Install Wails if you haven't already:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Build the application:
```bash
wails build
```

## Development

To run the application in development mode:

```bash
wails dev
```

This will start both the frontend development server and the Go backend.

## Project Structure

- `/frontend` - React application
  - `/src` - Source code
  - `/components` - React components
  - `/assets` - Static assets
- `/backend` - Go backend code
- `/build` - Build configuration and assets

## Building for Production

### Windows
```bash
wails build -platform windows/amd64
```

### macOS
```bash
wails build -platform darwin/universal
```

The built applications will be available in the `build/bin` directory.

## License

This project uses the following licenses:
- Nunito Font: SIL Open Font License 1.1
- Dependencies: Various (see package.json and go.mod)