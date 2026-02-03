"use client";

import Link from "next/link";
import { Facebook, Instagram, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-[#1a1a1e]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl w-full max-w-2xl">
    
        <Link 
            href="/" 
            className="font-black text-white tracking-tighter text-lg hover:text-zinc-300 transition-colors"
        >
            GARZON
        </Link>

        <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
                About Me
            </Link>
            
            <div className="h-4 w-[1px] bg-zinc-700" />
            
            <div className="flex gap-4">
                <a href="https://www.facebook.com/carl.jovit.garzon/" target="_blank" className="text-zinc-400 hover:text-[#1877F2] transition-colors">
                    <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/jovgarzon/" target="_blank" className="text-zinc-400 hover:text-[#E4405F] transition-colors">
                    <Instagram className="w-5 h-5" />
                </a>
            </div>
        </div>

        <div className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-8 w-8">
                        <Menu className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1a1a1e] border-zinc-800 mt-2 w-48 text-white">
                    <DropdownMenuItem asChild className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        <Link href="/about" className="w-full font-bold">About Me</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        <Link href="/" className="w-full">To-Do List</Link>
                    </DropdownMenuItem>
                    <div className="h-[1px] bg-zinc-800 my-1" />
                    <DropdownMenuItem asChild className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        <a href="https://facebook.com" className="flex items-center gap-2 w-full text-zinc-400">
                            <Facebook className="w-4 h-4 text-[#1877F2]" /> Facebook
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        <a href="https://instagram.com" className="flex items-center gap-2 w-full text-zinc-400">
                            <Instagram className="w-4 h-4 text-[#E4405F]" /> Instagram
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}