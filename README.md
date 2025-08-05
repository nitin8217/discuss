# Discuss - Ultra-Modern Forum Platform

A cutting-edge discussion platform built with Next.js 15, featuring an ultra-modern glassmor### 🎯 Key Features Breakdown

### 1. Dark Mode Design
- Optimized ultra-modern dark theme
- Consistent glassmorphism effects
- Theme-aware particle colors
- Performance-optimized styling

### 2. Animation System advanced animations, and interactive elements.

## ✨ Features

### 🎨 Ultra-Modern UI
- **Glassmorphism Design**: Beautiful translucent cards with backdrop blur effects
- **Dark Mode**: Sleek dark theme optimized for modern aesthetics
- **Gradient Animations**: Dynamic color transitions and hover effects
- **Responsive Design**: Optimized for all screen sizes

### 🎪 Advanced Animations
- **Particle Background**: Canvas-based particle animation system with theme-aware colors
- **Smooth Page Transitions**: Framer Motion powered page transitions with multiple variants
- **Interactive Elements**: Hover animations, scale effects, and micro-interactions
- **Loading Skeletons**: Enhanced skeleton screens with pulse, wave, and shimmer animations

### 🚀 Core Functionality
- **Topic-based Discussions**: Organize conversations by topics
- **Nested Comments**: Reply to posts and comments with threading
- **User Authentication**: GitHub OAuth integration via NextAuth
- **Search Functionality**: Find posts and topics quickly
- **Real-time Updates**: Dynamic content loading

### 🎭 Interactive Features
- **Emoji Reactions**: React to posts and comments with 6 different emojis (👍❤️😂🔥⚡⭐)
- **GIF Support**: Integrated GIPHY API for sharing GIFs in posts and comments
- **Progressive Loading**: Smart skeleton screens for better perceived performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Database**: Prisma with SQLite
- **Authentication**: NextAuth.js with GitHub provider
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API Integration**: GIPHY API for GIF support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discuss
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_GIPHY_API_KEY=your-giphy-api-key-here
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 UI Components

### Theme System
- **ThemeProvider**: Global theme management with localStorage persistence
- **ThemeToggle**: Animated theme switching button
- **Particle Animation**: Canvas-based background effects

### Enhanced Components
- **Enhanced Skeletons**: Advanced loading states with multiple animation types
- **Emoji Reactions**: Interactive reaction system with animated counters
- **GIF Picker**: Modal interface for GIPHY integration
- **Page Transitions**: Smooth navigation animations

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
├── components/            
│   ├── providers/         # Context providers (theme, loading)
│   ├── ui/               # Reusable UI components
│   ├── posts/            # Post-related components
│   ├── comments/         # Comment components
│   └── topics/           # Topic components
├── actions/              # Server actions
├── lib/                  # Utilities and database
└── generated/            # Prisma generated files
```

## 🎯 Key Features Breakdown

### 1. Theme System
- Automatic dark/light mode detection
- Smooth theme transitions
- Theme-aware particle colors
- Persistent user preferences

### 2. Animation System
- Canvas-based particle effects
- Framer Motion page transitions
- CSS-based micro-animations
- Performance-optimized loading states

### 3. Interactive Elements
- 6 different emoji reactions
- GIPHY GIF integration
- Hover effects and transitions
- Progressive enhancement

### 4. Performance
- Turbopack for fast development
- Optimized images and fonts
- Lazy loading for better UX
- Efficient animation systems

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- Prisma for database management
- GIPHY for GIF integration
