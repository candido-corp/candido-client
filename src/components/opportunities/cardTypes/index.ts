// Export all opportunity type field components
export { default as JobFields } from './JobFields';
export { default as InternshipFields } from './InternshipFields';
export { default as FreelanceFields } from './FreelanceFields';
export { default as ChallengeFields } from './ChallengeFields';
export { default as BootcampFields } from './BootcampFields';
export { default as ThesisFields } from './ThesisFields';
export { default as MentorshipFields } from './MentorshipFields';
export { default as ResearchFields } from './ResearchFields';
export { default as VolunteeringFields } from './VolunteeringFields';

// Type definitions
export type OpportunityType = 
  | 'job' 
  | 'internship' 
  | 'freelance'
  | 'challenge'
  | 'bootcamp'
  | 'thesis'
  | 'mentorship'
  | 'research'
  | 'volunteering';

// Configuration for opportunity type badges
export const getOpportunityTypeBadge = (opportunityType: OpportunityType) => {
  const typeConfig = {
    job: { label: 'Full-time', color: 'bg-blue-100 text-blue-800' },
    internship: { label: 'Internship', color: 'bg-green-100 text-green-800' },
    freelance: { label: 'Freelance', color: 'bg-purple-100 text-purple-800' },
    challenge: { label: 'Challenge', color: 'bg-orange-100 text-orange-800' },
    bootcamp: { label: 'Bootcamp', color: 'bg-red-100 text-red-800' },
    thesis: { label: 'Thesis', color: 'bg-indigo-100 text-indigo-800' },
    mentorship: { label: 'Mentorship', color: 'bg-teal-100 text-teal-800' },
    research: { label: 'Research', color: 'bg-cyan-100 text-cyan-800' },
    volunteering: { label: 'Volunteering', color: 'bg-pink-100 text-pink-800' },
  };
  
  return typeConfig[opportunityType] || { label: opportunityType, color: 'bg-gray-100 text-gray-800' };
};
