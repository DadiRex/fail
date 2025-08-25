# STEM Sprouts Website Backend

A Node.js backend server for the STEM Sprouts educational platform, designed to deploy on Railway.

## Quick Deploy to Railway

1. **Fork/Clone this repository**
2. **Connect to Railway**: Go to [railway.app](https://railway.app) and connect your GitHub repo
3. **Set Environment Variables**:
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `OPENAI_MODEL` = gpt-4o-mini (optional)
   - `LOG_LEVEL` = info (optional)
   - `NIXPACKS_NODE_VERSION` = 20 (optional)

## Local Development

```bash
cd backend/server
npm install
npm run dev
```

## API Endpoints

- `GET /healthz` - Health check
- `GET /__selfcheck` - Server status
- `POST /api/character` - Generate STEM characters
- `POST /api/story` - Generate STEM stories  
- `POST /api/ask` - Ask STEM questions (SSE streaming)

## Structure

```
 railway.json          # Railway deployment config
 .gitignore           # Git ignore rules
 README.md            # This file
 backend/
     server/
         package.json  # Dependencies
         server.js     # Main server file
         node_modules/ # Installed packages
```

## Railway Configuration

The `railway.json` file tells Railway to:
- Build from the `backend/server` directory
- Use Nixpacks builder
- Run `npm start` to start the server
- Restart on failure

## Environment Variables

- `PORT` - Railway sets this automatically
- `OPENAI_API_KEY` - Required for AI features
- `OPENAI_MODEL` - AI model to use (default: gpt-4o-mini)
- `LOG_LEVEL` - Logging level (default: info)

## Deployment Notes

- Server binds to `0.0.0.0` for Railway compatibility
- Includes proxy-friendly SSE headers
- Has global error handling and process guards
- Lazy-loads OpenAI client to avoid build errors
