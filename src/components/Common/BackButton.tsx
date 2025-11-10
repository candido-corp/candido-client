import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface BackButtonProps extends BaseFC {
  /** Optional URL to navigate to. If not provided, will navigate back (-1) */
  to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className, to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      className={cn(className, 'h-8 w-8')}
      title={to ? `Navigate to ${to}` : 'Go back'}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;
