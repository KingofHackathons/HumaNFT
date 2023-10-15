'use client'

import { useState, useEffect } from 'react';
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
    <div className='container' data-cy='individual-owner-container'>
      <div className='grid grid-cols-4 gap-4'>
        {
          nfts.map(({ 
            name, 
            description, 
            asset_contract: assetContract, 
            image_url: 
            imageUrl 
          }, index) => {
            return (
              <Card className='w-64 p-4 mx-auto' key={index}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>{assetContract.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={imageUrl} />
                </CardContent>
              </Card>
            );
          })
        }
      </div>
    </div>
  </>
}
