"use client";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationListProps } from "@/lib/types";

export function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
