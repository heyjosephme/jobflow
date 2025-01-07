"use client";

import { useSession } from "@/lib/supabase/session-provider";
import OnboardingFlow from "@/components/OnboardingFlow";
import { redirect } from "next/navigation";

export default function OnboardingPage() {
  const session = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen">
      <OnboardingFlow />
    </main>
  );
}

// <OnboardingFlow userId={session.user.id} />
