"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ShieldAlert, ArrowRight, Terminal } from "lucide-react"
import { motion } from "framer-motion"

const DeviceAuthorizationPage = () => {
  const [userCode, setUserCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const formattedCode = userCode.trim().replace(/-/g, "").toUpperCase()

      const response = await authClient.device({
        query: { user_code: formattedCode },
      })

      if (response.data) {
        router.push(`/approve?user_code=${formattedCode}`)
      }
    } catch (err) {
      setError("Invalid or expired code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4, 8)
    }
    setUserCode(value)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden grain mesh-gradient bg-background">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md flex flex-col items-center"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="p-4 rounded-2xl glass border border-white/20"
          >
            <ShieldAlert className="w-10 h-10 text-yellow-400" />
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent text-glow"
            >
              Device Authorization
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-zinc-400 text-lg font-medium"
            >
              Enter your device code to continue
            </motion.p>
          </div>
        </div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="w-full glass rounded-3xl p-8 border border-white/10 relative overflow-hidden group shadow-2xl"
        >
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Code Input */}
            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-zinc-300 mb-4 tracking-wide uppercase">
                Device Code
              </label>
              <div className="relative">
                <input
                  id="code"
                  type="text"
                  value={userCode}
                  onChange={handleCodeChange}
                  placeholder="XXXX-XXXX"
                  maxLength={9}
                  autoComplete="off"
                  className="w-full px-6 py-5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 font-mono text-center text-2xl tracking-[0.2em] transition-all shadow-inner"
                />
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 -z-10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-zinc-500 mt-4 text-center italic font-medium">
                Find this code on the terminal device you want to authorize
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || userCode.length < 9}
              className="w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.4)] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Info Box */}
            <div className="p-5 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md">
              <p className="text-[11px] text-zinc-500 leading-relaxed text-center font-medium uppercase tracking-tight">
                This code is unique to your device and will expire shortly. Keep it confidential.
              </p>
            </div>
          </div>
        </motion.form>

        {/* Footer Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex items-center gap-2 text-zinc-600 font-mono text-[10px] tracking-[0.3em] uppercase"
        >
          <Terminal size={12} />
          Secure Node • Orchidd CLI
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DeviceAuthorizationPage