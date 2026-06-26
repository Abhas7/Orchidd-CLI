# 🌌 Orchidd CLI (Orbital System)

Welcome to **Orchidd CLI** (codenamed **Orbital**), a state-of-the-art, full-stack AI command-line interface and authentication gateway. The system integrates advanced AI providers (Gemini, OpenAI, Ollama) with secure, browser-based device flow authorization.

```
   ___       _     _ _        _    ____ _     ___ 
  / _ \ _ __| |__ (_) |_ __ _| |  / ___| |   |_ _|
 | | | | '__| '_ \| | __/ _` | | | |   | |    | | 
 | |_| | |  | |_) | | || (_| | | | |___| |___ | | 
  \___/|_|  |_.__/|_|\__\__,_|_|  \____|_____|___|
                                                  
```

---

## 🏗️ System Architecture 

Orchidd is designed as a **monorepo / yarn workspace** containing two core layers:
1. **`client` (Frontend)**: Next.js 16 Web Application utilizing React 19, Tailwind CSS 4, Framer Motion, and Better Auth client plugins. It handles verification code inputs and session management in a dark-mode glassmorphism interface.
2. **`server` (Backend & CLI)**: Node.js server exposing authentication APIs, a session checker, database migrations via Prisma (PostgreSQL), and the CLI compiler `orbitals`.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant CLI as orbitals CLI
    participant Server as Better Auth Server
    participant Web as Next.js Web App

    User->>CLI: orbitals login
    CLI->>Server: Request Device Authorization Code
    Server-->>CLI: Return user_code & device_code
    CLI->>User: Display user_code (e.g. ABCD-1234)
    CLI->>User: Auto-open Browser at /device
    User->>Web: Input user_code on /device page
    Web->>Server: Validate user_code & check active session
    Server-->>Web: Code valid
    Web->>User: Prompt Approve / Deny
    User->>Web: Click "Approve Access"
    Web->>Server: Approve device authorization
    loop Polling
        CLI->>Server: Request access_token with device_code
    end
    Server-->>CLI: Return access_token (after user approval)
    CLI->>CLI: Save token to local config directory
    CLI->>User: Login Successful!
```

---

## ✨ Features

### 💻 `orbitals` CLI (Backend)
- **Multi-Model Provider Integration**: Choose from Google Gemini (1.5 Flash/Pro), OpenAI, or local Ollama models.
- **Secure Device Authentication Flow**: Integrated with GitHub OAuth via Better Auth.
- **Interactive Chat Interface**: Renders markdown output directly in your terminal using specialized terminal themes.
- **AI Tool Calling (Lazy Instantiation)**:
  - 🌐 *Google Search*: Real-time web searching capabilities.
  - 🐍 *Python Code Execution*: Secure sandboxed code runtime environment.
  - 🔗 *URL Context*: Scrape, parse, and analyze up to 20 web links per prompt.
- **Autonomous Agentic Mode**: Input a prompt to generate structured React/Next.js/Node.js code templates, directories, and configuration setups automatically.

### 🌐 Next.js Portal (Client)
- **Glassmorphic Design**: Curated dark modes, grain text overlays, glowing blur backdrops, and active micro-animations.
- **Verification Flow**: Smooth redirection, user code validation, and click-to-approve interface.
- **User Dashboard**: Displays GitHub profile details, session statuses, and active authentication keys.

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v20+ recommended)
- **PostgreSQL** instance (Neon, local pg, or Docker container)
- **GitHub OAuth App credentials** (Client ID & Client Secret)

### 🔧 Environment Setup

#### 1. Backend Server (`/server/.env`)
Create a `.env` file inside the `server/` directory:
```env
PORT=3005
DATABASE_URL="postgresql://username:password@localhost:5432/orchidd"
BETTER_AUTH_SECRET="your-better-auth-secret-key"
BETTER_AUTH_URL="http://localhost:3005" # Backend Base URL

# Social Login Setup
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI Service Settings
AI_PROVIDER="google" # 'google' | 'openai' | 'ollama'
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"
ORBITAL_MODEL="gemini-1.5-flash"
# For OpenAI:
# OPENAI_API_KEY="your-openai-api-key"
# CUSTOM_AI_MODEL="gpt-4o"
# For Ollama:
# OLLAMA_MODEL="qwen2.5-coder:7b"
```

#### 2. Next.js Frontend App (`/client/.env.local`)
Create a `.env.local` file inside the `client/` directory:
```env
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3005" # Points to the backend server
```

---

## 🛠️ Installation & Launch

From the **root directory**, install workspace dependencies and set up migrations:

```bash
# 1. Install all dependencies across workspaces
npm install

# 2. Generate Prisma Client and apply migrations
npm run db:push --prefix server

# 3. Spin up both client & server dev environments concurrently
# This fires Next.js on port 3000 and Express on port 3005
npm run dev:client & npm run dev:server
```

> [!NOTE]
> If you wish to run the CLI command `orbitals` globally on your system, execute:
> ```bash
> cd server && npm link
> ```

---

## 🎯 Command Reference (`orbitals`)

The CLI is run via `orbitals [command]`.

| Command | Description |
| :--- | :--- |
| `orbitals login` | Starts the browser OAuth device authentication stream. |
| `orbitals whoami` | Shows details of the currently authenticated GitHub account. |
| `orbitals wakeup` | Fires up the interactive AI agent console selection prompt. |
| `orbitals logout` | Terminate session, invalidate tokens, and clean local config directory. |

---

## 📁 Repository Directory Structure

```
Orchidd CLI/
├── client/                 # Next.js 16 Client Portal
│   ├── app/                # App router (auth, sign-in, device, approve)
│   ├── components/         # Premium glassmorphic components
│   ├── lib/                # better-auth client instance configurations
│   └── package.json        
├── server/                 # Express backend, Prisma models, CLI
│   ├── prisma/             # Schema definitions and database migrations
│   ├── src/
│   │   ├── cli/            # CLI Command configurations and prompts
│   │   │   ├── ai/         # Google Gemini, OpenAI, Ollama APIs
│   │   │   ├── chat/       # Simple chat, tool chat, agent chat loops
│   │   │   └── commands/   # login, logout, wakeup CLI entry points
│   │   ├── config/         # Structured AI tool / agent options
│   │   ├── lib/            # Session database models & database adapters
│   │   └── index.js        # Express middleware setup
│   └── package.json        
├── package.json            # Root workspace config
└── README.md               # Main Documentation
```

---

## 🛡️ License

Distributed under the ISC License. See `LICENSE` inside packages for more details.
