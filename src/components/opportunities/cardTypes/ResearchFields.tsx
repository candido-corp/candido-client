import React from 'react';
import { Microscope } from 'lucide-react';
import { Opportunity } from '../types';

interface ResearchFieldsProps {
  opportunity: Opportunity;
}

const ResearchFields: React.FC<ResearchFieldsProps> = ({ opportunity: _opportunity }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm">
      <Microscope className="h-4 w-4 text-cyan-600" />
      <span className="font-medium">Research Project</span>
    </div>
    <div className="bg-cyan-50 p-3 rounded-lg">
      <h5 className="font-medium text-cyan-900 mb-1">Scientific Investigation</h5>
      <p className="text-sm text-cyan-800">
        Participate in cutting-edge research with potential for academic or industry impact.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-cyan-100 p-2 rounded-md">
        <div className="text-xs text-cyan-900 font-medium">Field</div>
        <div className="text-xs text-cyan-800">AI/ML Research</div>
      </div>
      <div className="bg-cyan-100 p-2 rounded-md">
        <div className="text-xs text-cyan-900 font-medium">Publication</div>
        <div className="text-xs text-cyan-800">Potential</div>
      </div>
    </div>
  </div>
);

export default ResearchFields;
