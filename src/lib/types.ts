// src/lib/types.ts
import type { Application as PrismaApplication } from "@prisma/client";

// Extend only if needed
export type Application = PrismaApplication & {
  // Add any UI-specific fields
};

// Extended type with relations for UI components
export type ApplicationWithRelations = Application & {
  company: { name: string };
  notes: { content: string }[];
};

// Now you can use these in your components:
export interface ApplicationListProps {
  applications: ApplicationWithRelations[];
}

export interface ApplicationCardProps {
  application: ApplicationWithRelations;
}
