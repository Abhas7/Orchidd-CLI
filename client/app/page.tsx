"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }


  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data?.session && !data?.user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans p-4">
      <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 bg-zinc-900/50 backdrop-blur-sm w-full max-w-md space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {/* Yellow circle background */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full -z-10 scale-110"></div>
            <img
              src={data?.user?.image || "/vercel.svg"}
              alt={data?.user?.name || "User"}
              width={120}
              height={120}
              className="rounded-full object-cover relative z-10"
            />
            {/* Green online indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-zinc-900 z-20"></div>
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white truncate">
              Welcome, {data?.user?.name || "User"}
            </h1>
            <p className="text-sm text-zinc-400">Authenticated User</p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px border-t border-dashed border-zinc-700"></div>

        {/* Email Section */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
            Email Address
          </p>
          <div className="bg-zinc-800 rounded-lg px-4 py-3 border border-zinc-700">
            <p className="text-base text-white break-all">
              {data?.user?.email || "No email"}
            </p>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onError: (ctx) => console.log(ctx),
                onSuccess: () => router.push("/sign-in"),
              },
            })
          }
          className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
        >
          Sign Out
        </Button>

        {/* Separator */}
        <div className="h-px border-t border-dashed border-zinc-700"></div>

        {/* Session Status */}
        <div className="text-center">
          <p className="text-xs text-zinc-500">Session Active</p>
        </div>
      </div>
    </div>
  );
}
