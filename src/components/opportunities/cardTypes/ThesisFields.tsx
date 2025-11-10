import React from 'react';
import { BookOpen } from 'lucide-react';
import { Opportunity } from '../types';

interface ThesisFieldsProps {
  opportunity: Opportunity;
}

const ThesisFields: React.FC<ThesisFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <BookOpen className="h-4 w-4 text-indigo-600" />
      <span className="font-medium">Research Thesis</span>
    </div>
    <div className="bg-indigo-50 p-3 rounded-lg">
      <h5 className="font-medium text-indigo-900 mb-1">Academic Research</h5>
      <p className="text-sm text-indigo-800">
        Conduct original research under academic supervision with potential for publication.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-indigo-100 p-2 rounded-md">
        <div className="text-xs text-indigo-900 font-medium">Research Area</div>
        <div className="text-xs text-indigo-800">Computer Science</div>
      </div>
      <div className="bg-indigo-100 p-2 rounded-md">
        <div className="text-xs text-indigo-900 font-medium">Level</div>
        <div className="text-xs text-indigo-800">Master's/PhD</div>
      </div>
    </div>
  </div>
);

export default ThesisFields;
