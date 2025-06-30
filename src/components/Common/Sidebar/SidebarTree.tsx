import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavItem } from '@/config/navigation';
import { cn } from '@/utils/shadcn';
import { ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

type SidebarTreeProps = {
  collapsibleItem: NavItem;
};

// Helper function to check if a NavItem or any of its children contains the active URL
const hasActiveChild = (item: NavItem, currentPath: string): boolean => {
  // Check if the current item matches the active path
  if (item.url === currentPath) {
    return true;
  }

  // Check if any children match the active path
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child, currentPath));
  }

  return false;
};

export const SidebarTree: React.FC<SidebarTreeProps> = ({
  collapsibleItem,
}) => {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();

  const handleClick = () => {
    setOpenMobile(false);
  };

  // Check if this collapsible item should be open because it contains an active child
  const shouldBeOpen = hasActiveChild(collapsibleItem, location.pathname);

  // Base case: No children
  if (!collapsibleItem.children || collapsibleItem.children.length === 0) {
    return (
      <SidebarMenuItem>
        <NavLink
          to={collapsibleItem.url || '#'}
          onClick={handleClick}
          className="w-full"
          end
        >
          {({ isActive }) => (
            <SidebarMenuButton size="lg" isActive={isActive} asChild>
              <span className={cn('flex w-full items-center')}>
                {collapsibleItem.icon && (
                  <collapsibleItem.icon className="mr-2" />
                )}
                <span>{collapsibleItem.title}</span>
              </span>
            </SidebarMenuButton>
          )}
        </NavLink>
      </SidebarMenuItem>
    );
  }

  // Otherwise, render the collapsible item
  return (
    <SidebarMenuItem>
      <Collapsible
        defaultOpen={shouldBeOpen}
        className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            size="lg"
            tooltip={collapsibleItem.title}
            className={cn(
              'w-full',
              shouldBeOpen && 'text-sidebar-accent-foreground'
            )}
          >
            {collapsibleItem.icon && <collapsibleItem.icon className="mr-2" />}
            <span>{collapsibleItem.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {collapsibleItem.children.map((subItem) => (
              <SidebarTree key={subItem.id} collapsibleItem={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
