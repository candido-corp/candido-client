import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Clock, DollarSign, MapPin, Users } from 'lucide-react';
import React from 'react';
import {
  BootcampFields,
  ChallengeFields,
  FreelanceFields,
  getOpportunityTypeBadge,
  InternshipFields,
  JobFields,
  MentorshipFields,
  OpportunityType,
  ResearchFields,
  ThesisFields,
  VolunteeringFields,
} from './cardTypes';
import { Opportunity } from './types';

type OpportunityCardProps = Pick<BaseFC, 'className'> & {
  opportunity: Opportunity;
  onViewDetails?: (opportunity: Opportunity) => void;
};

// Common field components
const CommonFields: React.FC<{ opportunity: Opportunity }> = ({
  opportunity,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {opportunity.description}
      </p>

      {/* Location */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Location</h4>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {opportunity.location}
        </div>
      </div>

      {/* Compensation Note */}
      {opportunity.compensation_note && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Compensation Details</h4>
          <p className="text-sm text-muted-foreground">
            {opportunity.compensation_note}
          </p>
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
        <div>
          <span className="font-medium">Start Date:</span>
          <br />
          {formatDate(opportunity.start_date)}
        </div>
        <div>
          <span className="font-medium">End Date:</span>
          <br />
          {formatDate(opportunity.end_date)}
        </div>
      </div>
    </div>
  );
};

// Mapping of opportunity types to their specific components
const OpportunityTypeComponents: Record<
  OpportunityType,
  React.FC<{ opportunity: Opportunity }>
> = {
  job: JobFields,
  internship: InternshipFields,
  freelance: FreelanceFields,
  challenge: ChallengeFields,
  bootcamp: BootcampFields,
  thesis: ThesisFields,
  mentorship: MentorshipFields,
  research: ResearchFields,
  volunteering: VolunteeringFields,
};

// Main component
const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onViewDetails,
  className,
}) => {
  const opportunityType = opportunity.opportunity_type_key as OpportunityType;
  const TypeSpecificFields = OpportunityTypeComponents[opportunityType];
  const typeBadge = getOpportunityTypeBadge(opportunityType);

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(opportunity);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLocationTypeLabel = (key: string) => {
    const labels = {
      remote: 'Remote',
      hybrid: 'Hybrid',
      onsite: 'On-site',
    };
    return labels[key as keyof typeof labels] || key;
  };

  const getLevelLabel = (key: string) => {
    const labels = {
      entry: 'Entry Level',
      mid: 'Mid Level',
      senior: 'Senior Level',
      executive: 'Executive',
    };
    return labels[key as keyof typeof labels] || key;
  };

  return (
    <Card
      className={cn(
        'glass-card flex h-full flex-col transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg',
        className
      )}
    >
      <CardHeader>
        {/* Title */}
        <CardTitle className="mb-2 text-xl">
          {opportunity.display_name}
        </CardTitle>

        {/* Badge for opportunity type */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className={typeBadge.color}>
            <Clock className="mr-1 h-3 w-3" />
            {typeBadge.label}
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <MapPin className="mr-1 h-3 w-3" />
            {getLocationTypeLabel(opportunity.location_type_key)}
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <DollarSign className="mr-1 h-3 w-3" />
            {formatCurrency(
              opportunity.compensation_amount,
              opportunity.currency_code
            )}
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Users className="mr-1 h-3 w-3" />
            {getLevelLabel(opportunity.opportunity_level_key)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4">
        {/* Content Area - grows to fill available space */}
        <div className="flex-1 space-y-4">
          {/* Common Fields */}
          <CommonFields opportunity={opportunity} />

          {/* Type-specific Fields */}
          {TypeSpecificFields && (
            <TypeSpecificFields opportunity={opportunity} />
          )}
        </div>

        {/* Apply Button - always at bottom */}
        {onViewDetails && (
          <div className="mt-auto pt-4">
            <button
              onClick={handleViewDetails}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View Details
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
