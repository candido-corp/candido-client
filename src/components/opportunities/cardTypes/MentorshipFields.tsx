import React from 'react';
import { UserCheck } from 'lucide-react';
import { Opportunity } from '../types';

interface MentorshipFieldsProps {
  opportunity: Opportunity;
}

const MentorshipFields: React.FC<MentorshipFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <UserCheck className="h-4 w-4 text-teal-600" />
      <span className="font-medium">Mentorship Program</span>
    </div>
    <div className="bg-teal-50 p-3 rounded-lg">
      <h5 className="font-medium text-teal-900 mb-1">Guidance & Growth</h5>
      <p className="text-sm text-teal-800">
        One-on-one mentorship sessions focused on career development and skill building.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-teal-100 p-2 rounded-md">
        <div className="text-xs text-teal-900 font-medium">Sessions</div>
        <div className="text-xs text-teal-800">Weekly 1-hour</div>
      </div>
      <div className="bg-teal-100 p-2 rounded-md">
        <div className="text-xs text-teal-900 font-medium">Duration</div>
        <div className="text-xs text-teal-800">3-6 months</div>
      </div>
    </div>
  </div>
);

export default MentorshipFields;
