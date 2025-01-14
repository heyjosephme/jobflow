import React from 'react';
import { Plus, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const EmptyStateWidget = ({ onAddJob }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <Briefcase className="h-12 w-12 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold mb-2">
          Start Your Job Search Journey
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-sm">
          Track your job applications, manage interviews, and organize your job search all in one place.
        </p>
        
        <Button 
          onClick={onAddJob}
          size="lg" 
          className="flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Your First Job Application
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyStateWidget;
