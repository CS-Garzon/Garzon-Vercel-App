"use client";

import { Navbar } from "@/components/Navbar";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const photos = [
  "/GARZON_wow.jpg",
  "/GARZON_SHEESH.jpg",
  "/GARZON_CSSEC.jpg",
  "/GARZON_AWWW.jpg",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#121214] font-sans text-white">
      
      <Navbar />
      <div className="pt-32 px-6 max-w-2xl mx-auto pb-20">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl font-black mb-6 tracking-tighter">
            I'm <span className="text-[#5865f2]">Garzon.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Hello! I'm Garzon, a student developer and tech enthusiast.
            I love looking at beautiful and functional web applications.
            In my free time, I enjoy photography, gaming, and exploring new technologies.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {photos.map((src, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="group relative aspect-square bg-zinc-800 rounded-2xl overflow-hidden cursor-zoom-in shadow-xl">
                  <img 
                    src={src} 
                    alt="Gallery" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              </DialogTrigger>
              
              <DialogContent className="bg-transparent border-none shadow-none max-w-screen-md flex items-center justify-center p-0">
                 <DialogTitle className="sr-only">Photo Preview</DialogTitle>
                 <img 
                    src={src} 
                    alt="Full size" 
                    className="rounded-xl shadow-2xl max-h-[80vh] w-auto border-4 border-white/10" 
                 />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}