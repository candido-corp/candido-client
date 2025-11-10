export type Opportunity = {
  opportunity_id: number;
  account_id: number;
  display_name: string;
  notes: string;
  description: string;
  url_code: string;
  max_applicants: number;
  form_schema: string;
  compensation_amount: number;
  compensation_note: string;
  currency_code: string;
  location: string;
  location_type_key: 'remote' | 'hybrid' | 'onsite';
  opportunity_type_key:
    | 'job'
    | 'internship'
    | 'freelance'
    | 'challenge'
    | 'bootcamp'
    | 'thesis'
    | 'mentorship'
    | 'research'
    | 'volunteering';
  opportunity_status_key: 'published' | 'draft' | 'closed';
  opportunity_level_key: 'entry' | 'mid' | 'senior' | 'executive';
  start_date: string;
  end_date: string;
  feedback_publication_date: string;
  feedback_expiration_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type OpportunityFilters = {
  location_type_key?: string;
  opportunity_level_key?: string;
  opportunity_type_key?: string;
  compensation_amount_min?: number;
  compensation_amount_max?: number;
  currency_code?: string;
  search?: string;
  code_search?: string;
};

export type OpportunitySortBy =
  | 'created_at'
  | 'updated_at'
  | 'display_name'
  | 'compensation_amount'
  | 'start_date'
  | 'end_date';

export type OpportunityApiParams = {
  page: number;
  limit: number;
  sortBy: OpportunitySortBy;
  sortDirection: 'asc' | 'desc';
  filters: OpportunityFilters;
};

export type OpportunityApiResponse = {
  data: Opportunity[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};
