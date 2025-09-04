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

**IMPORTANT: Clean Folder Organization (Sept 2024)**

```
app/                 # MAIN WEBSITE - Kampai TLV Japanese Food Business
├── page.tsx        # Landing page with Japanese food products (Hebrew RTL + English)
├── layout.tsx      # Root layout with SEO metadata
└── globals.css     # Global Tailwind styles

wingman/            # AI AGENT SYSTEM - Python-based AI wingman logic
├── agents/         # AI agent implementations
├── integrations/   # External service integrations (WhatsApp, Gmail, etc.)
├── pages/          # Streamlit pages
├── utils/          # Utility functions
└── streamlit_app.py # Main AI agent interface

# Configuration files (root level)
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration  
├── netlify.toml           # Netlify deployment configuration
├── package.json           # Node.js dependencies
└── tsconfig.json          # TypeScript configuration
```

**Folder Purpose Clarification:**
- `app/` = Main business website deployed to kampai-tlv.com
- `wingman/` = AI agent code for business operations
- **NO OTHER WEBSITE FOLDERS** - kampai-app/ was removed, don't get confused

## Development Notes

- Uses App Router (not Pages Router)
- TypeScript strict mode enabled
- Path mapping configured: `@/*` maps to root directory
- **Current Status**: Landing page now displays Japanese food import business with Hebrew RTL support
- **WhatsApp Integration**: Product ordering via WhatsApp (`wa.me/972501234567`)
- **Bilingual Content**: Hebrew primary with English translations
- **Product Showcase**: Uni, Wagyu A5, Premium Sake, Seasonal Fish with pricing
- AI SDKs are installed but not yet implemented in the UI
- Legacy Python files (test_apis.py, test_gemini.py) exist for API testing
- **Website Theme**: Clean, professional Japanese food business (no longer nightlife)

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