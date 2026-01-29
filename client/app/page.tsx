"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, User, Mail, ShieldCheck, Terminal } from "lucide-react";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.push("/sign-in");
    }
  }, [data, isPending, router]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background grain mesh-gradient">
        <Spinner />
      </div>
    );
  }

  if (!data?.session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden grain mesh-gradient bg-background">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg flex flex-col items-center"
      >
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full glass rounded-[32px] p-10 border border-white/10 space-y-10 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-6 relative">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30"
              />
              <div className="w-32 h-32 rounded-full p-1 bg-white/10 backdrop-blur-3xl relative">
                <img
                  src={data?.user?.image || "/vercel.svg"}
                  alt={data?.user?.name || "User"}
                  className="w-full h-full rounded-full object-cover border-2 border-white/20"
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#0a0a0a] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent text-glow">
                {data?.user?.name || "User"}
              </h1>
              <div className="flex items-center gap-2 justify-center text-zinc-500 font-medium uppercase text-[10px] tracking-[0.2em]">
                <ShieldCheck size={12} className="text-indigo-400" />
                Verified Session
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1">
                <Mail size={12} /> Email Identity
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 group/item hover:bg-white/[0.07] transition-colors">
                <p className="text-zinc-200 font-medium text-lg leading-none truncate">
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.push("/sign-in"),
                  },
                })
              }
              className="w-full h-14 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <LogOut className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
              Terminate Session
            </Button>
          </div>
        </motion.div>

        {/* Footer Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center gap-2 text-zinc-600 font-mono text-[10px] tracking-widest uppercase"
        >
          <Terminal size={12} />
          Orbital System • v1.0.0
        </motion.div>
      </motion.div>
    </div>
  );
}
