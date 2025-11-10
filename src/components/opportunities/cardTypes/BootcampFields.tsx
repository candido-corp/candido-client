import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Opportunity } from '../types';

interface BootcampFieldsProps {
  opportunity: Opportunity;
}

const BootcampFields: React.FC<BootcampFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <GraduationCap className="h-4 w-4 text-red-600" />
      <span className="font-medium">Intensive Training Program</span>
    </div>
    <div className="bg-red-50 p-3 rounded-lg">
      <h5 className="font-medium text-red-900 mb-1">Accelerated Learning</h5>
      <p className="text-sm text-red-800">
        Intensive skill development program with expert instructors and hands-on projects.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-red-100 p-2 rounded-md">
        <div className="text-xs text-red-900 font-medium">Duration</div>
        <div className="text-xs text-red-800">12-24 weeks</div>
      </div>
      <div className="bg-red-100 p-2 rounded-md">
        <div className="text-xs text-red-900 font-medium">Format</div>
        <div className="text-xs text-red-800">Full-time</div>
      </div>
    </div>
  </div>
);

export default BootcampFields;
