'use client'

import { useState, useEffect, use } from 'react';
import Link from "next/link";
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, useEnsName, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

function IndividualOwner() {
  // Obtain through WalletConnect/Rainbow.
  const address = '0x2666f0C8FB58d182f2Dd79475DCA4A07B3724607';
  const ensName = useEnsName({ address, chainId: 1 });

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

  const onClickHandler = (imageUrl: string, name:string) => {
    localStorage.setItem("selectedNFTImage", imageUrl);
    localStorage.setItem("selectedNFTText", name);
  };

  const nft = [
    {
      name: 'NFT 1',
      description: 'This is the first NFT',
      asset_contract: '0x1234567890',
      image_url: '1.jpeg'
    },
    {
      name: 'NFT 2',
      description: 'This is the second NFT',
      asset_contract: '0x0987654321',
      image_url: '2.jpeg'
    },
    {
      name: 'NFT 3',
      description: 'This is the third NFT',
      asset_contract: '0xabcdef1234',
      image_url: '3.jpeg'
    },
    {
      name: 'NFT 4',
      description: 'This is the fourth NFT',
      asset_contract: '0x1234abcdef',
      image_url: '4.jpeg'
    },
    {
      name: 'NFT 5',
      description: 'This is the fifth NFT',
      asset_contract: '0x1234abcdef',
      image_url: '5.jpeg'
    }
  ];

  return <>
    <div className='container h-screen mt-32' data-cy='individual-owner-container'>

      <div>
        <p className='text-6xl text-white'>Let's awaken your NFT @{ensName.data}</p>
        <p className='text-sm text-white pt-2 pb-5'>Select an NFT to bring to life</p>
        <div className='w-full overflow-hidden flex flex-row gap-2'>
          {
            nft.map(({ 
              name, 
              description, 
              asset_contract: assetContract, 
              image_url: 
              imageUrl 
            }, index) => {
              return (
                <Link href='/individual-signup'>
                  <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5 border-none rounded-lg' onClick={() => onClickHandler(imageUrl, name)}>
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
};

export default function FinalComponent() {
  const chains = [arbitrum, mainnet, polygon]
  const projectId = '7ec060afdbc5366da64212e7809fd4d4'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  });

  return (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <IndividualOwner />
    </RainbowKitProvider>
  </WagmiConfig>);
}
