import { useLoaderData } from 'react-router-dom';
import PageContent from '../../components/PageContent';

const RegisterVerifyByEmailPage = () => {
  const data = useLoaderData() as { message: string }; //TODO fix type message
  return (
    <PageContent title="Register Verify">
      <div>
        <p>{data.message}</p>
      </div>
    </PageContent>
  );
};

export default RegisterVerifyByEmailPage;
