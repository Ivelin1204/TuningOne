# TuningOne AI backend

Small Express server that proxies chat messages to Claude, so the Anthropic API key never
sits in the browser. The site's chat widget calls `POST /api/chat`.

## Local run

```
npm install
cp .env.example .env   # then paste your key into .env
npm start
```

Server runs on `http://localhost:3000`.

## Deploying on Render

1. Push this `server/` folder to a GitHub repo (or a subfolder of one).
2. In Render: **New +** → **Web Service** → connect the repo.
   - Root directory: `server` (if it's a subfolder)
   - Build command: `npm install`
   - Start command: `npm start`
3. Add environment variables in Render's dashboard:
   - `ANTHROPIC_API_KEY` — your key from https://platform.claude.com/settings/keys
   - `ALLOWED_ORIGIN` — your site's URL once it's live (e.g. `https://ivelin1204.github.io`)
4. Deploy. Render gives you a URL like `https://tuningone-ai.onrender.com`.
5. Open `index.html` and update the `AI_BACKEND_URL` constant near the top of the
   `<script>` block to that URL.

Render's free tier spins the service down when idle — the first chat message after a
period of inactivity can take ~30-60s to wake it up.
