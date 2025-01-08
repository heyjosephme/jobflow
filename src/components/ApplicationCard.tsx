"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ApplicationCardProps } from "@/lib/types";

export function ApplicationCard({ application }: ApplicationCardProps) {
  const statusColors = {
    SAVED: "bg-gray-200 text-gray-700",
    APPLIED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    WITHDRAWN: "bg-purple-100 text-purple-700",
  };

  // Get the latest note if any exists
  const latestNote = application.notes?.[0]?.content;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              {application.company.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {application.jobTitle}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={statusColors[application.status]}
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {latestNote && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {latestNote}
          </p>
        )}
        <div className="mt-2 text-sm">
          {application.location && (
            <span className="text-muted-foreground mr-4">
              📍 {application.location}
            </span>
          )}
          {application.salary && (
            <span className="text-muted-foreground">
              💰 {application.salary}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex justify-between w-full">
          <span>
            Applied {formatDistanceToNow(application.appliedDate)} ago
          </span>
          <span>Updated {formatDistanceToNow(application.updatedAt)} ago</span>
        </div>
      </CardFooter>
    </Card>
  );
}
