import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="w-full h-screen">
      <h1>Conscience NFT</h1>
      <Button variant="outline">Connect Wallet</Button>
    </div>
  );
}
