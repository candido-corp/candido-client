import React from 'react';
import OpportunityCard from './OpportunityCard';
import { Opportunity } from './types';

// Mock data for testing different opportunity types
const mockOpportunities: Opportunity[] = [
  {
    opportunity_id: 1,
    account_id: 1,
    display_name: 'Senior Frontend Developer',
    notes: 'Full-time position',
    description:
      'Join our team to build cutting-edge web applications using modern technologies.',
    url_code: 'SNFD2024',
    max_applicants: 5,
    form_schema: '{"fields": [{"type": "file", "label": "CV"}]}',
    compensation_amount: 120000,
    compensation_note: 'Annual salary plus equity',
    currency_code: 'USD',
    location: 'San Francisco, CA',
    location_type_key: 'remote',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'senior',
    start_date: '2024-02-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-03-01T00:00:00Z',
    feedback_expiration_date: '2024-03-15T23:59:59Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 10,
    account_id: 10,
    display_name: 'AI Research Challenge',
    notes: 'Coding competition',
    description:
      'Solve complex AI problems and compete for substantial prizes.',
    url_code: 'AICHA24',
    max_applicants: 100,
    form_schema: '{"fields": [{"type": "file", "label": "Solution"}]}',
    compensation_amount: 5000,
    compensation_note: 'Prize pool distribution',
    currency_code: 'USD',
    location: 'Remote - Global',
    location_type_key: 'remote',
    opportunity_type_key: 'challenge',
    opportunity_status_key: 'published',
    opportunity_level_key: 'mid',
    start_date: '2024-03-01T00:00:00Z',
    end_date: '2024-03-30T23:59:59Z',
    feedback_publication_date: '2024-04-01T00:00:00Z',
    feedback_expiration_date: '2024-04-15T23:59:59Z',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 11,
    account_id: 11,
    display_name: 'Full-Stack Web Development Bootcamp',
    notes: 'Intensive training program',
    description:
      'Learn full-stack development in an intensive 16-week program.',
    url_code: 'FSBC24',
    max_applicants: 30,
    form_schema: '{"fields": [{"type": "file", "label": "Application"}]}',
    compensation_amount: 0,
    compensation_note: 'Free program with job placement assistance',
    currency_code: 'USD',
    location: 'Austin, TX',
    location_type_key: 'hybrid',
    opportunity_type_key: 'bootcamp',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2024-04-01T00:00:00Z',
    end_date: '2024-07-31T23:59:59Z',
    feedback_publication_date: '2024-08-01T00:00:00Z',
    feedback_expiration_date: '2024-08-15T23:59:59Z',
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z',
    deleted_at: null,
  },
];

const OpportunityTypeDemo: React.FC = () => {
  const handleViewDetails = (opportunity: Opportunity) => {
    console.log('View details for:', opportunity);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Opportunity Type Fields Demo</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.opportunity_id}
            opportunity={opportunity}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default OpportunityTypeDemo;
