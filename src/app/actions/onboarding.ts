'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { prisma } from "@/lib/prisma"
import { onboardingSchema } from "@/lib/schemas/onboarding"
import { revalidatePath } from "next/cache"
import type { OnboardingFormData } from "@/lib/schemas/onboarding"

export async function createUserProfile(formData: OnboardingFormData) {
  try {
    // Use createServerActionClient for server actions
    const supabase = createServerActionClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Validate the form data
    const validatedData = onboardingSchema.parse(formData)

    // Create the user profile with skills
    const userProfile = await prisma.userProfile.create({
      data: {
        userId: session.user.id,
        jobRole: validatedData.jobRole,
        industry: validatedData.industry,
        positionLevel: validatedData.positionLevel,
        companySize: validatedData.companySize,
        timeAvailability: validatedData.timeAvailability,
        preferredLearningStyle: validatedData.preferredLearningStyle,
        careerGoals: validatedData.careerGoals,
        learningObjectives: validatedData.learningObjectives,
        onboardingCompleted: true,
        // Create skills using nested write
        skills: {
          create: validatedData.skills.map(skill => ({
            name: skill.name,
            proficiencyLevel: skill.proficiencyLevel,
          }))
        }
      },
      // Include skills in the response
      include: {
        skills: true
      }
    })

    revalidatePath('/dashboard')
    return { success: true, data: userProfile }
  } catch (error) {
    console.error('Error creating user profile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create profile' 
    }
  }
} 