import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {NavigationPlugin, FlatNavItemWithActive} from '@/config/navigation';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { NavLink } from 'react-router-dom';
import { SidebarTree } from './SidebarTree';

type NavProps = BaseFC & {
  navItems: NavigationPlugin[] | FlatNavItemWithActive[];
  mode: 'mobile' | 'desktop';
};

export const SidebarNavMain: React.FC<NavProps> = ({ navItems, className, mode }) => {
  return (
    <SidebarGroup className={className}>
      <SidebarMenu>
        {mode === 'mobile'
          ? (navItems as NavigationPlugin[]).map((plugin) => (
            <SidebarTree key={plugin.id} collapsibleItem={plugin} />
          ))
          : (navItems as FlatNavItemWithActive[]).map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={item.isActive} // <-- qui! Usa il valore calcolato
                size="lg"
                className={cn('data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground')}
                asChild
              >
                {item.url && (
                  <NavLink to={item.url}>
                    {item.icon && <item.icon className="mr-2" />}
                    <span>{item.title}</span>
                  </NavLink>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        }
      </SidebarMenu>
    </SidebarGroup>
  );
};
