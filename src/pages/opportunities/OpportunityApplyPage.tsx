import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const OpportunityApplyPage = () => {
  return (
    <PageContent title={'Opportunity apply page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link
            to={EnumRoutes.OPPORTUNITIES_OPPORTUNITY.replace(
              ':opportunityId',
              '33333'
            )}
          >
            Opportunity 33333
          </Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default OpportunityApplyPage;
