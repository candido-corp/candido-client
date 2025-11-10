import {
  Opportunity,
  OpportunityApiParams,
  OpportunityApiResponse,
  OpportunityFilters,
} from '@/components/opportunities/types';

// Mock data con la struttura API reale
const mockOpportunities: Opportunity[] = [
  {
    opportunity_id: 1,
    account_id: 1,
    display_name: 'Senior Frontend Developer',
    notes: 'Looking for experienced frontend developer',
    description:
      "Join our team to build cutting-edge web applications using modern technologies. You'll work on high-impact projects that reach millions of users.",
    url_code: 'SNFD2024',
    max_applicants: 5,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "Portfolio URL"}]}',
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
    opportunity_id: 2,
    account_id: 2,
    display_name: 'Software Engineer Intern',
    notes: 'Entry internship',
    description: 'Internship in software development.',
    url_code: 'ABCD',
    max_applicants: 10,
    form_schema: '{"fields": [{"type": "file", "label": "CV"}]}',
    compensation_amount: 800.0,
    compensation_note: 'Monthly stipend',
    currency_code: 'EUR',
    location: 'Remote - EU only',
    location_type_key: 'remote',
    opportunity_type_key: 'internship',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2023-12-31T23:00:00Z',
    end_date: '2024-01-30T23:00:00Z',
    feedback_publication_date: '2024-02-09T23:00:00Z',
    feedback_expiration_date: '2024-02-19T23:00:00Z',
    created_at: '2025-06-30T13:30:40.163131Z',
    updated_at: '2025-06-30T13:30:40.163131Z',
    deleted_at: null,
  },
  {
    opportunity_id: 3,
    account_id: 3,
    display_name: 'Full Stack Developer',
    notes: 'Mid-level position',
    description:
      'Build scalable web applications from frontend to backend. Perfect opportunity to grow your skills in a fast-paced startup environment.',
    url_code: 'FSTK2024',
    max_applicants: 8,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "GitHub Profile"}]}',
    compensation_amount: 85000,
    compensation_note: 'Annual salary plus benefits',
    currency_code: 'USD',
    location: 'New York, NY',
    location_type_key: 'hybrid',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'mid',
    start_date: '2024-03-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-03-15T00:00:00Z',
    feedback_expiration_date: '2024-03-30T23:59:59Z',
    created_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-14T09:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 4,
    account_id: 4,
    display_name: 'DevOps Engineer',
    notes: 'Cloud infrastructure specialist',
    description:
      'Manage cloud infrastructure and deployment pipelines. Help scale our platform to handle millions of requests per day.',
    url_code: 'DEVOPS24',
    max_applicants: 3,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "Certifications"}]}',
    compensation_amount: 130000,
    compensation_note: 'Annual salary plus stock options',
    currency_code: 'USD',
    location: 'Seattle, WA',
    location_type_key: 'onsite',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'senior',
    start_date: '2024-02-15T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-03-01T00:00:00Z',
    feedback_expiration_date: '2024-03-15T23:59:59Z',
    created_at: '2024-01-12T14:00:00Z',
    updated_at: '2024-01-12T14:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 5,
    account_id: 5,
    display_name: 'UI/UX Designer',
    notes: 'Creative design role',
    description:
      'Design user-centered digital experiences that delight customers. Work closely with product and engineering teams.',
    url_code: 'UIUX2024',
    max_applicants: 6,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "file", "label": "Portfolio"}]}',
    compensation_amount: 75000,
    compensation_note: 'Annual salary plus creative budget',
    currency_code: 'USD',
    location: 'Los Angeles, CA',
    location_type_key: 'hybrid',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'mid',
    start_date: '2024-04-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-04-15T00:00:00Z',
    feedback_expiration_date: '2024-04-30T23:59:59Z',
    created_at: '2024-01-11T11:00:00Z',
    updated_at: '2024-01-11T11:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 6,
    account_id: 6,
    display_name: 'Backend Developer Intern',
    notes: 'Internship opportunity',
    description:
      'Learn backend development in a supportive environment. Build APIs and work with databases while gaining real-world experience.',
    url_code: 'BKND24',
    max_applicants: 15,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "University"}]}',
    compensation_amount: 2500,
    compensation_note: 'Monthly stipend',
    currency_code: 'USD',
    location: 'Boston, MA',
    location_type_key: 'remote',
    opportunity_type_key: 'internship',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z',
    feedback_publication_date: '2024-09-01T00:00:00Z',
    feedback_expiration_date: '2024-09-15T23:59:59Z',
    created_at: '2024-01-10T16:00:00Z',
    updated_at: '2024-01-10T16:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 7,
    account_id: 7,
    display_name: 'Python Developer',
    notes: 'Data focused role',
    description:
      'Develop data processing pipelines and machine learning models. Work with large datasets and cutting-edge AI technologies.',
    url_code: 'PYTH24',
    max_applicants: 4,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "GitHub"}, {"type": "text", "label": "ML Experience"}]}',
    compensation_amount: 110000,
    compensation_note: 'Annual salary plus learning budget',
    currency_code: 'USD',
    location: 'Chicago, IL',
    location_type_key: 'onsite',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'mid',
    start_date: '2024-03-15T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-04-01T00:00:00Z',
    feedback_expiration_date: '2024-04-15T23:59:59Z',
    created_at: '2024-01-09T13:00:00Z',
    updated_at: '2024-01-09T13:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 8,
    account_id: 8,
    display_name: 'Infrastructure Engineer',
    notes: 'Cloud infrastructure specialist',
    description:
      'Build and maintain scalable cloud infrastructure. Experience with Terraform and Kubernetes required.',
    url_code: 'INFRA24',
    max_applicants: 2,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "Cloud Certifications"}]}',
    compensation_amount: 125000,
    compensation_note: 'Annual salary plus equity',
    currency_code: 'USD',
    location: 'Denver, CO',
    location_type_key: 'hybrid',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'senior',
    start_date: '2024-02-20T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-03-05T00:00:00Z',
    feedback_expiration_date: '2024-03-20T23:59:59Z',
    created_at: '2024-01-08T12:00:00Z',
    updated_at: '2024-01-08T12:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 9,
    account_id: 9,
    display_name: 'Junior Frontend Developer',
    notes: 'Entry level position',
    description:
      'Join our creative team to build beautiful websites and applications. Perfect for someone starting their career in frontend development.',
    url_code: 'JRFND24',
    max_applicants: 12,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "Portfolio URL"}]}',
    compensation_amount: 65000,
    compensation_note: 'Annual salary plus mentorship',
    currency_code: 'USD',
    location: 'Portland, OR',
    location_type_key: 'remote',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2024-04-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-04-15T00:00:00Z',
    feedback_expiration_date: '2024-04-30T23:59:59Z',
    created_at: '2024-01-07T15:00:00Z',
    updated_at: '2024-01-07T15:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 10,
    account_id: 10,
    display_name: 'Senior Backend Engineer',
    notes: 'FinTech specialist',
    description:
      'Lead backend development for financial applications. Experience with high-frequency trading systems preferred.',
    url_code: 'SNBK24',
    max_applicants: 3,
    form_schema:
      '{"fields": [{"type": "file", "label": "CV"}, {"type": "text", "label": "Trading Experience"}]}',
    compensation_amount: 150000,
    compensation_note: 'Annual salary plus significant bonuses',
    currency_code: 'USD',
    location: 'Miami, FL',
    location_type_key: 'onsite',
    opportunity_type_key: 'job',
    opportunity_status_key: 'published',
    opportunity_level_key: 'senior',
    start_date: '2024-01-15T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2024-02-01T00:00:00Z',
    feedback_expiration_date: '2024-02-15T23:59:59Z',
    created_at: '2024-01-06T10:00:00Z',
    updated_at: '2024-01-06T10:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 11,
    account_id: 11,
    display_name: 'Coding Challenge: Algorithm Master',
    notes: 'Competitive programming challenge',
    description:
      'Test your algorithmic thinking with our advanced coding challenge. Solve complex problems within time constraints and compete for prizes.',
    url_code: 'ALGOCH24',
    max_applicants: 100,
    form_schema:
      '{"fields": [{"type": "text", "label": "GitHub Username"}, {"type": "text", "label": "Programming Language Preference"}]}',
    compensation_amount: 5000,
    compensation_note: 'Prize money for top performers',
    currency_code: 'USD',
    location: 'Online Competition',
    location_type_key: 'remote',
    opportunity_type_key: 'challenge',
    opportunity_status_key: 'published',
    opportunity_level_key: 'mid',
    start_date: '2024-03-01T00:00:00Z',
    end_date: '2024-03-07T23:59:59Z',
    feedback_publication_date: '2024-03-10T00:00:00Z',
    feedback_expiration_date: '2024-03-15T23:59:59Z',
    created_at: '2024-01-05T12:00:00Z',
    updated_at: '2024-01-05T12:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 12,
    account_id: 12,
    display_name: 'Full-Stack Development Bootcamp',
    notes: 'Intensive 12-week program',
    description:
      'Transform your career with our intensive full-stack development bootcamp. Learn modern web technologies, build real projects, and get job placement assistance.',
    url_code: 'FSBOOT24',
    max_applicants: 30,
    form_schema:
      '{"fields": [{"type": "file", "label": "Resume"}, {"type": "text", "label": "Motivation Letter"}, {"type": "text", "label": "Programming Experience"}]}',
    compensation_amount: 15000,
    compensation_note: 'Course fee with payment plans available',
    currency_code: 'USD',
    location: 'San Francisco, CA',
    location_type_key: 'hybrid',
    opportunity_type_key: 'bootcamp',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2024-04-15T00:00:00Z',
    end_date: '2024-07-15T23:59:59Z',
    feedback_publication_date: '2024-07-20T00:00:00Z',
    feedback_expiration_date: '2024-07-30T23:59:59Z',
    created_at: '2024-01-04T10:00:00Z',
    updated_at: '2024-01-04T10:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 13,
    account_id: 13,
    display_name: 'Master Thesis: AI in Healthcare',
    notes: 'Graduate research opportunity',
    description:
      'Conduct groundbreaking research on artificial intelligence applications in healthcare. Work with real medical data and contribute to life-saving innovations.',
    url_code: 'AIHEALTH24',
    max_applicants: 2,
    form_schema:
      '{"fields": [{"type": "file", "label": "Academic Transcript"}, {"type": "file", "label": "Research Proposal"}, {"type": "text", "label": "Supervisor Reference"}]}',
    compensation_amount: 2000,
    compensation_note: 'Monthly research stipend',
    currency_code: 'EUR',
    location: 'Berlin, Germany',
    location_type_key: 'onsite',
    opportunity_type_key: 'thesis',
    opportunity_status_key: 'published',
    opportunity_level_key: 'senior',
    start_date: '2024-09-01T00:00:00Z',
    end_date: '2025-08-31T23:59:59Z',
    feedback_publication_date: '2025-09-15T00:00:00Z',
    feedback_expiration_date: '2025-09-30T23:59:59Z',
    created_at: '2024-01-03T14:00:00Z',
    updated_at: '2024-01-03T14:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 14,
    account_id: 14,
    display_name: 'Tech Career Mentorship Program',
    notes: 'One-on-one career guidance',
    description:
      'Get personalized career guidance from industry veterans. Monthly sessions covering career strategy, technical skills, and industry insights.',
    url_code: 'MENTOR24',
    max_applicants: 10,
    form_schema:
      '{"fields": [{"type": "file", "label": "Resume"}, {"type": "text", "label": "Career Goals"}, {"type": "text", "label": "Current Challenges"}]}',
    compensation_amount: 500,
    compensation_note: 'Monthly mentorship fee',
    currency_code: 'USD',
    location: 'Virtual Sessions',
    location_type_key: 'remote',
    opportunity_type_key: 'mentorship',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2024-02-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    feedback_publication_date: '2025-01-15T00:00:00Z',
    feedback_expiration_date: '2025-01-31T23:59:59Z',
    created_at: '2024-01-02T11:00:00Z',
    updated_at: '2024-01-02T11:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 15,
    account_id: 15,
    display_name: 'Quantum Computing Research Project',
    notes: 'Cutting-edge technology research',
    description:
      'Join our quantum computing research team to explore the future of computation. Work on quantum algorithms and contribute to scientific publications.',
    url_code: 'QUANTUM24',
    max_applicants: 5,
    form_schema:
      '{"fields": [{"type": "file", "label": "Academic CV"}, {"type": "file", "label": "Research Experience"}, {"type": "text", "label": "Physics Background"}]}',
    compensation_amount: 4000,
    compensation_note: 'Monthly research grant',
    currency_code: 'USD',
    location: 'MIT, Cambridge, MA',
    location_type_key: 'onsite',
    opportunity_type_key: 'research',
    opportunity_status_key: 'published',
    opportunity_level_key: 'senior',
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2025-05-31T23:59:59Z',
    feedback_publication_date: '2025-06-15T00:00:00Z',
    feedback_expiration_date: '2025-06-30T23:59:59Z',
    created_at: '2024-01-01T09:00:00Z',
    updated_at: '2024-01-01T09:00:00Z',
    deleted_at: null,
  },
  {
    opportunity_id: 16,
    account_id: 16,
    display_name: 'Code for Good: Education Platform',
    notes: 'Volunteer development project',
    description:
      'Help build a free educational platform for underprivileged students. Use your coding skills to make a real impact in education accessibility.',
    url_code: 'CODEFORGOOD24',
    max_applicants: 20,
    form_schema:
      '{"fields": [{"type": "text", "label": "Technical Skills"}, {"type": "text", "label": "Availability Hours"}, {"type": "text", "label": "Motivation"}]}',
    compensation_amount: 0,
    compensation_note: 'Volunteer position with certificates and references',
    currency_code: 'USD',
    location: 'Remote Collaboration',
    location_type_key: 'remote',
    opportunity_type_key: 'volunteering',
    opportunity_status_key: 'published',
    opportunity_level_key: 'entry',
    start_date: '2024-03-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z',
    feedback_publication_date: '2024-09-15T00:00:00Z',
    feedback_expiration_date: '2024-09-30T23:59:59Z',
    created_at: '2023-12-31T10:00:00Z',
    updated_at: '2023-12-31T10:00:00Z',
    deleted_at: null,
  },
];

