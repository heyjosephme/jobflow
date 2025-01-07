import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, GraduationCap, Target, ArrowRight, ArrowLeft } from 'lucide-react';

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: '',
    industry: '',
    location: '',
    salaryExpectation: '',
    jobSearchGoals: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    // Here you would typically send the formData to your backend
    console.log('Submit form data:', formData);
    // Redirect to dashboard or main app
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Professional Background</h3>
                <p className="text-sm text-gray-500">Tell us about your current role</p>
              </div>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Current/Desired Job Title"
                value={formData.jobTitle}
                onChange={(e) => updateFormData('jobTitle', e.target.value)}
              />
              <Input
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
              />
              <Input
                placeholder="Industry"
                value={formData.industry}
                onChange={(e) => updateFormData('industry', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Job Search Preferences</h3>
                <p className="text-sm text-gray-500">Help us personalize your job search</p>
              </div>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Preferred Location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
              />
              <Input
                placeholder="Expected Salary Range"
                value={formData.salaryExpectation}
                onChange={(e) => updateFormData('salaryExpectation', e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Goals & Objectives</h3>
                <p className="text-sm text-gray-500">What are you looking to achieve?</p>
              </div>
            </div>
            <div className="space-y-2">
              {['Career Change', 'Better Salary', 'New Industry', 'Remote Work'].map((goal) => (
                <Button
                  key={goal}
                  variant={formData.jobSearchGoals.includes(goal) ? "default" : "outline"}
                  className="mr-2 mb-2"
                  onClick={() => {
                    const goals = formData.jobSearchGoals.includes(goal)
                      ? formData.jobSearchGoals.filter(g => g !== goal)
                      : [...formData.jobSearchGoals, goal];
                    updateFormData('jobSearchGoals', goals);
                  }}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold">You're All Set!</h3>
              <p className="text-sm text-gray-500">Ready to start your job search journey with JobFlow</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium">Summary</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li><span className="font-medium">Role:</span> {formData.jobTitle}</li>
                  <li><span className="font-medium">Industry:</span> {formData.industry}</li>
                  <li><span className="font-medium">Location:</span> {formData.location}</li>
                  <li><span className="font-medium">Goals:</span> {formData.jobSearchGoals.join(', ')}</li>
                </ul>
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
        <CardHeader>
          <CardTitle>Welcome to JobFlow</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button className="ml-auto" onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="ml-auto" onClick={handleSubmit}>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
