import { ApplicationList } from "@/components/ApplicationList";
import { generateFakeApplications } from "@/lib/test-data";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EmptyStateWidget from "@/components/EmptyStateWidget";

export default async function ApplicationsPage() {
  // Initially use faker data
  //const applications = generateFakeApplications(9);
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.email}</h1>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications
        </p>
      </header>
      {/*  <ApplicationList applications={applications} /> */}
      <EmptyStateWidget />
    </div>
  );
}
