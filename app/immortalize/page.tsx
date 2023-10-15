'use client'

import { Button } from "@/components/ui/button";


export default function ImmortalizePage() {
    return (
        <div className="flex flex-col items-center h-full w-full text-white">
            <div className="flex flex-col w-1/2 bg-none rounded p-10 mr-auto ml-auto items-center">
                <h1 className='text-7xl mb-10'>Immortalize NFT</h1>
                <h1 className="text-xl">Train your own AI to create your Immortalize NFT when you die!</h1>
            </div>
            <div className="flex items-center justify-center w-1/2 bg-none rounded p-10 mr-auto ml-auto">
                <p className='text-l justify-center'>Our IPFS based model storage will ensure that you are alive even when you are gone. Click below to start fine-tuning your LLM.</p>
            </div>
            <div className="w-1/4 bg-none rounded p-10 mr-auto ml-auto">
                <Button className='text-lg py-0 text-white' variant="outline" type="submit">Fine-tune your model</Button>
            </div>
        </div>
    )
}