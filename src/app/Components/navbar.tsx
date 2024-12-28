import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-slate-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-white font-bold">BPulse</div>
        <div className="flex space-x-5 text-white">
          <Link href="/">Dashboard</Link>
          <Link href="/time-series">Time Series Data</Link>
          <Link href="/allerts">Allerts</Link>
          <Link href="/guide">User Guide</Link>
          <Button className="bg-slate-100 text-black">Login</Button>
        </div>
      </div>
    </nav>
  );
}
