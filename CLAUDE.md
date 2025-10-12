# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the DYNAMO project website, a static site deployed via Cloudflare Pages at the custom domain `dynamo-ai.tech`. The project showcases DYNAMO, an AI-powered multi-agent collaboration platform with various demo applications and landing pages.

## Repository Structure

The repository contains multiple standalone web applications:

- **Root (`index.html`)**: Main landing page for DYNAMO
- **`business/`**: Business-focused landing page (dynamo-ai.tech/business)
  - Single-file HTML application with inline CSS and JavaScript
  - Self-contained marketing site focused on "Spirit Tech 3.0" and liberation technology
  - Responsive design with mobile hamburger menu
  - Integrated contact form (Formspree)
- **`demo/`**: Collection of interactive demonstration applications
  - **`dynamo-community-dashboard/`**: Full-featured community intelligence console (primary demo)
  - **`memorydashboard/`**: Retrieval dashboard for past conversations
  - **`community/`**: Community-focused demo page
  - **`index.html`**: Demo homepage
- **`dynamo-landing/`**: Alternative landing page
- **`altwebpage/`**: Additional webpage variations
- **`assets/`**: Shared CSS and JS files across demos

## Local Development

Use a static file server to test locally:

```bash
python -m http.server 8080
```

Then visit: `http://localhost:8080`

## Deployment

- **Hosting**: Cloudflare Pages
- **Branch**: Deploys automatically on push to `main`
- **Root Directory**: The entire repository is served
- **Custom Domain**: Managed via `CNAME` file (contains `dynamo-ai.tech`)

## Architecture: DYNAMO Community Dashboard

The primary demo application (`demo/dynamo-community-dashboard/`) is a sophisticated, production-ready community collaboration platform.

### Core Concept

Three-panel UI for team collaboration with AI agents:
- **Left Panel**: Project navigation, workflow tracking, agent packs, and thread management
- **Center Panel**: Living thread workspace with multiple "lenses" (views) and a two-lane composer (human/agent)
- **Right Panel**: Active agent pack info, artifacts, and action audit ledger

### JavaScript Architecture

The dashboard follows a modular JavaScript pattern with clear separation of concerns:

1. **`config.v2.js`**: Global constants, status types, roles, color schemes
2. **`mockData.v2.js`**: Mock data structures (workspaces, projects, threads, agent packs, users)
3. **`state.v2.js`**: Centralized state management (`AppState` object) with methods for updating state
4. **`ui.v2.js`**: UI rendering functions (`UI` object) - all DOM manipulation happens here
5. **`main.v2.js`**: Event handlers, initialization, and business logic orchestration

### Key Architectural Patterns

**State Management**: The `AppState` object in `state.v2.js` is the single source of truth. All state changes go through its methods.

**UI Rendering**: The `UI` object provides render methods that read from `AppState` and update the DOM. UI never modifies state directly.

**Event Flow**: `main.v2.js` handles all DOM events → calls `AppState` methods to update state → calls `UI` methods to re-render.

**Data Model Hierarchy**:
```
Workspace
  └─ Project (with installed agent packs, workflow phases, team members)
      └─ Thread (with messages, synthesis, decisions, questions, artifacts)
```

**Lenses**: Different views of the same thread data:
- **Dialogue**: Chronological message stream (human + agent)
- **Synthesis**: AI-generated summary of thread discussions
- **Decisions**: Extracted decisions with status tracking
- **Questions**: Open questions requiring resolution

**Two-Lane Composer**:
- **Human Lane**: Free-text messaging
- **Agent Lane**: Slash-command interface with autocomplete and dynamic parameter forms

### Agent Pack System

Agent packs are modular capability sets installed per-project. Each pack defines:
- Commands (slash commands like `/answer`, `/draft`, `/schedule`)
- Parameters (with types: text, select, multiselect)
- RAG sources (documents the pack can query)
- Tool integrations (Notion, Slack, Google Calendar, etc.)

### Mock Data Pattern

The dashboard uses comprehensive mock data structures to simulate:
- Multi-tenancy (workspaces → projects → threads)
- Agent task execution with realistic delays
- RAG retrieval results
- Tool API interactions
- Audit logging

## Memory Dashboard Specification

The `demo/memorydashboard/` directory contains detailed specifications for a retrieval-focused interface:

- **Purpose**: Search and filter past DYNAMO conversations
- **Data Structure**: Uses `pastconversations.js` with ledgers and indexed exchanges
- **Features**: Full-text search, meta-tag filtering, date ranges, status tracking
- **Integration**: "Send to Council Chat" button to pre-seed context for new conversations

See `demo/memorydashboard/project-spec.md` for complete implementation details.

## Styling Approach

The project uses custom CSS with CSS variables for theming:
- Dark mode color scheme
- Consistent spacing and border-radius tokens
- Modular component styles
- No CSS frameworks (vanilla CSS)

### Business Landing Page Specifics

The `/business/` page follows modern web best practices:
- **SEO Optimized**: Includes Open Graph tags, Twitter Cards, canonical URLs, and meta descriptions
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support
- **Progressive Enhancement**: Uses `@supports` queries for fallbacks on `backdrop-filter` and `background-clip: text`
- **Performance**: Google Fonts preconnect, Formspree preconnect, optimized loading
- **Form Handling**: Client-side validation, real-time feedback, loading states, honeypot spam prevention
- **Browser Compatibility**: Vendor prefixes (-webkit-) and fallback styles for older browsers

## URL Structure

The site serves clean URLs without `.html` extensions:
- `/` → Main landing page
- `/business` → Business landing page (marketing site)
- `/demo/` → Demo homepage
- `/demo/community` → Community demo
- `/demo/memorydashboard` → Memory dashboard
- `/dynamo-landing/` → Alternative landing
- `/altwebpage/` → Additional page variations

## Git Workflow

```bash
# Check current branch and remote
git branch --show-current
git remote -v

# Push changes (triggers automatic deployment)
git add .
git commit -m "Update site"
git push origin main
```

## Version Management

The Community Dashboard uses a `v2` naming convention for its JS files (`config.v2.js`, `main.v2.js`, etc.), suggesting this is an evolved version of an earlier implementation. When making changes, maintain this version consistency.

## Important Notes

- All pages are self-contained with inline styles or linked CSS/JS
- No build process required - pure static files
- JavaScript uses ES6+ features but no module bundlers
- Mock data simulations use realistic delays and status transitions
- Provenance tracking is embedded throughout (who created what, when)

## Common Development Tasks

When adding features to the Community Dashboard:

1. **Add new state**: Update `AppState` in `state.v2.js`
2. **Add UI elements**: Create render method in `ui.v2.js`
3. **Wire events**: Add event handlers in `main.v2.js`
4. **Configure**: Add constants to `config.v2.js`
5. **Mock data**: Extend structures in `mockData.v2.js`

When creating new demo pages:
- Follow the existing pattern of self-contained HTML files
- Reference shared assets from `/assets/` when appropriate
- Ensure navigation back to main site is clear
- Test with local static server before committing

When editing the business landing page (`/business/index.html`):
- Maintain the self-contained structure (all CSS and JS inline)
- Preserve SEO meta tags and Open Graph/Twitter Card data
- Keep accessibility features (ARIA labels, semantic HTML)
- Test form validation and submission (uses Formspree)
- Verify responsive design at mobile breakpoint (768px)
- Ensure browser fallbacks remain in place for older browsers
