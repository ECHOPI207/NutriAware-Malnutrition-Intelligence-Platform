# NutriAware - Malnutrition Intelligence Platform

NutriAware is a comprehensive malnutrition intelligence platform combining AI technology with evidence-based nutrition science to provide advanced assessment, monitoring, and consultation tools.

## Features

- **AI-Powered Assessment**: Advanced diagnostic tools using machine learning to assess malnutrition risks.
- **Medical Consultation**: Secure platform for doctor-patient interactions and ongoing care.
- **Knowledge Base**: Curated articles and resources on various malnutrition types.
- **Admin Dashboard**: Comprehensive management system for users, content, and system settings.
- **Role-Based Access**: Secure environment with distinct roles for Users, Doctors, Nutritionists, and Administrators.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Backend & Auth**: Firebase
- **State Management**: React Context & Hooks
- **Testing**: Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nutriaware-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration keys
   ```

### Running Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── contexts/    # React Context providers (Auth, Theme, etc.)
│   ├── features/    # Feature-specific logic
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utilities and configuration (Firebase, Utils)
│   ├── pages/       # Application routes/pages
│   ├── services/    # API and external service integrations
│   └── types/       # TypeScript type definitions
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
