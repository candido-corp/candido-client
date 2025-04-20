import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const BackButton: React.FC<BaseFC> = ({ className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      className={cn(className, 'h-8 w-8')}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;
