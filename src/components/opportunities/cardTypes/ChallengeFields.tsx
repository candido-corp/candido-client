import React from 'react';
import { Trophy } from 'lucide-react';
import { Opportunity } from '../types';

interface ChallengeFieldsProps {
  opportunity: Opportunity;
}

const ChallengeFields: React.FC<ChallengeFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Trophy className="h-4 w-4 text-orange-600" />
      <span className="font-medium">Coding Challenge</span>
    </div>
    <div className="bg-orange-50 p-3 rounded-lg">
      <h5 className="font-medium text-orange-900 mb-1">Competition Details</h5>
      <p className="text-sm text-orange-800">
        Solve complex problems, showcase your skills, and compete for prizes and recognition.
      </p>
    </div>
    <div className="bg-orange-100 p-2 rounded-md">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-orange-900">Prize Pool:</span>
        <span className="text-orange-800">Up to $5,000</span>
      </div>
    </div>
  </div>
);

export default ChallengeFields;