// Simula il delay della rete
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Funzione per filtrare le opportunities
const filterOpportunities = (
  opportunities: Opportunity[],
  filters: OpportunityFilters
): Opportunity[] => {
  return opportunities.filter((opportunity) => {
    // Filtro per location type
    if (filters.location_type_key && filters.location_type_key !== 'all') {
      if (opportunity.location_type_key !== filters.location_type_key)
        return false;
    }

    // Filtro per opportunity level
    if (
      filters.opportunity_level_key &&
      filters.opportunity_level_key !== 'all'
    ) {
      if (opportunity.opportunity_level_key !== filters.opportunity_level_key)
        return false;
    }

    // Filtro per opportunity type
    if (
      filters.opportunity_type_key &&
      filters.opportunity_type_key !== 'all'
    ) {
      if (opportunity.opportunity_type_key !== filters.opportunity_type_key)
        return false;
    }

    // Filtro per compensation range
    if (filters.compensation_amount_min !== undefined) {
      if (opportunity.compensation_amount < filters.compensation_amount_min)
        return false;
    }

    if (filters.compensation_amount_max !== undefined) {
      if (opportunity.compensation_amount > filters.compensation_amount_max)
        return false;
    }

    // Filtro per currency
    if (filters.currency_code && filters.currency_code !== 'all') {
      if (opportunity.currency_code !== filters.currency_code) return false;
    }

    // Filtro per search
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        opportunity.display_name,
        opportunity.description,
        opportunity.notes,
        opportunity.location,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchableText.includes(searchTerm)) return false;
    }

    return true;
  });
};

