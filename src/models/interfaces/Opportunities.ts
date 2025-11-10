export type Opportunity = {
  id: number;
  title: string;
  company: string;
  location: string;
  contractType: 'Full Remote' | 'Hybrid' | 'On-site';
  salaryRange: string;
  experienceLevel: '0-2 years' | '3-5 years' | '5+ years';
  description: string;
  technologies: string[];
  benefits: string[];
  postedDate: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  sponsored: boolean;
};
