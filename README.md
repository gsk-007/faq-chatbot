# AI Live Chat Agent

AI-powered customer support chat built for the Spur Founding Engineer assignment.

## Tech Stack

- **Backend** — Node.js 22, Express 5, TypeScript
- **Database** — SQLite via Drizzle ORM + better-sqlite3
- **LLM** — OpenAI (Responses API)
- **Frontend** — Vanilla JS (ES modules), marked.js

---

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
PORT=3000
node_env=development
DB_URL=./data/app.db
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=your_openai_model
```

### 3. Run database migrations

```bash
npm run db:migrate
```

### 4. Start the server

```bash
npm run dev
```

Open `http://localhost:3000`

---

## API

### Conversations

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/conversations` | List all conversations |
| `POST` | `/conversations` | Create a conversation |
| `GET` | `/conversations/:id` | Get a conversation |
| `PATCH` | `/conversations/:id` | Rename a conversation |
| `DELETE` | `/conversations/:id` | Delete a conversation |

### Messages

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/conversations/:id/messages` | Fetch message history |
| `POST` | `/conversations/:id/messages` | Send a message, receive AI reply |

---

## Architecture Overview

```
Routes → Controllers → Services → DB Queries → SQLite
                           ↓
                       LLMService (OpenAI)
```

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for a detailed breakdown.

---

## LLM Notes

- **Provider** — OpenAI via the Responses API (`openai.responses.create`)
- **Prompting** — Two system messages: one sets the agent persona, the second injects the store's knowledge base as a JSON object covering shipping, returns, payments, orders, loyalty, and support hours
- **Context window** — Last 10 messages from the conversation are sent with each request
- **Guardrails** — 15 s timeout via `AbortSignal`, 300 max output tokens, temperature 0.2 for consistent answers, `LLMError` surfaced as a clean message in the UI

---

## Trade-offs

- **SQLite over PostgreSQL** — zero config, sufficient for a single-server V1; swapping in Postgres is a one-line Drizzle config change
- **Vanilla JS over a framework** — the frontend is small; no build step, no bundler
- **Prompt injection over RAG** — simpler, fast to iterate, reliable for a fixed FAQ set
- **Request/response over streaming** — reduces complexity; streaming can be added as a drop-in later

---

## If I Had More Time

- Streaming responses (SSE / chunked transfer)
- Rate limiting per IP
- Conversation search and auto-summaries
- Unit + integration tests
- Docker image and CI/CD pipeline
- Deploy to Render / Railway
