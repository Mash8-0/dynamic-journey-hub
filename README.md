# Global Consultancy - Study Abroad Services

A modern, responsive web application for a study abroad consultancy service helping students pursue international education opportunities.

## 🌍 Features

- **Hero Section** - Eye-catching landing with graduate imagery and key statistics
- **Services Overview** - Comprehensive list of consultancy services
- **University Partners** - Showcase of partner universities worldwide
- **Success Stories** - Testimonials and student success cases
- **Process Guide** - Step-by-step application journey
- **Contact Form** - Easy inquiry submission with email notifications

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable React components
│   ├── ui/          # shadcn/ui components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── UniversitiesSection.tsx
│   ├── SuccessSection.tsx
│   ├── ProcessSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── data/            # Static data and constants
├── hooks/           # Custom React hooks
├── integrations/    # Third-party integrations (Supabase)
├── lib/             # Utility functions
├── pages/           # Page components
│   ├── Index.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Universities.tsx
│   ├── UniversityDetail.tsx
│   ├── SuccessStory.tsx
│   ├── Processing.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
└── index.css        # Global styles and design tokens
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd global-consultancy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

The project uses a custom design system with:
- CSS custom properties for theming
- HSL color values for consistency
- Responsive breakpoints
- Custom animations and transitions

## 📧 Contact Form

The contact form is integrated with Supabase Edge Functions to send email notifications when new inquiries are submitted.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using [Lovable](https://lovable.dev)
