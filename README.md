# consciousNFT

NPC NFTs trained LLMs.

## Tech Stack

- NextJS
  - API Routes for serverless functions
  - Vercel Postgres
- React / Tailwind
- WalletConnect
- 1Inch API (NFT retrieval)
- ChatGPT (LLM)

## Getting Started

Copy the `.env.example` to `.env`:

```
$ cp .env.example .env
```

Run postgres docker:

```
$ docker run --name consciousnft -e POSTGRES_PASSWORD=ethglobal -d postgres
```

```
$ nvm use && npm install
$ npm run dev
```
