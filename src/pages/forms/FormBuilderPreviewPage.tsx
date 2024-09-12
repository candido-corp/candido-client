import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const FormBuilderPreviewPage = () => {
  return (
    <PageContent title={'Form builder preview page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.FORMS_FORM_BUILDER.replace(':formId', '21345')}>
            form 21345 builder
          </Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default FormBuilderPreviewPage;
