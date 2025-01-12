import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  GraduationCap,
  Target,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormData, onboardingSchema } from "@/lib/schemas/onboarding";
import { createUserProfile } from "@/app/actions/onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  PositionLevel,
  CompanySize,
  LearningStyle,
  ProficiencyLevel,
} from "@prisma/client";

const OnboardingFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      careerGoals: [],
      learningObjectives: [],
      skills: [],
    },
  });

  const onSubmit: SubmitHandler<OnboardingFormData> = async (data) => {
    try {
      const result = await createUserProfile(data);

      if (result.success) {
        toast.success("Profile created successfully!");
        router.push("/dashboard");
      } else {
        setError("root", {
          type: "server",
          message: result.error || "Something went wrong",
        });
        toast.error(result.error || "Failed to create profile");
      }
    } catch (error) {
      setError("root", {
        type: "server",
        message: "An unexpected error occurred",
      });
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">
                  Professional Background
                </h3>
                <p className="text-sm text-gray-500">
                  Tell us about your current role
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Input
                  {...register("jobRole")}
                  placeholder="Current/Desired Job Title"
                  className={errors.jobRole ? "border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.jobRole && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.jobRole.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("industry")}
                  placeholder="Industry"
                  className={errors.industry ? "border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.industry.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("positionLevel")}
                  className={`w-full p-2 border rounded ${
                    errors.positionLevel ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="">Select Position Level</option>
                  {Object.values(PositionLevel).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.positionLevel && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.positionLevel.message}
                  </p>
                )}
              </div>
            </div>

            {errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
                {errors.root.message}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Career Goals</h3>
                <p className="text-sm text-gray-500">
                  What are you aiming for?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  {...register("careerGoals.0")}
                  placeholder="Primary career goal"
                  className={errors.careerGoals ? "border-red-500" : ""}
                />
                {errors.careerGoals && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.careerGoals.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("companySize")}
                  className={`w-full p-2 border rounded ${
                    errors.companySize ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Preferred Company Size</option>
                  {Object.values(CompanySize).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {errors.companySize && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.companySize.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="number"
                  {...register("timeAvailability", { valueAsNumber: true })}
                  placeholder="Hours available per week for learning"
                  className={errors.timeAvailability ? "border-red-500" : ""}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Skills & Learning</h3>
                <p className="text-sm text-gray-500">
                  Tell us about your skills and how you learn best
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <select
                  {...register("preferredLearningStyle")}
                  className={`w-full p-2 border rounded ${
                    errors.preferredLearningStyle ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Preferred Learning Style</option>
                  {Object.values(LearningStyle).map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
                {errors.preferredLearningStyle && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.preferredLearningStyle.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("skills.0.name")}
                  placeholder="Add a key skill"
                  className={errors.skills ? "border-red-500" : ""}
                />
                <select
                  {...register("skills.0.proficiencyLevel")}
                  className="mt-2 w-full p-2 border rounded"
                >
                  <option value="">Select proficiency level</option>
                  {Object.values(ProficiencyLevel).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("learningObjectives.0")}
                  placeholder="What do you want to learn?"
                  className={errors.learningObjectives ? "border-red-500" : ""}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Welcome to JobFlow</CardTitle>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((prev) => prev - 1)}
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                type="button"
                className="ml-auto"
                onClick={() => setStep((prev) => prev + 1)}
                disabled={isSubmitting}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Complete Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
