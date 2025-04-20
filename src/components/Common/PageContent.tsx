import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';

type PageContentProps = {
  title?: string;
} & BaseFC;

const PageContent: React.FC<PageContentProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cn(className, 'container')}>
      {title && (
        <h1 className="pb-5 text-2xl font-bold tracking-tight">{title}</h1>
      )}
      {children}
    </div>
  );
};

export default PageContent;
