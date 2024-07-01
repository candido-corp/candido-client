import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BaseFC } from '@/models/interfaces/BaseFC';

const LoginBlurCard: React.FC<BaseFC> = ({ className, children }) => {
  return <Card className={cn('overflow-hidden', className)}>{children}</Card>;
};

export default LoginBlurCard;
