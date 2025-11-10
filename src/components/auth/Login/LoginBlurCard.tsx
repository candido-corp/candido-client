import { Card } from '@/components/ui/card';
import { cn } from '@/utils/shadcn';
import { BaseFC } from '@/models/interfaces/BaseFC';

export const LoginBlurCard: React.FC<BaseFC> = ({ className, children }) => {
  return <Card className={cn('overflow-hidden', className)}>{children}</Card>;
};
