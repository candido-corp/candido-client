import React from 'react';
import { Clock } from 'lucide-react';
import { Opportunity } from '../types';

interface FreelanceFieldsProps {
  opportunity: Opportunity;
}

const FreelanceFields: React.FC<FreelanceFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-purple-600" />
      <span className="font-medium">Project-based Work</span>
    </div>
    <div className="bg-purple-50 p-3 rounded-lg">
      <h5 className="font-medium text-purple-900 mb-1">Flexibility</h5>
      <p className="text-sm text-purple-800">
        Remote work, flexible hours, and project-based compensation structure.
      </p>
    </div>
  </div>
);

export default FreelanceFields;
