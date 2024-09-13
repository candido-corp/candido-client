import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const OpportunitiesPage = () => {
  return (
    <PageContent title={'Opportunities page'}>
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
    </PageContent>
  );
};

export default OpportunitiesPage;
