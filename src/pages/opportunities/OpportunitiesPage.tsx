import PageContent from '@/components/Common/PageContent';
import OpportunityListing from '@/components/opportunities/OpportunityListing';
import { Opportunity } from '@/components/opportunities/types';

const ITEMS_PER_PAGE = 8;

const OpportunitiesPage: React.FC = () => {
  const handleViewDetails = (opportunity: Opportunity) => {
    console.log('View details for:', opportunity);
    // Here you would navigate to the opportunity detail page
  };

  return (
    <PageContent>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing career opportunities that match your skills
          </p>
        </div>

        {/* Opportunity Listing Component */}
        <OpportunityListing
          itemsPerPage={ITEMS_PER_PAGE}
          onViewDetails={handleViewDetails}
        />
      </div>
    </PageContent>
  );
};

export default OpportunitiesPage;
