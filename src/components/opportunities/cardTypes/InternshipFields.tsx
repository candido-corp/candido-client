import React from 'react';
import { Users } from 'lucide-react';
import { Opportunity } from '../types';

interface InternshipFieldsProps {
  opportunity: Opportunity;
}

const InternshipFields: React.FC<InternshipFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Users className="h-4 w-4 text-green-600" />
      <span className="font-medium">Internship Program</span>
    </div>
    <div className="bg-green-50 p-3 rounded-lg">
      <h5 className="font-medium text-green-900 mb-1">Learning Opportunities</h5>
      <p className="text-sm text-green-800">
        Mentorship program, hands-on experience, and potential for full-time conversion.
      </p>
    </div>
  </div>
);

export default InternshipFields;
