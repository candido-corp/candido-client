import { ResetPasswordForm } from '@/components/auth/ResetPassword/ResetPasswordForm';
import { t } from 'i18next';

const ResetPasswordPage = () => {
  return (
    <div className="container relative flex h-full flex-col justify-center sm:items-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-14 w-14"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">{t('reset_password.title')}</h1>
            <p className="text-balance text-muted-foreground">{t('reset_password.description')}</p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
