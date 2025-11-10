import React from 'react';
import { Users } from 'lucide-react';
import { Opportunity } from '../types';

interface JobFieldsProps {
  opportunity: Opportunity;
}

const JobFields: React.FC<JobFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Users className="h-4 w-4 text-blue-600" />
      <span className="font-medium">Full-time Position</span>
    </div>
    <div className="bg-blue-50 p-3 rounded-lg">
      <h5 className="font-medium text-blue-900 mb-1">Employment Benefits</h5>
      <p className="text-sm text-blue-800">
        Full benefits package including health insurance, retirement plans, and professional development opportunities.
      </p>
    </div>
  </div>
);

export default JobFields;
