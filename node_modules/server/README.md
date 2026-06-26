# ⚙️ Orchidd Server & CLI (orbitals)

Welcome to the backend database, API authentication router, and command-line system for **Orchidd CLI** (Orbital System). This sub-project controls CLI interactions, lazy-loaded AI toolsets, database structures, and Better Auth authentication strategies.

---

## 🛠️ Technology Stack & Core Packages

- **Node.js (ES Modules)**
- **Express**: Lightweight HTTP server routing the authorization API endpoints.
- **Better Auth**: Handles social OAuth (GitHub) and device code authentication workflows.
- **Prisma & PostgreSQL**: Database schema manager and active session storage handler.
- **AI SDK (`ai` & `@ai-sdk/...`)**: Powered by `@ai-sdk/google` (Gemini), `@ai-sdk/openai`, and `ollama-ai-provider`.
- **CLI Frameworks**:
  - `commander`: Structured command routing.
  - `@clack/prompts`: Interactive terminal user prompts (selects, inputs, multiselects).
  - `yocto-spinner`: Smooth, non-blocking visual state indicators.
  - `boxen` & `chalk`: Styled visual components and terminal text formatting.
  - `marked` & `marked-terminal`: Beautiful rendering of AI markdown outputs in shell interfaces.

---

## 🏗️ Folder Structure

```
server/
├── prisma/                 # PostgreSQL migrations and configurations
│   └── schema.prisma       # Prisma DB models (User, Session, DeviceCode, Conversation, Message)
├── src/
│   ├── cli/                # Command-line interface logic
│   │   ├── ai/             # AI Provider services & API calls
│   │   ├── chat/           # Command loops (Simple Chat, Tool calling, Code Generator agent)
│   │   ├── commands/       # commander subcommands (login, logout, whoami, wakeup)
│   │   └── main.js         # Entrypoint for the 'orbitals' binary command
│   ├── config/             # Tool Calling configurations & Application schemas
│   ├── lib/                # Database connection pools, authentication middleware, utilities
│   └── index.js            # Express API router & redirect listener
└── package.json            # Scripts, commands, and dependency versions
```

---

## 📡 Backend APIs & Redirect Handles

The server runs on port `3005` (configurable via `PORT` in `.env`) and exposes:
- **`/api/auth/*`**: Managed endpoints for Better Auth device registration and GitHub token callback checks.
- **`/api/me`**: Session retrieval and verification endpoint.
- **`/device?user_code=XXXX`**: Convenient landing redirection that navigates browser users directly to the Next.js client verification view (`http://localhost:3000/device?user_code=XXXX`).
- **`/health`**: Server health-check returning `Hello, World!`.

---

## 🤖 AI Models & Interactive Modes

Run `orbitals wakeup` to select one of the following prompt interfaces:

1. **💬 Simple Chat**:
   - Streams responses from Gemini/OpenAI/Ollama.
   - Integrates `marked-terminal` rendering full, syntax-highlighted codeblocks and markdown right in your shell.
2. **🛠️ Tool Calling**:
   - Interactive multiselect checklist allows users to toggle active tools on the fly:
     - **Google Search**: Performs real-time search queries to feed context back to the model.
     - **Python Code Execution**: Evaluates math operations, data plotting, and logical problems securely.
     - **URL Context**: Accepts up to 20 user-provided URLs in prompt context, parsing content dynamically.
3. **🤖 Agentic Mode**:
   - Autonomous software generation assistant.
   - Utilizes `generateObject` structured schemas (`Zod`) to recursively create directories, install dependencies, prepare README files, and draft source code directly inside the terminal's working folder based on your description.

---

## 🚀 Commands & Database Sync

```bash
# Apply Prisma models and sync PostgreSQL tables
npx prisma db push

# Run the Express server in nodemon watch mode
npm run dev

# Start the Express server in production
npm run start
```

To run commands like `orbitals login` directly, run `npm link` inside this directory to link the `orbitals` CLI command globally.
