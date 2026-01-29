"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Smartphone, Terminal, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

const DeviceApprovalPage = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter()
  const SearchParams = useSearchParams();
  const userCode = SearchParams.get("user_code")

  const [isProcessing, setIsProcessing] = useState({
    approve: false,
    deny: false
  })

  useEffect(() => {
    if (!isPending && !data?.session && !data?.user) {
      const currentURL = window.location.href;
      router.push(`/sign-in?callbackURL=${encodeURIComponent(currentURL)}`)
    }
  }, [data, isPending, router])

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black grain mesh-gradient">
        <Spinner />
      </div>
    )
  }

  if (!data?.session) {
    return null;
  }

  const handleApprove = async () => {
    setIsProcessing({ approve: true, deny: false })
    try {
      toast.loading("Approving Device...", { id: "loading" })
      await authClient.device.approve({ userCode: userCode! })
      toast.dismiss("loading")
      toast.success("Device Approved successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to approve")
    } finally {
      setIsProcessing({ approve: false, deny: false })
    }
  }

  const handleDeny = async () => {
    setIsProcessing({ approve: false, deny: true })
    try {
      toast.loading("Denying Device...", { id: "loading" })
      await authClient.device.deny({ userCode: userCode! })
      await authClient.signOut();
      toast.dismiss("loading")
      toast.success("Device access denied")
      router.push("/sign-in")
    } catch (error) {
      toast.error("Failed to deny device")
      toast.dismiss("loading")
    } finally {
      setIsProcessing({ approve: false, deny: false })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden grain mesh-gradient bg-background">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-6 mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-2xl glass border border-white/20 relative"
          >
            <Smartphone className="w-10 h-10 text-indigo-400" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]">
              <span className="text-[10px] text-black font-bold">!</span>
            </div>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent text-glow">
              Approve Device
            </h1>
            <p className="text-zinc-400 font-medium">A new terminal is requesting access</p>
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full glass rounded-3xl p-8 border border-white/10 space-y-8 shadow-2xl"
        >
          {/* Authorization Code Section */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Authorization Code</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl py-6 px-4">
              <p className="text-3xl font-mono font-bold text-indigo-400 text-center tracking-[0.3em]">
                {userCode || "---"}
              </p>
            </div>
            <p className="text-[11px] text-zinc-500 text-center font-medium">Verify this matches the code on your terminal</p>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Account Section */}
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Target Account</p>
            <div className="flex items-center justify-center gap-2 text-zinc-200 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {data?.user?.email}
            </div>
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                Only approve if you initiated this request. For security, never share this code.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-2">
            <Button
              onClick={handleApprove}
              disabled={isProcessing.approve}
              className="w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {isProcessing.approve ? <><Spinner className="w-4 h-4" /> Approving...</> : <><CheckCircle className="w-5 h-5" /> Approve Access</>}
            </Button>

            <Button
              onClick={handleDeny}
              variant="outline"
              disabled={isProcessing.deny}
              className="w-full h-14 border-white/10 glass text-zinc-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              {isProcessing.deny ? <><Spinner className="w-4 h-4" /> Denying...</> : <><XCircle className="w-5 h-5" /> Deny Access</>}
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center gap-2 text-zinc-600 font-mono text-[10px] tracking-widest uppercase"
        >
          <ShieldCheck size={12} />
          Verified Secure • Orchidd
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DeviceApprovalPage