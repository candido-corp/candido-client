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
import { NavigationPlugin, FlatNavItem } from '@/config/navigation';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar'; // <-- Importato

type SidebarTreeProps = {
  collapsibleItem: NavigationPlugin | FlatNavItem;
};

const isNavigationPlugin = (item: NavigationPlugin | FlatNavItem): item is NavigationPlugin => {
  return (item as NavigationPlugin).navbar !== undefined;
};

export const SidebarTree: React.FC<SidebarTreeProps> = ({ collapsibleItem }) => {
  const { setOpenMobile } = useSidebar();

  const handleClick = () => {
    setOpenMobile(false);
  };

  if (isNavigationPlugin(collapsibleItem)) {
    // Caso: NavigationPlugin
    if (!collapsibleItem.sidebar || collapsibleItem.sidebar.length === 0) {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="data-[active=true]:bg-transparent" asChild>
            <NavLink
              to={collapsibleItem.navbar?.url || '#'}
              onClick={handleClick}
              className="w-full flex items-center"
            >
              {collapsibleItem.navbar?.icon && <collapsibleItem.navbar.icon className="mr-2" />}
              <span>{collapsibleItem.navbar?.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem>
        <Collapsible
          defaultOpen={false}
          className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={collapsibleItem.navbar?.title}
              className="w-full"
            >
              {collapsibleItem.navbar?.icon && <collapsibleItem.navbar.icon className="mr-2" />}
              <span>{collapsibleItem.navbar?.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {collapsibleItem.sidebar.map((subItem) => (
                <SidebarTree key={subItem.id} collapsibleItem={subItem} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  // Caso: FlatNavItem (voce semplice)
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
};
