'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function IndividualOwner() {
  // Obtain through WalletConnect/Rainbow.
  const address = '0x2666f0C8FB58d182f2Dd79475DCA4A07B3724607';

  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNfts = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address
        })
      };

      const response = await fetch('http://localhost:3000/api/fetch-nfts', options);

      const json = await response.json();

      const fetchedNfts = json.nfts;

      setNfts(fetchedNfts);
    }

    fetchNfts();
  }, [address, setNfts]);

  return <>
    <div className='container h-screen mt-32' data-cy='individual-owner-container'>
      <div>
        <p className='text-6xl text-white'>Awaken your NFT</p>
        <p className='text-sm text-white pt-2 pb-5'>Select an NFT to bring to life</p>
        <div className='w-full overflow-hidden flex flex-row gap-2'>
          {
            nfts.map(({ 
              name, 
              description, 
              asset_contract: assetContract, 
              image_url: 
              imageUrl 
            }, index) => {
              return (
                <Link href='/individual-signup'>
                  <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 border-none rounded-lg'>
                    <div className='border-none rounded-lg overflow-hidden w-48 h-48'>
                      <img 
                        className='transition ease-out duration-300 hover:scale-110' src={imageUrl} />
                    </div>
                  </div>
                </Link>
              );
            })
          }
        </div>
      </div>
    </div>
  </>
}
