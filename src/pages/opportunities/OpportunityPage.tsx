import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const OpportunityPage = () => {
  return (
    <PageContent title={'Opportunity page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.OPPORTUNITIES}>Opportunities</Link>
        </Button>
        <Button asChild>
          <Link
            to={EnumRoutes.OPPORTUNITIES_OPPORTUNITY_APPLY.replace(
              ':opportunityId',
              '33333'
            )}
          >
            opportunity 33333 apply
          </Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default OpportunityPage;
