# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kampai TLV** is an experimental food transportation business delivering premium Japanese food products to the Tel-Aviv market. The business is owned by Oren Raboy and serves restaurants, private chefs, and home cooking enthusiasts.

**Kampai AI Wingman** is an AI agent framework and product designed to help build Kampai TLV while simultaneously developing an AI Agent product to assist in business operations. This is an AI-coding project with goals to start simple, incrementally deliver value, and adapt as the AI industry evolves.

## Business Context

Kampai TLV provides premium Japanese fresh food products to Israel's booming Japanese dining market, serving:
- **Restaurants**: Premium high-end Japanese dining experiences (Umai, A, TYO, etc.)
- **Private Chefs**: Catering focused on high-end dining requiring regular supply
- **Home Chefs & Hobbyists**: Growing community of Japanese cuisine enthusiasts

The business operates through planned 4-12 shipments per year, working with Japanese partners to procure and ship products to Israel, then distributing to customers within 24 hours.

## AI Wingman Requirements

**Primary AI Interface**: Claude enhanced to route requests to Anthropic/Claude, OpenAI GPT-5, Google/Gemini

**Core Functionality**:
- **Coding**: Build Kampai TLV website and Shopify store-front using Claude Code
- **Research**: Market research in Japan and Israel via GPT-5
- **Lead Generation**: Find new customers/leads in Tel-Aviv and Japanese merchants

**Connected Apps Integration**:
- **Gmail**: Read emails, draft responses, send bulk emails
- **Calendar**: Schedule meetings
- **Google Drive**: Read/edit files (lead lists, business documents)
- **WhatsApp**: Read conversations, send messages, dedicated chat interface
- **Instagram**: Search contacts, follow/unfollow, post stories

**Access Methods**:
- Local development via Claude Code CLI
- Mobile iOS app with chat interface
- Cloud deployment (chat, WhatsApp)
- GitHub deployment pipeline

## Technical Architecture

- **Framework**: Next.js 14 with TypeScript and App Router
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Uses Lucide React for icons
- **AI Integration**: OpenAI and Anthropic SDKs for multi-model routing
- **Deployment**: Netlify with Node.js functions, GitHub-based deployment

## Key Commands

```bash
# Development
npm run dev          # Start development server (Next.js dev mode)

# Production
npm run build        # Build the application for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint (Next.js config)
```

## Project Structure

```
app/
├── page.tsx        # Main landing page component
├── layout.tsx      # Root layout with metadata
└── globals.css     # Global Tailwind styles

*.config.js         # Configuration files (Next.js, Tailwind, PostCSS)
netlify.toml        # Netlify deployment configuration
```

## Development Notes

- Uses App Router (not Pages Router)
- TypeScript strict mode enabled
- Path mapping configured: `@/*` maps to root directory
- Current landing page displays Kampai TLV branding but needs to be updated for food business focus
- AI SDKs are installed but not yet implemented in the UI
- Legacy Python files (test_apis.py, test_gemini.py) exist for API testing
- Project is in early stages - current website shows nightlife theme but business is Japanese food import

## Business Values & Goals

- **Quality**: Bring the best Japanese food products to Israel
- **Personal Touch**: Premium, personalized service for customers and suppliers
- **Streamlined & Affordable**: Quality-controlled delivery process while maintaining freshness
- **Incremental Development**: Start simple, deliver value, adapt with AI industry evolution

## Deployment

- Configured for Netlify deployment
- Build command: `npm run build`  
- Publish directory: `.next`
- Node.js 18 and npm 9 specified in build environment