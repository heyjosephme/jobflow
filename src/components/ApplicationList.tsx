'use client'
import { Card } from "@/components/ui/card"

export function ApplicationList({ applications }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.map(app => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  )
}
