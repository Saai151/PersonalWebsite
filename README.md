# Saai Arora - Personal Portfolio Website

A Spotify-themed personal portfolio website built with React, TypeScript, and shadcn/ui.

## Features

- 🎨 Spotify-inspired dark theme with green accents
- 🎵 **Now Playing** - Interactive project simulation with animated waveform
- 🎊 **2025 Wrapped** - Spotify Wrapped-style annual developer report
- ⚡ Built with React 18 and TypeScript
- 🚀 Fast development with Vite
- 📱 Fully responsive design
- 🎯 shadcn/ui components for consistent UI
- ✨ Smooth animations and hover effects
- 🔌 GitHub API integration ready

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Link previews (Slack, iMessage, etc.)

Blog posts use **Vercel Edge Middleware** (`middleware.ts`) to rewrite the HTML for `/blog/:slug` so crawlers see the correct `<title>`, `og:*`, and `twitter:*` tags **without running JavaScript**. A **`blog-meta.json`** file is emitted at build time from your post data (see `vite.config.ts`).

- **Vite alone** (`npm run dev` / `npm run preview`) does **not** run Edge middleware—previews there still look like the generic site unless you also update meta from React.
- To test middleware locally, use **`vercel dev`** from this project directory (requires the [Vercel CLI](https://vercel.com/docs/cli)).

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── Sidebar.tsx       # Left navigation sidebar
│   │   ├── Header.tsx        # Top header with search
│   │   ├── Hero.tsx          # Profile hero section
│   │   ├── Education.tsx     # Education section
│   │   ├── Experience.tsx    # Work experience cards
│   │   ├── Skills.tsx        # Technical skills
│   │   └── PlayerBar.tsx     # Bottom music player bar
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles with Tailwind
├── components.json            # shadcn/ui configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React (icons)

## Design Theme

The website uses a Spotify-inspired color scheme:
- **Background**: Dark (#121212, #000000)
- **Cards**: Dark gray (#181818, #282828)
- **Accent**: Spotify Green (#1db954)
- **Text**: White with secondary gray (#b3b3b3)

## Customization

You can customize the website by:
- Modifying component data in the respective `.tsx` files
- Updating colors in `tailwind.config.js` (Spotify color variables)
- Adding more shadcn/ui components as needed
- Adjusting layout in component files

## Interactive Features

### Now Playing Bar

The bottom player bar simulates a "now playing" experience for your projects:
- Shows current project with progress percentage
- Animated waveform visualization
- Play/pause to toggle project description
- Queue view of other projects
- Skip between projects

### 2025 Wrapped

A Spotify Wrapped-style annual report accessible from the sidebar:
- **Slide 1**: Intro with key stats (commits, PRs, prod incidents)
- **Slide 2**: Top programming languages with animated progress bars
- **Slide 3**: Top projects as cards
- **Slide 4**: Commit activity heatmap
- **Slide 5**: Top repositories by commits
- **Slide 6**: Epilogue with CTAs

Navigate with arrow buttons or click the dots at the bottom.

## GitHub API Integration

The Wrapped component can fetch real data from GitHub. See `GITHUB_API_SETUP.md` for:
- How to create a GitHub Personal Access Token
- Setting up environment variables
- Using the GitHubService class
- API endpoints and rate limits

## shadcn/ui Components

This project uses shadcn/ui components. To add more components, you can use:
```bash
npx shadcn-ui@latest add [component-name]
```

Available components are documented at [shadcn/ui](https://ui.shadcn.com).

