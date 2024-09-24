import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const FormsPage = () => {
  return (
    <PageContent title={'Forms page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.FORMS_CREATE}>Create form</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.FORMS_FORM.replace(':formId', '21345')}>
            Form 21345
          </Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default FormsPage;
