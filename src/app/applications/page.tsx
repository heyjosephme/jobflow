export default async function ApplicationsPage() {
  // Initially use faker data
  const applications = generateFakeApplications()
  
  return (
    <div className="p-4">
      <ApplicationList applications={applications} />
    </div>
  )
}
