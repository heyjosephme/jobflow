import { z } from "zod";
import { PositionLevel, CompanySize, LearningStyle, ProficiencyLevel } from "@prisma/client";

export const onboardingSchema = z.object({
  // Professional Info
  jobRole: z.string().min(1, "Job role is required"),
  industry: z.string().min(1, "Industry is required"),
  positionLevel: z.nativeEnum(PositionLevel, {
    required_error: "Please select a position level",
  }),
  
  // Career Goals
  careerGoals: z.array(z.string()).min(1, "At least one career goal is required"),
  companySize: z.nativeEnum(CompanySize, {
    required_error: "Please select a company size",
  }),
  timeAvailability: z.number().min(1, "Please specify available hours"),
  
  // Skills & Learning
  preferredLearningStyle: z.nativeEnum(LearningStyle, {
    required_error: "Please select a learning style",
  }),
  skills: z.array(z.object({
    name: z.string().min(1, "Skill name is required"),
    proficiencyLevel: z.nativeEnum(ProficiencyLevel, {
      required_error: "Please select a proficiency level",
    }),
  })).min(1, "At least one skill is required"),
  learningObjectives: z.array(z.string()).min(1, "At least one learning objective is required"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>; 