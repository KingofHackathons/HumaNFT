import axios from 'axios';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { address } = await request.json();

  const BASE_URL = "https://api.1inch.dev/nft/v1/byaddress";

  const limit = 50;
  const offset = 0;
  const chainIds = 1;

  const constructedUrl = `${BASE_URL}?address=${address}&chainIds=${chainIds}&limit=${limit}&offset=${offset}`;

  const nfts = await axios.get(constructedUrl, {
    headers: {
      Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
    },
  })
  .then(({ data }) => data)
  .then(({ assets }) => assets);

  return NextResponse.json(
    { nfts },
    { status: 200, },
  );
}
