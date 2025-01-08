import { ApplicationList } from "@/components/ApplicationList";
import { generateFakeApplications } from "@/lib/test-data";

export default async function ApplicationsPage() {
  // Initially use faker data
  const applications = generateFakeApplications(9);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications
        </p>
      </header>
      <ApplicationList applications={applications} />
    </div>
  );
}
