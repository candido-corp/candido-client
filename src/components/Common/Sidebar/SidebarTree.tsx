import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { NavItem } from '@/config/navigation';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

type SidebarTreeProps = {
  collapsibleItem: NavItem;
};

export const SidebarTree: React.FC<SidebarTreeProps> = ({ collapsibleItem }) => {
  const { setOpenMobile } = useSidebar();

  const handleClick = () => {
    setOpenMobile(false);
  };

  // Base case: No children
  if (!collapsibleItem.children || collapsibleItem.children.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="data-[active=true]:bg-transparent" asChild>
          <NavLink
            to={collapsibleItem.url || '#'}
            onClick={handleClick}
            className="w-full flex items-center"
          >
            {collapsibleItem.icon && <collapsibleItem.icon className="mr-2" />}
            <span>{collapsibleItem.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Otherwise, render the collapsible item
  return (
    <SidebarMenuItem>
      <Collapsible
        defaultOpen={false}
        className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            size="lg"
            tooltip={collapsibleItem.title}
            className="w-full"
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