// Funzione per ordinare le opportunities
const sortOpportunities = (
  opportunities: Opportunity[],
  sortBy: string,
  sortDirection: 'asc' | 'desc'
): Opportunity[] => {
  return [...opportunities].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case 'created_at':
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
        break;
      case 'updated_at':
        aValue = new Date(a.updated_at).getTime();
        bValue = new Date(b.updated_at).getTime();
        break;
      case 'display_name':
        aValue = a.display_name.toLowerCase();
        bValue = b.display_name.toLowerCase();
        break;
      case 'compensation_amount':
        aValue = a.compensation_amount;
        bValue = b.compensation_amount;
        break;
      case 'start_date':
        aValue = new Date(a.start_date).getTime();
        bValue = new Date(b.start_date).getTime();
        break;
      case 'end_date':
        aValue = new Date(a.end_date).getTime();
        bValue = new Date(b.end_date).getTime();
        break;
      default:
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const fetchOpportunities = async (
  params: OpportunityApiParams
): Promise<OpportunityApiResponse> => {
  // Simula il delay della rete (500-1500ms)
  await delay(Math.random() * 1000 + 500);

  // Applica filtri
  let filteredOpportunities = filterOpportunities(
    mockOpportunities,
    params.filters
  );

  // Applica ordinamento
  filteredOpportunities = sortOpportunities(
    filteredOpportunities,
    params.sortBy,
    params.sortDirection
  );

  // Calcola paginazione
  const totalItems = filteredOpportunities.length;
  const totalPages = Math.ceil(totalItems / params.limit);
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedData = filteredOpportunities.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: params.page,
      totalPages,
      totalItems,
      itemsPerPage: params.limit,
    },
  };
};
