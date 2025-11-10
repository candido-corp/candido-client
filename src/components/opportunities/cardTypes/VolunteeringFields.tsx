import React from 'react';
import { Heart } from 'lucide-react';
import { Opportunity } from '../types';

interface VolunteeringFieldsProps {
  opportunity: Opportunity;
}

const VolunteeringFields: React.FC<VolunteeringFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Heart className="h-4 w-4 text-pink-600" />
      <span className="font-medium">Volunteer Opportunity</span>
    </div>
    <div className="bg-pink-50 p-3 rounded-lg">
      <h5 className="font-medium text-pink-900 mb-1">Community Impact</h5>
      <p className="text-sm text-pink-800">
        Make a difference in your community while gaining valuable experience and connections.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-pink-100 p-2 rounded-md">
        <div className="text-xs text-pink-900 font-medium">Commitment</div>
        <div className="text-xs text-pink-800">Flexible hours</div>
      </div>
      <div className="bg-pink-100 p-2 rounded-md">
        <div className="text-xs text-pink-900 font-medium">Cause</div>
        <div className="text-xs text-pink-800">Tech Education</div>
      </div>
    </div>
  </div>
);

export default VolunteeringFields;
