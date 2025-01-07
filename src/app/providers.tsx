"use client";

import { SessionProvider } from "@/lib/supabase/session-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
