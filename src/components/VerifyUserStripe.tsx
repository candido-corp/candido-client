import { useAuth } from '@/hooks/useAuth';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import { ArrowUpRight } from 'lucide-react';
import WithAuthorization from './Common/WithAuthorization';
import { Alert } from './ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

const VerifyUserStripe: React.FC = () => {
  const { user } = useAuth();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Alert variant="stripe">
          <button className="w-full px-2">
            <div className="flex w-full items-center justify-between py-2 text-sm">
              <span className="text-left font-bold">Account not verified</span>
              <span className="hidden text-center md:block">
                To verify your account please check your email
              </span>
              <div className="flex items-center text-right font-bold">
                Activate your account
                <span className="ml-1">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </button>
        </Alert>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-6">
        <AlertDialogHeader>
          <AlertDialogTitle>Verify Your Email</AlertDialogTitle>
          <AlertDialogDescription>
            We have sent a verification email to&nbsp;<b>{user?.email}</b>
            <p>
              If you believe you didn't receive it or you have lost it, you can
              resend the email.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Resend Email</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const allowedRoles = [EnumUserRoles.USER_NOT_VERIFIED];
const allowedPermissions: EnumUserPermissions[] = [];
const VerifyUserStripeComponentWithAuthorization = WithAuthorization({
  allowedRoles,
  allowedPermissions,
})(VerifyUserStripe);
export default VerifyUserStripeComponentWithAuthorization;
