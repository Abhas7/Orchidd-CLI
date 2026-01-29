"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Terminal, ArrowRight } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden grain mesh-gradient">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full flex flex-col items-center space-y-12"
      >
        {/* Terminal Graphic Mockup */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -10, 0]
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            y: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }
          }}
          className="w-full max-w-2xl glass rounded-xl overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="text-[10px] text-zinc-500 font-mono flex-1 text-center">orbital-cli — bash</div>
          </div>
          <div className="p-6 font-mono text-sm space-y-2">
            <div className="flex gap-2 text-zinc-400">
              <span className="text-indigo-400">$</span>
              <span>orbital login --device</span>
            </div>
            <div className="text-zinc-500">Waiting for authentication...</div>
            <div className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-zinc-300">Device linked successfully</span>
            </div>
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-indigo-400 inline-block align-middle"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent text-glow"
          >
            Welcome back to <br />
            <span className="text-indigo-400">Orbital CLI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto font-medium"
          >
            Authenticate your device to continue building amazing things from your terminal.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] rounded-full relative overflow-hidden"
            onClick={() => {
              const urlParams = new URLSearchParams(window.location.search);
              let callbackURL = urlParams.get("callbackURL") || "/device";

              if (callbackURL.startsWith("/")) {
                callbackURL = window.location.origin + callbackURL;
              }

              authClient.signIn.social({
                provider: "github",
                callbackURL: callbackURL,
              });
            }}
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
            <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Button>

          <p className="text-zinc-500 text-sm mt-6 text-center">
            Secure authentication powered by Better Auth
          </p>
        </motion.div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-zinc-600 font-mono text-xs tracking-widest uppercase">
          <Terminal size={14} />
          Built by Orchidd
        </div>
      </div>
    </div>
  );
};
