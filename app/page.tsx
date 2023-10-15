;'use client'

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { useWeb3Modal } from '@web3modal/react'
import { Web3Button } from '@web3modal/react'

const chains = [arbitrum, mainnet, polygon]
const projectId = '7ec060afdbc5366da64212e7809fd4d4'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  const { open, close } = useWeb3Modal();

	return (
    <div className="w-full h-screen">
      <span className="align-middle">
        <h1 className="text-center">ConsciousNFT</h1>
	      <Button variant="outline" onClick={() => open()}>Connect Wallet</Button>
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
  
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}